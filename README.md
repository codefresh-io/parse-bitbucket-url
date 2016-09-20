See the [release history](#history) for details.

**Why a Bitbucket URL parser library?**

Cuz I needed it. And I really liked parse-github-url's simplicity. So now you have this. Have fun.

(`parse-vcs-url` you say? nahhh, that's way too few `require`s) 

## Usage

```js
var bb = require('{%= name %}');
bb('https://bitbucket.org/jespern/django-piston');
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

// git@gh.pages.com:birkenfeld/sphinx.git
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
```

## History

**v0.1.0**

Basic version, based on parse-github-url.

Note: it is impossible to find out what branch a commit is part of in Bitbucket. Even if a link incldues "at=stable" in
its query string, the actual branch might be wp-pygments-syn or default, etc. For now, we'll just play dumb and imagine 
that at= always works and isn't just cosmetic.
Also note: tags and branches are treated alike in Bitbucket and cannot be distinguished by URL.
We'll treat everything like branches.

## Related projects

You might also be interested in these projects:

* [parse-github-url](https://www.npmjs.com/package/parse-github-url): Parse a github/npm URL into an object. | [homepage](https://github.com/jonschlinkert/parse-github-url)
* [bitbucket-short-url-regex](https://www.npmjs.com/package/github-short-url-regex): Regular expression (Regex) for matching github shorthand (user/repo#branch). | [homepage](https://bitbucket.org/regexps/github-short-url-regex)
* [is-git-url](https://www.npmjs.com/package/is-git-url): Regex to validate that a URL is a git url. | [homepage](https://bitbucket.org/jonschlinkert/is-git-url)
* [parse-github-short-url](https://www.npmjs.com/package/parse-github-short-url): Parse a github/npm shorthand (user/repo#branch or user/repo@version) URL into an object. | [homepage](https://bitbucket.org/tunnckocore/parse-github-short-url)

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://bitbucket.org/jonschlinkert/parse-bitbucket-url/issues/new).

## Building docs

(broken)

Generate readme and API documentation with [verb](https://bitbucket.org/verbose/verb):

```sh
$ npm install verb && npm run docs
```

Or, if [verb](https://bitbucket.org/verbose/verb) is installed globally:

```sh
$ verb
```

## Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

## Author

**Alon Diamant**

* [github/advance512](https://github.com/advance512)
* [Homepage](http://www.alondiamant.com)

Heavily based on parse-github-url by **Jon Schlinkert**.

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2016, [Alon Diamant](https://github.com/advance512).
Released under the [MIT license](https://github.com/advance512/parse-bitbucket-url/blob/master/LICENSE).

***

_This file was NOT generated by [verb](https://bitbucket.org/verbose/verb), v0.9.0, on September 20, 2016._