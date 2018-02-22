/*!
 * parse-bitbucket-url <https://bitbucket.org/advance512/parse-bitbucket-url>
 *
 * Copyright (c) 2016, Codefresh, Inc.
 * Licensed under the MIT License.
 */

'use strict';

var url = require('url');
var cache = {};

module.exports = function parseBitbucketUrl(str) {
  return cache[str] || (cache[str] = parse(str));
};

function parse(str) {
  if (typeof str !== 'string' || !str.length) {
    return null;
  }

  // No snippets for us
  if (str.indexOf('bitbucket.org/snippets') !== -1 || str.indexOf('bitbucket.com/snippets') !== -1) {
    return null;
  }

  // parse the URL
  var obj = url.parse(str, true);
  if (typeof obj.path !== 'string' || !obj.path.length || typeof obj.pathname !== 'string' || !obj.pathname.length) {
    return null;
  }
  obj.path = trimSlash(obj.path);
  obj.pathname = trimSlash(obj.pathname);

  // Get the segments from the path
  var pathSegments = obj.path.split('/').filter(Boolean);

  // Stash, aka Bitbucket Server. https://www.atlassian.com/software/bitbucket/server
  // We look for a git@ URL not pointing at bitbucket.org/bitbucket.com, or for a HTTP/HTTPS URL that isn't pointing to
  // bitbucket.com/bitbucket.org and that has a path that starts with /projects/
  var stashDetected =
    (str.indexOf('git@') !== -1 && str.indexOf('git@bitbucket.org') === -1 && str.indexOf('git@bitbucket.com') === -1)
    ||
    pathSegments.length === 3 && pathSegments[0] === 'scm'
    ||
    (obj.hostname &&
     !(obj.hostname.endsWith('bitbucket.org') || obj.hostname.endsWith('bitbucket.com')) &&
     pathSegments[0] === 'projects');

  // TODO: This is too spaghetti.. rewrite this to be understandable, separate Bitbucket Server/Bitbucket Cloud paths,
  // SSH/git paths, etc
  if (stashDetected) {
    // Stash mode
    if (str.indexOf('git@') === -1 && pathSegments[0] !== 'scm') {

      if (pathSegments.length > 1) {
        obj.owner = owner(pathSegments[1]);
      } else {
        obj.owner = null;
      }

      if (pathSegments.length > 3 && pathSegments[2] === 'repos') {
        obj.name = name(pathSegments[3]);
      } else {
        obj.name = null;
      }
    } else {
      if (pathSegments.length === 3) {
        if (pathSegments[0] !== 'scm') {
          obj.host = pathSegments[0].replace('git@', '');
        }
        obj.owner = owner(pathSegments[1]);
        obj.name = name(pathSegments[2]);
      } else {
        obj.owner = owner(pathSegments[0]);
        obj.name = name(pathSegments[1]);
      }
    }
  } else {
    // Bitbucket mode
    obj.owner = owner(pathSegments[0]);
    obj.name = name(pathSegments[1]);
  }

  if (pathSegments.length > 1 && obj.owner && obj.name) {
    obj.repo = obj.owner + '/' + obj.name;
  } else {
    var href = obj.href.split(':');
    if (href.length === 2 && obj.href.indexOf('//') === -1) {
      obj.repo = obj.repo || href[href.length - 1];
      var repoSegments = obj.repo.split('/');
      obj.owner = repoSegments[0];
      obj.name = repoSegments[1];

    } else if (obj.hasOwnProperty('owner') === false) {

      // Having the property means - we're sure.
      var match = obj.href.match(/\/([^\/]*)$/);
      obj.owner = match ? match[1] : null;
      obj.repo = null;
    }

    if (obj.repo && (!obj.owner || !obj.name)) {
      var segs = obj.repo.split('/');
      if (segs.length === 2) {
        obj.owner = segs[0];
        obj.name = segs[1];
      }
    }
  }

  if (pathSegments.length >= 3) {
    switch(pathSegments[2]){
      case 'get':
        // Look at seg[3] for a file name, which will be the branch/tag name
        // NOTE: tags and branches are treated alike in Bitbucket and cannot be distinguished by URL.
        // We'll treat everything like branches.
        var fileName = null;
        if (pathSegments[3].endsWith('.tar.gz')) {
          fileName = pathSegments[3].replace('.tar.gz', '');
        }
        if (pathSegments[3].endsWith('.tar.bz2')) {
          fileName = pathSegments[3].replace('.tar.bz2', '');
        }
        if (pathSegments[3].endsWith('.zip')) {
          fileName = pathSegments[3].replace('.zip', '');
        }
        obj.branch = fileName;

        // tip is a keyword meaning HEAD. We don't know the actual branch in this case.
        if (obj.branch === 'tip') {
          obj.branch = undefined;
        }
        break;
      case 'raw':// support file location. Bitbucket support two file modes:raw and src. This is only for bitbuket and not Bitbucket Server
      case 'src':// todo: support bitbucket server file location
            if(pathSegments.length < 5){
                // no file location
                break;
            }
            var filepath = pathSegments.slice(4);
            if(filepath.length){
                var file = filepath[filepath.length - 1];
                file = file.split('?')[0]; //remove the query params
                filepath[filepath.length - 1] = file;
            }
            obj.filepath = filepath.join('/');

    }

  }

  obj.branch = obj.branch || getBranch(obj, stashDetected);
  var res = {};
  res.host = obj.host || 'bitbucket.org';
  res.owner = obj.owner || null;
  res.name = obj.name || null;
  res.repo = obj.repo;
  res.repository = res.repo;
  res.branch = obj.branch;
  res.filepath =  obj.filepath || null;
    // TODO: support file path for bitbucket server (formally Stash)

  // TODO: Consider splitting host to host:port (add obj.port) in case of Stash
  return res;
}

// I like it. Let's keep it for future generations.
// function isChecksum(str) {
//   return /^[a-f0-9]{40}$/i.test(str);
// }

function getBranch(obj, stashMode) {
  var branch;
  var segs = obj.path.split('#');
  if (segs.length !== 1) {
    branch = segs[segs.length - 1];
  }
  if (!branch && obj.hash && obj.hash.charAt(0) === '#') {
    branch = obj.hash.slice(1);
  }
  if (!branch && obj.query && obj.query.at) {
    branch = obj.query.at;
    if (branch && stashMode) {
      branch = branch.replace('refs/heads/', '');
    }
  }

  return branch || 'master';
}

function trimSlash(path) {
  return path.charAt(0) === '/' ? path.slice(1) : path;
}

function name(str) {
  // Remove non alphanumeric chars, and .git
  return str ? str.replace(/^\W+|\.git$/g, '') : null;
}

function owner(str) {
  if (!str) return null;
  var idx = str.indexOf(':');
  if (idx > -1) {
    return str.slice(idx + 1);
  }
  return str;
}
