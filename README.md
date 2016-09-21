# parse-bitbucket-url [![NPM version](https://img.shields.io/npm/v/parse-bitbucket-url.svg?style=flat)](https://www.npmjs.com/package/parse-bitbucket-url) [![NPM downloads](https://img.shields.io/npm/dm/parse-bitbucket-url.svg?style=flat)](https://npmjs.org/package/parse-bitbucket-url) [![Build Status](https://img.shields.io/travis/advance512/parse-bitbucket-url.svg?style=flat)](https://travis-ci.org/advance512/parse-bitbucket-url)

> Parse a Bitbucket URL into an object. Supports Bitbucket Server (formely known as Stash) URLs as well.

Developed in [Codefresh](https://www.codefresh.io).

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install parse-bitbucket-url --save
```

See the [release history](#history) for details.

**Why a Bitbucket URL parser library?**

Cuz I needed it. And I really liked [parse-github-url](https://www.npmjs.com/package/parse-github-url)'s simplicity. So now you have this. Have fun.

(Why not `parse-vcs-url` you say? nahhh, that's way too few `require` statements) 

## Usage

```js
let parseBitbucketUrl = require('parse-bitbucket-url');
parseBitbucketUrl('https://bitbucket.org/jespern/django-piston');
```

Results in:

```js
{
  "owner": "jespern",
  "name": "django-piston",
  "repo": "jespern/django-piston",
  "branch": "master"
}
```

## Example results

Generated results from test fixtures:

```js
// birkenfeld/sphinx#1.2.3
{ host: 'bitbucket.org',
  owner: 'birkenfeld',
  name: 'sphinx',
  repo: 'birkenfeld/sphinx',
  repository: 'birkenfeld/sphinx',
  branch: '1.2.3' }

// birkenfeld/sphinx#branch
{ host: 'bitbucket.org',
  owner: 'birkenfeld',
  name: 'sphinx',
  repo: 'birkenfeld/sphinx',
  repository: 'birkenfeld/sphinx',
  branch: 'branch' }

// birkenfeld/sphinx
{ host: 'bitbucket.org',
  owner: 'birkenfeld',
  name: 'sphinx',
  repo: 'birkenfeld/sphinx',
  repository: 'birkenfeld/sphinx',
  branch: 'master' }

// git+https://bitbucket.org/birkenfeld/sphinx.git
{ host: 'bitbucket.org',
  owner: 'birkenfeld',
  name: 'sphinx',
  repo: 'birkenfeld/sphinx',
  repository: 'birkenfeld/sphinx',
  branch: 'master' }

// git+ssh://bitbucket.org/birkenfeld/sphinx.git
{ host: 'bitbucket.org',
  owner: 'birkenfeld',
  name: 'sphinx',
  repo: 'birkenfeld/sphinx',
  repository: 'birkenfeld/sphinx',
  branch: 'master' }

// git://bitbucket.org/birkenfeld/sphinx
{ host: 'bitbucket.org',
  owner: 'birkenfeld',
  name: 'sphinx',
  repo: 'birkenfeld/sphinx',
  repository: 'birkenfeld/sphinx',
  branch: 'master' }

// git://bitbucket.org/birkenfeld/sphinx.git
{ host: 'bitbucket.org',
  owner: 'birkenfeld',
  name: 'sphinx',
  repo: 'birkenfeld/sphinx',
  repository: 'birkenfeld/sphinx',
  branch: 'master' }

// git@bitbucket.org:birkenfeld/sphinx.git#1.2.3
{ host: 'bitbucket.org',
  owner: 'birkenfeld',
  name: 'sphinx',
  repo: 'birkenfeld/sphinx',
  repository: 'birkenfeld/sphinx',
  branch: '1.2.3' }

// git@bitbucket.org:birkenfeld/sphinx.git#v1.2.3
{ host: 'bitbucket.org',
  owner: 'birkenfeld',
  name: 'sphinx',
  repo: 'birkenfeld/sphinx',
  repository: 'birkenfeld/sphinx',
  branch: 'v1.2.3' }

// git@bitbucket.org:birkenfeld/sphinx.git
{ host: 'bitbucket.org',
  owner: 'birkenfeld',
  name: 'sphinx',
  repo: 'birkenfeld/sphinx',
  repository: 'birkenfeld/sphinx',
  branch: 'master' }

// hg@bitbucket.org:birkenfeld/sphinx#4.5.6
{ host: 'bitbucket.org',
  owner: 'birkenfeld',
  name: 'sphinx',
  repo: 'birkenfeld/sphinx',
  repository: 'birkenfeld/sphinx',
  branch: '4.5.6' }

// hg@bitbucket.org:birkenfeld/sphinx#v4.5.6
{ host: 'bitbucket.org',
  owner: 'birkenfeld',
  name: 'sphinx',
  repo: 'birkenfeld/sphinx',
  repository: 'birkenfeld/sphinx',
  branch: 'v4.5.6' }

// hg@bitbucket.org:birkenfeld/sphinx
{ host: 'bitbucket.org',
  owner: 'birkenfeld',
  name: 'sphinx',
  repo: 'birkenfeld/sphinx',
  repository: 'birkenfeld/sphinx',
  branch: 'master' }

// bitbucket:birkenfeld/sphinx
{ host: 'birkenfeld',
  owner: 'birkenfeld',
  name: 'sphinx',
  repo: 'birkenfeld/sphinx',
  repository: 'birkenfeld/sphinx',
  branch: 'master' }

// http://bitbucket.org/birkenfeld
{ host: 'bitbucket.org',
  owner: 'birkenfeld',
  name: null,
  repo: null,
  repository: null,
  branch: 'master' }

// http://bitbucket.org/birkenfeld/sphinx
{ host: 'bitbucket.org',
  owner: 'birkenfeld',
  name: 'sphinx',
  repo: 'birkenfeld/sphinx',
  repository: 'birkenfeld/sphinx',
  branch: 'master' }

// http://bitbucket.org/birkenfeld/sphinx.git
{ host: 'bitbucket.org',
  owner: 'birkenfeld',
  name: 'sphinx',
  repo: 'birkenfeld/sphinx',
  repository: 'birkenfeld/sphinx',
  branch: 'master' }

// http://bitbucket.org/birkenfeld/sphinx/src
{ host: 'bitbucket.org',
  owner: 'birkenfeld',
  name: 'sphinx',
  repo: 'birkenfeld/sphinx',
  repository: 'birkenfeld/sphinx',
  branch: 'master' }

// http://bitbucket.org/birkenfeld/sphinx/src/6affb32647b1f762ebe40f5dac175e7aa7a15f09/?at=stable
{ host: 'bitbucket.org',
  owner: 'birkenfeld',
  name: 'sphinx',
  repo: 'birkenfeld/sphinx',
  repository: 'birkenfeld/sphinx',
  branch: 'stable' }

// http://bitbucket.org/birkenfeld/sphinx/src/6affb32647b1f762ebe40f5dac175e7aa7a15f09/sphinx/directives/code.py?at=stable&fileviewer=file-view-default
{ host: 'bitbucket.org',
  owner: 'birkenfeld',
  name: 'sphinx',
  repo: 'birkenfeld/sphinx',
  repository: 'birkenfeld/sphinx',
  branch: 'stable' }

// https://bitbucket.org/birkenfeld/sphinx/src/6affb32647b1f762ebe40f5dac175e7aa7a15f09/AUTHORS
{ host: 'bitbucket.org',
  owner: 'birkenfeld',
  name: 'sphinx',
  repo: 'birkenfeld/sphinx',
  repository: 'birkenfeld/sphinx',
  branch: 'master' }

// https://birkenfeld@bitbucket.org/birkenfeld/sphinx.git
{ host: 'bitbucket.org',
  owner: 'birkenfeld',
  name: 'sphinx',
  repo: 'birkenfeld/sphinx',
  repository: 'birkenfeld/sphinx',
  branch: 'master' }

// https://bitbucket.org/birkenfeld/sphinx
{ host: 'bitbucket.org',
  owner: 'birkenfeld',
  name: 'sphinx',
  repo: 'birkenfeld/sphinx',
  repository: 'birkenfeld/sphinx',
  branch: 'master' }

// https://bitbucket.org/birkenfeld/sphinx.git
{ host: 'bitbucket.org',
  owner: 'birkenfeld',
  name: 'sphinx',
  repo: 'birkenfeld/sphinx',
  repository: 'birkenfeld/sphinx',
  branch: 'master' }

// https://bitbucket.org/birkenfeld/sphinx/src/40bd03003ac6fe274ccf3c80d7727509e00a69ea/README.rst?at=default&fileviewer=file-view-default
{ host: 'bitbucket.org',
  owner: 'birkenfeld',
  name: 'sphinx',
  repo: 'birkenfeld/sphinx',
  repository: 'birkenfeld/sphinx',
  branch: 'default' }

// https://bitbucket.org/birkenfeld/sphinx/src/aa5eea3eb4f39c97e1353783261e51c04020584d/README.rst?at=default&fileviewer=file-view-default
{ host: 'bitbucket.org',
  owner: 'birkenfeld',
  name: 'sphinx',
  repo: 'birkenfeld/sphinx',
  repository: 'birkenfeld/sphinx',
  branch: 'default' }

// https://bitbucket.org/birkenfeld/sphinx/src/aa5eea3eb4f39c97e1353783261e51c04020584d/babel.cfg?at=default&fileviewer=file-view-default
{ host: 'bitbucket.org',
  owner: 'birkenfeld',
  name: 'sphinx',
  repo: 'birkenfeld/sphinx',
  repository: 'birkenfeld/sphinx',
  branch: 'default' }

// https://bitbucket.org/birkenfeld/sphinx/src/6affb32647b1f762ebe40f5dac175e7aa7a15f09/babel.cfg?at=stable&fileviewer=file-view-default
{ host: 'bitbucket.org',
  owner: 'birkenfeld',
  name: 'sphinx',
  repo: 'birkenfeld/sphinx',
  repository: 'birkenfeld/sphinx',
  branch: 'stable' }

// https://bitbucket.org/birkenfeld/sphinx/src/6affb32647b1f762ebe40f5dac175e7aa7a15f09/babel.cfg
{ host: 'bitbucket.org',
  owner: 'birkenfeld',
  name: 'sphinx',
  repo: 'birkenfeld/sphinx',
  repository: 'birkenfeld/sphinx',
  branch: 'master' }

// https://bitbucket.org/birkenfeld/sphinx/commits/f2a3d22c9a8d298d8a084b121160c6c3e9a40c77
{ host: 'bitbucket.org',
  owner: 'birkenfeld',
  name: 'sphinx',
  repo: 'birkenfeld/sphinx',
  repository: 'birkenfeld/sphinx',
  branch: 'master' }

// https://bitbucket.org/birkenfeld/sphinx/branch/default
{ host: 'bitbucket.org',
  owner: 'birkenfeld',
  name: 'sphinx',
  repo: 'birkenfeld/sphinx',
  repository: 'birkenfeld/sphinx',
  branch: 'master' }

// https://bitbucket.org/birkenfeld/sphinx/pull-requests/
{ host: 'bitbucket.org',
  owner: 'birkenfeld',
  name: 'sphinx',
  repo: 'birkenfeld/sphinx',
  repository: 'birkenfeld/sphinx',
  branch: 'master' }

// https://bitbucket.org/birkenfeld/sphinx/pull-requests/239/apply-only-directives-when-obtaining-the/diff
{ host: 'bitbucket.org',
  owner: 'birkenfeld',
  name: 'sphinx',
  repo: 'birkenfeld/sphinx',
  repository: 'birkenfeld/sphinx',
  branch: 'master' }

// https://bitbucket.org/birkenfeld/sphinx/overview
{ host: 'bitbucket.org',
  owner: 'birkenfeld',
  name: 'sphinx',
  repo: 'birkenfeld/sphinx',
  repository: 'birkenfeld/sphinx',
  branch: 'master' }

// https://bitbucket.org/birkenfeld/sphinx/downloads
{ host: 'bitbucket.org',
  owner: 'birkenfeld',
  name: 'sphinx',
  repo: 'birkenfeld/sphinx',
  repository: 'birkenfeld/sphinx',
  branch: 'master' }

// https://bitbucket.org/birkenfeld/sphinx/get/40bd03003ac6.zip
{ host: 'bitbucket.org',
  owner: 'birkenfeld',
  name: 'sphinx',
  repo: 'birkenfeld/sphinx',
  repository: 'birkenfeld/sphinx',
  branch: '40bd03003ac6' }

// https://bitbucket.org/birkenfeld/sphinx/get/tip.zip
{ host: 'bitbucket.org',
  owner: 'birkenfeld',
  name: 'sphinx',
  repo: 'birkenfeld/sphinx',
  repository: 'birkenfeld/sphinx',
  branch: 'master' }

// https://bitbucket.org/birkenfeld/sphinx/get/1.0b2.tar.bz2
{ host: 'bitbucket.org',
  owner: 'birkenfeld',
  name: 'sphinx',
  repo: 'birkenfeld/sphinx',
  repository: 'birkenfeld/sphinx',
  branch: '1.0b2' }

// https://bitbucket.org/birkenfeld/sphinx/get/stable.tar.gz
{ host: 'bitbucket.org',
  owner: 'birkenfeld',
  name: 'sphinx',
  repo: 'birkenfeld/sphinx',
  repository: 'birkenfeld/sphinx',
  branch: 'stable' }

// https://stash.one.two/projects/KEY/repos/name1/browse
{ host: 'stash.one.two',
  owner: 'KEY',
  name: 'name1',
  repo: 'KEY/name1',
  repository: 'KEY/name1',
  branch: 'master' }

// https://stash.one.two/projects/ONE/repos/name2/browse
{ host: 'stash.one.two',
  owner: 'ONE',
  name: 'name2',
  repo: 'ONE/name2',
  repository: 'ONE/name2',
  branch: 'master' }

// https://stash.one.two/projects/ABC/repos/name3/commits/a1aa8e5c5b99002396d449c1bdd4d6946303bbc3
{ host: 'stash.one.two',
  owner: 'ABC',
  name: 'name3',
  repo: 'ABC/name3',
  repository: 'ABC/name3',
  branch: 'master' }

// https://stash.one.two/projects/DEF/repos/na-me4/commits
{ host: 'stash.one.two',
  owner: 'DEF',
  name: 'na-me4',
  repo: 'DEF/na-me4',
  repository: 'DEF/na-me4',
  branch: 'master' }

// https://bitbucketserver.one.two/projects/GHI/repos/name5/compare/commits?sourceBranch=refs%2Fheads%2Fmaster&targetBranch=refs%2Fheads%2Fbugfix%2Fdevelop
{ host: 'bitbucketserver.one.two',
  owner: 'GHI',
  name: 'name5',
  repo: 'GHI/name5',
  repository: 'GHI/name5',
  branch: 'master' }

// https://stash.one.two/projects/JKL/repos/nam-e6/branches
{ host: 'stash.one.two',
  owner: 'JKL',
  name: 'nam-e6',
  repo: 'JKL/nam-e6',
  repository: 'JKL/nam-e6',
  branch: 'master' }

// https://internal.one.two:2034/projects/MNOPQ/repos/name7/pull-requests
{ host: 'internal.one.two:2034',
  owner: 'MNOPQ',
  name: 'name7',
  repo: 'MNOPQ/name7',
  repository: 'MNOPQ/name7',
  branch: 'master' }

// https://stash.one.two:5555/projects/KEY/repos/name1/browse/README.md?at=refs%2Fheads%2Fbranch333
{ host: 'stash.one.two:5555',
  owner: 'KEY',
  name: 'name1',
  repo: 'KEY/name1',
  repository: 'KEY/name1',
  branch: 'branch333' }

// https://alond@stash-internal.my.company/scm/a-key/a-project.git
{ host: 'stash-internal.my.company',
  owner: 'scm',
  name: 'a-key',
  repo: 'scm/a-key',
  repository: 'scm/a-key',
  branch: 'master' }

// https://alond@stash-internal.my.company:3333/scm/a-key/another-project
{ host: 'stash-internal.my.company:3333',
  owner: 'scm',
  name: 'a-key',
  repo: 'scm/a-key',
  repository: 'scm/a-key',
  branch: 'master' }

// ssh://git@stash-internal.some.io:7999/cod/more-proj.git
{ host: 'stash-internal.some.io:7999',
  owner: 'cod',
  name: 'more-proj',
  repo: 'cod/more-proj',
  repository: 'cod/more-proj',
  branch: 'master' }

// git@bb-server.startup.io:27999/tfc/some-proj.git
{ host: 'bb-server.startup.io:27999',
  owner: 'tfc',
  name: 'some-proj',
  repo: 'tfc/some-proj',
  repository: 'tfc/some-proj',
  branch: 'master' }

// git@bb-server.startup.io:27999/tfc/some-proj.git#0.2.3
{ host: 'bb-server.startup.io:27999',
  owner: 'tfc',
  name: 'some-proj',
  repo: 'tfc/some-proj',
  repository: 'tfc/some-proj',
  branch: '0.2.3' }
```

## History

**v0.2.0**

Added support for Bitbucket Server / Stash.

**v0.1.1**

First published version.

**v0.1.0**

Basic version, based on parse-github-url.

NOTE: it is impossible to find out what branch a commit is part of in Bitbucket. Even if a link incldues "at=stable" in
its query string, the actual branch might be wp-pygments-syn or default, etc. For now, we'll just play dumb and imagine 
that at= always works and isn't just cosmetic.
ALSO NOTE: tags and branches are treated alike in Bitbucket and cannot be distinguished by URL.
We'll treat everything like branches.

## Related projects

You might also be interested in these projects:

* [parse-github-url](https://www.npmjs.com/package/parse-github-url): Parse a github/npm URL into an object. | [homepage](https://github.com/jonschlinkert/parse-github-url)
* [bitbucket-short-url-regex](https://www.npmjs.com/package/github-short-url-regex): Regular expression (Regex) for matching github shorthand (user/repo#branch). | [homepage](https://bitbucket.org/regexps/github-short-url-regex)
* [is-git-url](https://www.npmjs.com/package/is-git-url): Regex to validate that a URL is a git url. | [homepage](https://bitbucket.org/jonschlinkert/is-git-url)
* [parse-github-short-url](https://www.npmjs.com/package/parse-github-short-url): Parse a github/npm shorthand (user/repo#branch or user/repo@version) URL into an object. | [homepage](https://bitbucket.org/tunnckocore/parse-github-short-url)

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://bitbucket.org/advance512/parse-bitbucket-url/issues/new).

## Running tests

Install dev dependencies and run the test:

```sh
$ npm install -d && npm test
```

## Author

**Alon Diamant (advance512)**

* [github/advance512](https://github.com/advance512)
* [Homepage](http://www.alondiamant.com)

Heavily based on parse-github-url by **Jon Schlinkert (jonschlinkert)**.

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2016, [Codefresh](https://codefresh.io).
Released under the [MIT license](https://github.com/advance512/parse-bitbucket-url/blob/master/LICENSE).

***

_This file was NOT generated by [verb](https://bitbucket.org/verbose/verb), v0.9.0, on September 20, 2016._
