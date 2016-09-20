/*!
 * parse-bitbucket-url <https://bitbucket.org/jonschlinkert/parse-bitbucket-url>
 *
 * Copyright (c) 2016, Alon Diamant.
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
  if (str.indexOf('bitbucket.org/snippets') !== -1) {
    return null;
  }

  // parse the URL
  var obj = url.parse(str, true);
  if (typeof obj.path !== 'string' || !obj.path.length || typeof obj.pathname !== 'string' || !obj.pathname.length) {
    return null;
  }
  obj.path = trimSlash(obj.path);
  obj.pathname = trimSlash(obj.pathname);

  var seg = obj.path.split('/').filter(Boolean);

  obj.owner = owner(seg[0]);
  obj.name = name(seg[1]);

  if (seg.length > 1 && obj.owner && obj.name) {
    obj.repo = obj.owner + '/' + obj.name;
  } else {
    var href = obj.href.split(':');
    if (href.length === 2 && obj.href.indexOf('//') === -1) {
      obj.repo = obj.repo || href[href.length - 1];
      var repoSegments = obj.repo.split('/');
      obj.owner = repoSegments[0];
      obj.name = repoSegments[1];

    } else {
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

  if (seg.length >= 3 && seg[2] === 'get') {
    // Look at seg[3] for a file name, which will be the branch/tag name
    // NOTE: tags and branches are treated alike in Bitbucket and cannot be distinguished by URL.
    // We'll treat everything like branches.
    var fileName = null;
    if (seg[3].endsWith('.tar.gz')) {
      fileName = seg[3].replace('.tar.gz', '');
    }
    if (seg[3].endsWith('.tar.bz2')) {
      fileName = seg[3].replace('.tar.bz2', '');
    }
    if (seg[3].endsWith('.zip')) {
      fileName = seg[3].replace('.zip', '');
    }
    obj.branch = fileName;

    // tip is a keyword meaning HEAD. We don't know the actual branch in this case.
    if (obj.branch === 'tip') {
      obj.branch = undefined;
    }
  }

  obj.branch = obj.branch || getBranch(obj);
  var res = {};
  res.host = obj.host || 'bitbucket.org';
  res.owner = obj.owner || null;
  res.name = obj.name || null;
  res.repo = obj.repo;
  res.repository = res.repo;
  res.branch = obj.branch;
  return res;
}

// I like it. Let's keep it for future generations.
// function isChecksum(str) {
//   return /^[a-f0-9]{40}$/i.test(str);
// }

function getBranch(obj) {
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
  }

  return branch || 'master';
}

function trimSlash(path) {
  return path.charAt(0) === '/' ? path.slice(1) : path;
}

function name(str) {
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
