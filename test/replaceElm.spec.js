/* eslint-env node, mocha, browser */
/* global expect, $ */

import replaceElm from '../replaceElm';

const testID = 'TestNode';

describe('"replaceElm"', () => {
  let testNode;

  before(() => {
    $.html(`
      <div id="${testID}">
        <div class="moved"></div>
        <div class="container">
          <div class="replaceMove"></div>
          <div class="replaceComment"></div>
          <div class="replaceNode"></div>
          <div class="replaceString"></div>
        </div>
      </div>
    `);

    testNode = $.id(testID);
  });

  after(() => $.remove(testID));

  it('Should ignore non DOM child elements', () => {
    let moved = $.query('.moved', testNode)[0];

    expect(replaceElm(null, moved)).to.not.fail;
    expect(replaceElm(document, moved)).to.not.fail;
    expect(replaceElm(window, moved)).to.not.fail;

    moved = $.query('.moved', testNode)[0];

    expect(moved).not.to.be.null;
    expect(moved.parentNode).to.equal(testNode);
  });

  it('Should ignore non DOM node or string replacements', () => {
    let moved = $.query('.moved', testNode)[0];

    expect(moved).not.to.be.undefined;

    expect(replaceElm(moved)).to.not.fail;
    expect(replaceElm(moved, null)).to.not.fail;
    expect(replaceElm(moved, {})).to.not.fail;
    expect(replaceElm(moved, 1234)).to.not.fail;

    moved = $.query('.moved', testNode)[0];

    expect(moved).not.to.be.undefined;
    expect(moved.parentNode).to.equal(testNode);
  });

  it('Should replace a given DOM child element with a DOM node', () => {
    // --- Node replacement ---

    const replaceNode = $.query('.replaceNode', testNode)[0];

    let replacement = $.create('div');
    replacement.className = 'replacement';

    expect(replaceNode.parentNode).to.have.class('container');

    replaceElm(replaceNode, replacement);

    replacement = $.query('.replacement', testNode)[0];

    expect($.query('.replaceNode', testNode)[0]).to.be.undefined;
    expect(replacement).not.to.be.undefined;
    expect(replacement.parentNode).to.have.class('container');


    // --- Comment replacement ---

    const replaceComment = $.query('.replaceComment', testNode)[0];
    const comment = document.createComment('Replace comment');

    expect(replaceComment.parentNode).to.have.class('container');

    replaceElm(replaceComment, comment);

    expect($.query('.replaceCommet', testNode)[0]).to.be.undefined;
    expect(comment.parentNode).not.to.be.null;
    expect(comment.parentNode).to.have.class('container');
  });

  it('Should replace a given DOM child element with a String', () => {
    const replaceMove = $.query('.replaceMove', testNode)[0];
    let moved = $.query('.moved', testNode)[0];

    expect(moved.parentNode).to.equal(testNode);
    expect(replaceMove.parentNode).to.have.class('container');

    replaceElm(replaceMove, moved);

    expect($.query('.replaceMove', testNode)[0]).to.be.undefined;
    expect(moved.parentNode).to.have.class('container');
  });

  it('Should move given DOM node replacement', () => {
    const replaceString = $.query('.replaceString', testNode)[0];
    expect(replaceString.parentNode).to.have.class('container');

    replaceElm(replaceString, '<div class="string-replacement"></div>');

    const replacement = $.query('.string-replacement', testNode)[0];

    expect($.query('.replaceString', testNode)[0]).to.be.undefined;
    expect(replacement).not.to.be.undefined;
    expect(replacement.parentNode).to.have.class('container');
  });
});
