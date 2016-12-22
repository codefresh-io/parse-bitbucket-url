'use strict';

require('mocha');
var assert = require('assert');
var bb = require('./');

describe('parse-bitbucket-url', function() {
  it('should get the user:', function() {
    assert.equal(bb(''), null);
    assert.equal(bb('https://bitbucket.org/jespern/django-piston').owner, 'jespern');
    assert.equal(bb('git@bitbucket.org:birkenfeld/sphinx.git').owner, 'birkenfeld');
    assert.equal(bb('hg@bitbucket.org:birkenfeld/sphinx.git').owner, 'birkenfeld');
    assert.equal(bb('birkenfeld/sphinx#branch').owner, 'birkenfeld');
    assert.equal(bb('birkenfeld/sphinx#dev').owner, 'birkenfeld');
    assert.equal(bb('birkenfeld/sphinx').owner, 'birkenfeld');
    assert.equal(bb('git+https://bitbucket.org/birkenfeld/sphinx.git').owner, 'birkenfeld');
    assert.equal(bb('git+ssh://bitbucket.org/birkenfeld/sphinx.git').owner, 'birkenfeld');
    assert.equal(bb('git://bitbucket.org/birkenfeld/sphinx').owner, 'birkenfeld');
    assert.equal(bb('git://bitbucket.org/birkenfeld/sphinx.git').owner, 'birkenfeld');
    assert.equal(bb('git://bitbucket.org/foo/bar.git').owner, 'foo');
    assert.equal(bb('git@bitbucket.org:birkenfeld/sphinx.git#stable').owner, 'birkenfeld');
    assert.equal(bb('git@bitbucket.org:birkenfeld/sphinx.git#default').owner, 'birkenfeld');
    assert.equal(bb('git@bitbucket.org:birkenfeld/sphinx.git').owner, 'birkenfeld');
    assert.equal(bb('hg@bitbucket.org:birkenfeld/sphinx.git#stable').owner, 'birkenfeld');
    assert.equal(bb('hg@bitbucket.org:birkenfeld/sphinx.git#default').owner, 'birkenfeld');
    assert.equal(bb('hg@bitbucket.org:birkenfeld/sphinx.git').owner, 'birkenfeld');
    assert.equal(bb('bitbucket:user/repo').owner, 'user');
    assert.equal(bb('http://bitbucket.org/birkenfeld/sphinx').owner, 'birkenfeld');
    assert.equal(bb('http://bitbucket.org/birkenfeld/sphinx.git').owner, 'birkenfeld');
    assert.equal(bb('http://bitbucket.org/birkenfeld/sphinx/src').owner, 'birkenfeld');
    assert.equal(bb('http://bitbucket.org/birkenfeld/sphinx/src/40bd03003ac6fe274ccf3c80d7727509e00a69ea/tests').owner, 'birkenfeld');
    assert.equal(bb('http://bitbucket.org/birkenfeld/sphinx/src/40bd03003ac6fe274ccf3c80d7727509e00a69ea/foo/bar').owner, 'birkenfeld');
    assert.equal(bb('https://birkenfeld@bitbucket.org/birkenfeld/sphinx.git').owner, 'birkenfeld');
    assert.equal(bb('https://birkenfeld@bitbucket.org/birkenfeld/sphinx').owner, 'birkenfeld');
    assert.equal(bb('http://bitbucket.org/snippets/whatever'), null);
    assert.equal(bb('http://bitbucket.com/snippets/whatever'), null);
    assert.equal(bb('https://bitbucket.org/snippets/CFTestBB/koex4'), null);
    assert.equal(bb('https://bitbucket.org/birkenfeld/sphinx').owner, 'birkenfeld');
    assert.equal(bb('https://bitbucket.org/birkenfeld/sphinx.git').owner, 'birkenfeld');
    assert.equal(bb('https://bitbucket.org/birkenfeld/sphinx/src/40bd03003ac6fe274ccf3c80d7727509e00a69ea/README.rst?at=default&fileviewer=file-view-default').owner, 'birkenfeld');
    assert.equal(bb('https://bitbucket.org/birkenfeld/sphinx/src/aa5eea3eb4f39c97e1353783261e51c04020584d/README.rst?at=default&fileviewer=file-view-default').owner, 'birkenfeld');
    assert.equal(bb('https://bitbucket.org/birkenfeld/sphinx/src/aa5eea3eb4f39c97e1353783261e51c04020584d/babel.cfg?at=default&fileviewer=file-view-default').owner, 'birkenfeld');
    assert.equal(bb('https://bitbucket.org/birkenfeld/sphinx/src/6affb32647b1f762ebe40f5dac175e7aa7a15f09/babel.cfg?at=stable&fileviewer=file-view-default').owner, 'birkenfeld');
    assert.equal(bb('https://bitbucket.org/birkenfeld/sphinx/src/6affb32647b1f762ebe40f5dac175e7aa7a15f09/babel.cfg').owner, 'birkenfeld');
    assert.equal(bb('https://bitbucket.org/birkenfeld/sphinx/commits/f2a3d22c9a8d298d8a084b121160c6c3e9a40c77').owner, 'birkenfeld');
    assert.equal(bb('https://bitbucket.org/birkenfeld/sphinx/branch/default').owner, 'birkenfeld');
    assert.equal(bb('https://bitbucket.org/birkenfeld/sphinx/pull-requests/').owner, 'birkenfeld');
    assert.equal(bb('https://bitbucket.org/birkenfeld/sphinx/pull-requests/239/apply-only-directives-when-obtaining-the/diff').owner, 'birkenfeld');
    assert.equal(bb('https://bitbucket.org/birkenfeld/sphinx/overview').owner, 'birkenfeld');
    assert.equal(bb('https://bitbucket.org/birkenfeld/sphinx/downloads').owner, 'birkenfeld');
    assert.equal(bb('https://bitbucket.org/birkenfeld/sphinx/get/40bd03003ac6.zip').owner, 'birkenfeld');
    assert.equal(bb('https://bitbucket.org/birkenfeld/sphinx/get/tip.zip').owner, 'birkenfeld');
    assert.equal(bb('https://bitbucket.org/birkenfeld/sphinx/get/1.0b2.tar.bz2').owner, 'birkenfeld');
    assert.equal(bb('https://bitbucket.org/birkenfeld/sphinx/get/stable.tar.gz').owner, 'birkenfeld');
    assert.equal(bb('https://bitbucket.org/birkenfeld/sphinx/get/stable.7zip').owner, 'birkenfeld');
    assert.equal(bb('foo:bar'), null);
    assert.equal(bb(), null);
    assert.equal(bb(null), null);
    assert.equal(bb(undefined), null);
  });

  it('should get a full repo path:', function() {
    assert.equal(bb('birkenfeld/sphinx#dev').repo, 'birkenfeld/sphinx');
    assert.equal(bb('birkenfeld/sphinx').repo, 'birkenfeld/sphinx');
    assert.equal(bb('git+https://bitbucket.org/birkenfeld/sphinx.git').repo, 'birkenfeld/sphinx');
    assert.equal(bb('git+ssh://bitbucket.org/birkenfeld/sphinx.git').repo, 'birkenfeld/sphinx');
    assert.equal(bb('git://bitbucket.org/birkenfeld/sphinx').repo, 'birkenfeld/sphinx');
    assert.equal(bb('git://bitbucket.org/birkenfeld/sphinx.git').repo, 'birkenfeld/sphinx');
  });

  it('should know when repo is not defined:', function() {
    assert.equal(bb('git+https://bitbucket.org/birkenfeld').name, null);
    assert.equal(bb('git+https://bitbucket.org/birkenfeld').repo, null);
    assert.equal(bb('git+https://bitbucket.org/birkenfeld').owner, 'birkenfeld');
    assert.equal(bb('git+ssh://bitbucket.org/birkenfeld').name, null);
    assert.equal(bb('git+ssh://bitbucket.org/birkenfeld').repo, null);
    assert.equal(bb('git+ssh://bitbucket.org/birkenfeld').owner, 'birkenfeld');
    assert.equal(bb('git://bitbucket.org/birkenfeld').name, null);
    assert.equal(bb('git://bitbucket.org/birkenfeld').repo, null);
    assert.equal(bb('git://bitbucket.org/birkenfeld').owner, 'birkenfeld');
    assert.equal(bb('http://bitbucket.org/birkenfeld').name, null);
    assert.equal(bb('http://bitbucket.org/birkenfeld').repo, null);
    assert.equal(bb('http://bitbucket.org/birkenfeld').repo, null);
    assert.equal(bb('http://bitbucket.org/birkenfeld').owner, 'birkenfeld');
    assert.equal(bb('https://bitbucket.org').name, null);
    assert.equal(bb('https://bitbucket.org').repo, null);
    assert.equal(bb('http://bitbucket.org/birkenfeld').owner, 'birkenfeld');
    assert.equal(bb('https://bitbucket.org').owner, null);
  });

  it('should get the repo:', function() {
    assert.equal(bb('birkenfeld/sphinx#branch').name, 'sphinx');
    assert.equal(bb('birkenfeld/miezelib.repo#branch').name, 'miezelib.repo');
    assert.equal(bb('birkenfeld/sphinx#dev').name, 'sphinx');
    assert.equal(bb('birkenfeld/miezelib.repo#dev').name, 'miezelib.repo');
    assert.equal(bb('birkenfeld/sphinx').name, 'sphinx');
    assert.equal(bb('birkenfeld/miezelib.repo').name, 'miezelib.repo');
    assert.equal(bb('git+https://bitbucket.org/birkenfeld/sphinx.git').name, 'sphinx');
    assert.equal(bb('git+https://bitbucket.org/birkenfeld/miezelib.repo.git').name, 'miezelib.repo');
    assert.equal(bb('git+ssh://bitbucket.org/birkenfeld/sphinx.git').name, 'sphinx');
    assert.equal(bb('git+ssh://bitbucket.org/birkenfeld/miezelib.repo.git').name, 'miezelib.repo');
    assert.equal(bb('git://bitbucket.org/birkenfeld/sphinx').name, 'sphinx');
    assert.equal(bb('git://bitbucket.org/birkenfeld/miezelib.repo').name, 'miezelib.repo');
    assert.equal(bb('git://bitbucket.org/birkenfeld/sphinx.git').name, 'sphinx');
    assert.equal(bb('git://bitbucket.org/birkenfeld/miezelib.repo.git').name, 'miezelib.repo');
    assert.equal(bb('git://bitbucket.org/foo/bar.git').name, 'bar');
    assert.equal(bb('git://bitbucket.org/foo/miezelib.repo.git').name, 'miezelib.repo');
    assert.equal(bb('git@bitbucket.org:birkenfeld/sphinx.git#stable').name, 'sphinx');
    assert.equal(bb('git@bitbucket.org:birkenfeld/miezelib.repo.git#stable').name, 'miezelib.repo');
    assert.equal(bb('git@bitbucket.org:birkenfeld/sphinx.git#default').name, 'sphinx');
    assert.equal(bb('git@bitbucket.org:birkenfeld/miezelib.repo.git#default').name, 'miezelib.repo');
    assert.equal(bb('git@bitbucket.org:birkenfeld/sphinx.git').name, 'sphinx');
    assert.equal(bb('git@bitbucket.org:birkenfeld/miezelib.repo.git').name, 'miezelib.repo');
    assert.equal(bb('hg@bitbucket.org:birkenfeld/sphinx#stable').name, 'sphinx');
    assert.equal(bb('hg@bitbucket.org:birkenfeld/miezelib.repo#stable').name, 'miezelib.repo');
    assert.equal(bb('hg@bitbucket.org:birkenfeld/sphinx#default').name, 'sphinx');
    assert.equal(bb('hg@bitbucket.org:birkenfeld/miezelib.repo#default').name, 'miezelib.repo');
    assert.equal(bb('hg@bitbucket.org:birkenfeld/sphinx').name, 'sphinx');
    assert.equal(bb('hg@bitbucket.org:birkenfeld/miezelib.repo').name, 'miezelib.repo');
    assert.equal(bb('bitbucket:birkenfeld/sphinx').name, 'sphinx');
    assert.equal(bb('bitbucket:birkenfeld/miezelib.repo').name, 'miezelib.repo');
    assert.equal(bb('http://bitbucket.org/birkenfeld/sphinx').name, 'sphinx');
    assert.equal(bb('http://bitbucket.org/birkenfeld/miezelib.repo').name, 'miezelib.repo');
    assert.equal(bb('http://bitbucket.org/birkenfeld/sphinx.git').name, 'sphinx');
    assert.equal(bb('http://bitbucket.org/birkenfeld/miezelib.repo.git').name, 'miezelib.repo');
    assert.equal(bb('http://bitbucket.org/birkenfeld/sphinx/src').name, 'sphinx');
    assert.equal(bb('http://bitbucket.org/birkenfeld/miezelib.repo/src').name, 'miezelib.repo');
    assert.equal(bb('http://bitbucket.org/birkenfeld/sphinx/src/master').name, 'sphinx');
    assert.equal(bb('http://bitbucket.org/birkenfeld/miezelib.repo/src/master').name, 'miezelib.repo');
    assert.equal(bb('http://bitbucket.org/birkenfeld/sphinx/src/master/foo/dev').name, 'sphinx');
    assert.equal(bb('http://bitbucket.org/birkenfeld/miezelib.repo/src/master/foo/dev').name, 'miezelib.repo');
    assert.equal(bb('https://birkenfeld@bitbucket.org/birkenfeld/sphinx.git').name, 'sphinx');
    assert.equal(bb('https://birkenfeld@bitbucket.org/birkenfeld/miezelib.repo.git').name, 'miezelib.repo');
    assert.equal(bb('https://birkenfeld@bitbucket.org/birkenfeld/sphinx').name, 'sphinx');
    assert.equal(bb('https://birkenfeld@bitbucket.org/birkenfeld/miezelib.repo').name, 'miezelib.repo');
    assert.equal(bb('https://bitbucket.org/birkenfeld/sphinx').name, 'sphinx');
    assert.equal(bb('https://bitbucket.org/birkenfeld/miezelib.repo').name, 'miezelib.repo');
    assert.equal(bb('https://bitbucket.org/birkenfeld/sphinx.git').name, 'sphinx');
    assert.equal(bb('https://bitbucket.org/birkenfeld/miezelib.repo.git').name, 'miezelib.repo');
    assert.equal(bb('https://bitbucket.org/birkenfeld/sphinx/src/249b21a86400b38969cee3d5df6d2edf8813c137/README.md').name, 'sphinx');
    assert.equal(bb('https://bitbucket.org/birkenfeld/miezelib.repo/src/249b21a86400b38969cee3d5df6d2edf8813c137/README.md').name, 'miezelib.repo');
    assert.equal(bb('https://bitbucket.org/birkenfeld/sphinx/blob/master/foo/index.js').name, 'sphinx');
    assert.equal(bb('https://bitbucket.org/birkenfeld/miezelib.repo/src/249b21a86400b38969cee3d5df6d2edf8813c137/foo/index.js').name, 'miezelib.repo');
  });

  it('should get the host:', function() {
    assert.equal(bb('git+https://bitbucket.org/birkenfeld/sphinx.git').host, 'bitbucket.org');
    assert.equal(bb('git+ssh://bitbucket.org/birkenfeld/sphinx.git').host, 'bitbucket.org');
    assert.equal(bb('git://bitbucket.org/birkenfeld/sphinx').host, 'bitbucket.org');
    assert.equal(bb('git://bitbucket.org/birkenfeld/sphinx.git').host, 'bitbucket.org');
    assert.equal(bb('https://bitbucket.org/birkenfeld/sphinx').host, 'bitbucket.org');
    assert.equal(bb('git+https://bitbucket.com/birkenfeld/sphinx.git').host, 'bitbucket.com');
    assert.equal(bb('git+ssh://bitbucket.com/birkenfeld/sphinx.git').host, 'bitbucket.com');
    assert.equal(bb('git://bitbucket.com/birkenfeld/sphinx').host, 'bitbucket.com');
    assert.equal(bb('git://bitbucket.com/birkenfeld/sphinx.git').host, 'bitbucket.com');
    assert.equal(bb('https://bitbucket.com/birkenfeld/sphinx').host, 'bitbucket.com');
  });

  it('should assume bitbucket.org is the host when not provided:', function() {
    assert.equal(bb('birkenfeld/sphinx').host, 'bitbucket.org');
  });

  it('should get the branch:', function() {
    assert.equal(bb('birkenfeld/sphinx#branch').branch, 'branch');
    assert.equal(bb('birkenfeld/sphinx#dev').branch, 'dev');
    assert.equal(bb('git@bitbucket.org:birkenfeld/sphinx.git#stable').branch, 'stable');
    assert.equal(bb('git@bitbucket.org:birkenfeld/sphinx.git#default').branch, 'default');
    assert.equal(bb('hg@bitbucket.org:birkenfeld/sphinx.git#stable').branch, 'stable');
    assert.equal(bb('hg@bitbucket.org:birkenfeld/sphinx.git#default').branch, 'default');
    assert.equal(bb('https://bitbucket.org/birkenfeld/sphinx/get/default.tar.bz2').branch, 'default');
    assert.equal(bb('https://bitbucket.org/birkenfeld/sphinx/get/stable.tar.gz').branch, 'stable');
    assert.equal(bb('https://bitbucket.org/birkenfeld/sphinx/get/develop.zip').branch, 'develop');
    assert.equal(bb('https://bitbucket.org/birkenfeld/sphinx/get/40bd03003ac6.zip').branch, '40bd03003ac6');
    assert.equal(bb('https://bitbucket.org/birkenfeld/sphinx/get/tip.zip').branch, 'master');
    assert.equal(bb('https://bitbucket.org/birkenfeld/sphinx/get/1.0b2.tar.bz2').branch, '1.0b2');
    // Note: This just show you how it is impossible to find out what branch a commit is part of in Bitbucket.
    // The link says 'at=stable' yet the actual branch is wp-pygments-syn. So, for now, we'll just play dumb and
    // imagine that at= always works and isn't just cosmetic as some screens.
    assert.equal(bb('https://bitbucket.org/nagy12/sphinx-3/commits/3acf7fd924820127947edb59dcfdc3ad7700afab?at=stable').branch, 'stable');
    assert.equal(bb('https://bitbucket.org/birkenfeld/sphinx/src/17af190a72e157f767e30a284f49bdcd2b5a3689?at=0.1.61611').branch, '0.1.61611');
    assert.equal(bb('https://bitbucket.org/birkenfeld/sphinx/src/40bd03003ac6fe274ccf3c80d7727509e00a69ea/AUTHORS?at=tip&fileviewer=file-view-default').branch, 'tip');
    assert.equal(bb('https://bitbucket.org/birkenfeld/sphinx/src/6affb32647b1f762ebe40f5dac175e7aa7a15f09/utils/pylintrc?at=stable&fileviewer=file-view-default').branch, 'stable');
    assert.equal(bb('https://bitbucket.org/birkenfeld/sphinx/src/17af190a72e157f767e30a284f49bdcd2b5a3689/utils/pylintrc?at=feature/branch/magic&fileviewer=file-view-default').branch, 'feature/branch/magic');
    assert.equal(bb('https://bitbucket.org/birkenfeld/sphinx/src/249b21a86400b38969cee3d5df6d2edf8813c137?at=master/foo/bar').branch, 'master/foo/bar');
    assert.equal(bb('https://bitbucket.org/birkenfeld/sphinx/src/6affb32647b1f762ebe40f5dac175e7aa7a15f09/tests/coverage.py?at=stable&fileviewer=file-view-default').branch, 'stable');

  });

  it('should get the filepath:', function() {
    assert.equal(bb('birkenfeld/sphinx#branch').filepath, null);
    assert.equal(bb('birkenfeld/sphinx#dev').filepath, null);
    assert.equal(bb('git@bitbucket.org:birkenfeld/sphinx.git#stable').filepath, null);
    assert.equal(bb('git@bitbucket.org:birkenfeld/sphinx.git#default').filepath, null);
    assert.equal(bb('hg@bitbucket.org:birkenfeld/sphinx.git#stable').filepath, null);
    assert.equal(bb('hg@bitbucket.org:birkenfeld/sphinx.git#default').filepath, null);
    assert.equal(bb('https://bitbucket.org/birkenfeld/sphinx/get/default.tar.bz2').filepath, null);
    assert.equal(bb('https://bitbucket.org/birkenfeld/sphinx/get/stable.tar.gz').filepath, null);
    assert.equal(bb('https://bitbucket.org/birkenfeld/sphinx/get/develop.zip').filepath, null);
    assert.equal(bb('https://bitbucket.org/birkenfeld/sphinx/get/40bd03003ac6.zip').filepath, null);
    assert.equal(bb('https://bitbucket.org/birkenfeld/sphinx/get/tip.zip').filepath, null);
    assert.equal(bb('https://bitbucket.org/birkenfeld/sphinx/get/1.0b2.tar.bz2').filepath, null);
    assert.equal(bb('https://bitbucket.org/nagy12/sphinx-3/commits/3acf7fd924820127947edb59dcfdc3ad7700afab?at=stable').filepath, null);
    assert.equal(bb('https://bitbucket.org/birkenfeld/sphinx/src/6affb32647b1f762ebe40f5dac175e7aa7a15f09/tests/coverage.py?at=stable&fileviewer=file-view-default').filepath, 'tests/coverage.py');
    assert.equal(bb('https://bitbucket.org/birkenfeld/sphinx/src/40bd03003ac6fe274ccf3c80d7727509e00a69ea/AUTHORS?at=tip&fileviewer=file-view-default').filepath, 'AUTHORS');
    assert.equal(bb('https://bitbucket.org/birkenfeld/sphinx/raw/6affb32647b1f762ebe40f5dac175e7aa7a15f09/tests/coverage.py').filepath, 'tests/coverage.py');

  });




  it('should use master branch when another branch is not defined:', function() {
    assert.equal(bb('birkenfeld/sphinx').branch, 'master');
    assert.equal(bb('git://bitbucket.org/foo/bar.git').branch, 'master');
    assert.equal(bb('git@bitbucket.org:birkenfeld/sphinx.git').branch, 'master');
    assert.equal(bb('hg@bitbucket.org:birkenfeld/sphinx.git').branch, 'master');
    assert.equal(bb('bitbucket:birkenfeld/sphinx').branch, 'master');
    assert.equal(bb('http://bitbucket.org/nagy12/sphinx-3/commits/3acf7fd924820127947edb59dcfdc3ad7700afab').branch, 'master');
    assert.equal(bb('https://bitbucket.org/birkenfeld/sphinx').branch, 'master');
    assert.equal(bb('https://bitbucket.org/birkenfeld/sphinx/src/17af190a72e157f767e30a284f49bdcd2b5a3689').branch, 'master');
    assert.equal(bb('https://bitbucket.org/birkenfeld/sphinx/src/40bd03003ac6fe274ccf3c80d7727509e00a69ea/AUTHORS').branch, 'master');
  });

  it('should work with Bitbucket Server URLs:', function() {
    assert.equal(bb('https://stash.one.two/projects/KEY/repos/name1/browse').owner, 'KEY');
    assert.equal(bb('https://stash.one.two/projects/ONE/repos/name2/browse').owner, 'ONE');
    assert.equal(bb('https://stash.one.two/projects/ABC/repos/name3/commits/a1aa8e5c5b99002396d449c1bdd4d6946303bbc3').name, 'name3');
    assert.equal(bb('https://stash.one.two/projects/DEF/repos/na-me4/commits').name, 'na-me4');
    assert.equal(bb('https://bitbucketserver.one.two/projects/GHI/repos/name5/compare/commits?sourceBranch=refs%2Fheads%2Fmaster&targetBranch=refs%2Fheads%2Fbugfix%2Fdevelop').repo, 'GHI/name5');
    assert.equal(bb('https://stash.one.two/projects/JKL/repos/nam-e6/branches').repo, 'JKL/nam-e6');
    assert.equal(bb('https://internal.one.two:2034/projects/MNOPQ/repos/name7/pull-requests').host, 'internal.one.two:2034');
    assert.equal(bb('https://stash-internal.my.company:3333/projects/KEY/repos/name1/browse/README.md?at=refs%2Fheads%2Fbranch333').host, 'stash-internal.my.company:3333');
    assert.equal(bb('https://advance512@stash-internal.my.company/scm/a-key/a-project.git').branch, 'master');
    assert.equal(bb('https://stash-internal.my.company:3333/projects/KEY/repos/name1/browse/README.md?at=refs%2Fheads%2Fbranch333').branch, 'branch333');
    assert.equal(bb('https://stash.one.two/projects/KEY').owner, 'KEY');
    assert.equal(bb('https://stash.one.two/projects/KEY').name, null);
    assert.equal(bb('https://stash.one.two/projects/KEY').repo, null);
    assert.equal(bb('https://stash.one.two/projects/KEY/repos').owner, 'KEY');
    assert.equal(bb('https://stash.one.two/projects/KEY/repos/').name, null);
    assert.equal(bb('https://stash.one.two/projects/KEY/repos/').repo, null);

    assert.equal(bb('ssh://git@stash-internal.some.io/cod/more-proj.git').owner, 'cod');
    assert.equal(bb('ssh://git@stash-internal.some.io:7999/cod/more-proj.git').owner, 'cod');
    assert.equal(bb('git@bb-internal.lies.io/tfc/some-proj.git').owner, 'tfc');
    assert.equal(bb('git@bb-internal.lies.io:27999/tfc/some-proj.git').name, 'some-proj');
    assert.equal(bb('git@bb-internal.lies.io:27999/tfc/some-proj.git#0.2.3').host, 'bb-internal.lies.io:27999');
    assert.equal(bb('git@bb-internal.lies.io:27999/tfc/some-proj.git#0.2.3').branch, '0.2.3');

    // Thorough tests of git URLs
    assert.equal(bb('ssh://git@stash-internal.some.io:7999/cod/more-proj.git#someBranch').owner, 'cod');
    assert.equal(bb('ssh://git@stash-internal.some.io:7999/cod/more-proj.git#someBranch').name, 'more-proj');
    assert.equal(bb('ssh://git@stash-internal.some.io:7999/cod/more-proj.git#someBranch').host, 'stash-internal.some.io:7999');
    assert.equal(bb('ssh://git@stash-internal.some.io:7999/cod/more-proj.git#someBranch').branch, 'someBranch');
    assert.equal(bb('ssh://git@stash-internal.some.io:7999/cod/more-proj.git#someBranch').repo, 'cod/more-proj');
    assert.equal(bb('ssh://git@stash-internal.some.io/cod/more-proj.git#someBranch').owner, 'cod');
    assert.equal(bb('ssh://git@stash-internal.some.io/cod/more-proj.git#someBranch').name, 'more-proj');
    assert.equal(bb('ssh://git@stash-internal.some.io/cod/more-proj.git#someBranch').host, 'stash-internal.some.io');
    assert.equal(bb('ssh://git@stash-internal.some.io/cod/more-proj.git#someBranch').branch, 'someBranch');
    assert.equal(bb('ssh://git@stash-internal.some.io/cod/more-proj.git#someBranch').repo, 'cod/more-proj');

    assert.equal(bb('git@stash-internal.some.io:7999/cod/more-proj.git#someBranch').owner, 'cod');
    assert.equal(bb('git@stash-internal.some.io:7999/cod/more-proj.git#someBranch').name, 'more-proj');
    assert.equal(bb('git@stash-internal.some.io:7999/cod/more-proj.git#someBranch').host, 'stash-internal.some.io:7999');
    assert.equal(bb('git@stash-internal.some.io:7999/cod/more-proj.git#someBranch').branch, 'someBranch');
    assert.equal(bb('git@stash-internal.some.io:7999/cod/more-proj.git#someBranch').repo, 'cod/more-proj');
    assert.equal(bb('git@stash-internal.some.io/cod/more-proj.git#someBranch').owner, 'cod');
    assert.equal(bb('git@stash-internal.some.io/cod/more-proj.git#someBranch').name, 'more-proj');
    assert.equal(bb('git@stash-internal.some.io/cod/more-proj.git#someBranch').host, 'stash-internal.some.io');
    assert.equal(bb('git@stash-internal.some.io/cod/more-proj.git#someBranch').branch, 'someBranch');
    assert.equal(bb('git@stash-internal.some.io/cod/more-proj.git#someBranch').repo, 'cod/more-proj');
  });
});
