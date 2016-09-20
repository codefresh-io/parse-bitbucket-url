'use strict';

var util = require('util');
var bb = require('./');

var formats = [
  'birkenfeld/sphinx#1.2.3',
  'birkenfeld/sphinx#branch',
  'birkenfeld/sphinx',
  'git+https://bitbucket.org/birkenfeld/sphinx.git',
  'git+ssh://bitbucket.org/birkenfeld/sphinx.git',
  'git://bitbucket.org/birkenfeld/sphinx',
  'git://bitbucket.org/birkenfeld/sphinx.git',
  'git@bitbucket.org:birkenfeld/sphinx.git#1.2.3',
  'git@bitbucket.org:birkenfeld/sphinx.git#v1.2.3',
  'git@bitbucket.org:birkenfeld/sphinx.git',
  'hg@bitbucket.org:birkenfeld/sphinx#4.5.6',
  'hg@bitbucket.org:birkenfeld/sphinx#v4.5.6',
  'hg@bitbucket.org:birkenfeld/sphinx',
  'bitbucket:birkenfeld/sphinx',
  'http://bitbucket.org/birkenfeld',
  'http://bitbucket.org/birkenfeld/sphinx',
  'http://bitbucket.org/birkenfeld/sphinx.git',
  'http://bitbucket.org/birkenfeld/sphinx/src',
  'http://bitbucket.org/birkenfeld/sphinx/src/6affb32647b1f762ebe40f5dac175e7aa7a15f09/?at=stable',
  'http://bitbucket.org/birkenfeld/sphinx/src/6affb32647b1f762ebe40f5dac175e7aa7a15f09/sphinx/directives/code.py?at=stable&fileviewer=file-view-default',
  'https://bitbucket.org/birkenfeld/sphinx/src/6affb32647b1f762ebe40f5dac175e7aa7a15f09/AUTHORS',
  'https://birkenfeld@bitbucket.org/birkenfeld/sphinx.git',
  'https://bitbucket.org/birkenfeld/sphinx',
  'https://bitbucket.org/birkenfeld/sphinx.git',
  'https://bitbucket.org/birkenfeld/sphinx/src/40bd03003ac6fe274ccf3c80d7727509e00a69ea/README.rst?at=default&fileviewer=file-view-default',
  'https://bitbucket.org/birkenfeld/sphinx/src/aa5eea3eb4f39c97e1353783261e51c04020584d/README.rst?at=default&fileviewer=file-view-default',
  'https://bitbucket.org/birkenfeld/sphinx/src/aa5eea3eb4f39c97e1353783261e51c04020584d/babel.cfg?at=default&fileviewer=file-view-default',
  'https://bitbucket.org/birkenfeld/sphinx/src/6affb32647b1f762ebe40f5dac175e7aa7a15f09/babel.cfg?at=stable&fileviewer=file-view-default',
  'https://bitbucket.org/birkenfeld/sphinx/src/6affb32647b1f762ebe40f5dac175e7aa7a15f09/babel.cfg',
  'https://bitbucket.org/birkenfeld/sphinx/commits/f2a3d22c9a8d298d8a084b121160c6c3e9a40c77',
  'https://bitbucket.org/birkenfeld/sphinx/branch/default',
  'https://bitbucket.org/birkenfeld/sphinx/pull-requests/',
  'https://bitbucket.org/birkenfeld/sphinx/pull-requests/239/apply-only-directives-when-obtaining-the/diff',
  'https://bitbucket.org/birkenfeld/sphinx/overview',
  'https://bitbucket.org/birkenfeld/sphinx/downloads',
  'https://bitbucket.org/birkenfeld/sphinx/get/40bd03003ac6.zip',
  'https://bitbucket.org/birkenfeld/sphinx/get/tip.zip',
  'https://bitbucket.org/birkenfeld/sphinx/get/1.0b2.tar.bz2',
  'https://bitbucket.org/birkenfeld/sphinx/get/stable.tar.gz'
];

module.exports = function() {
  var res = '';
  formats.forEach(function(url) {
    res += '\n// '
      + url + '\n'
      + util.inspect(bb(url), null, 10)
      + '\n';
  });
  console.log(res);
  return res;
};
