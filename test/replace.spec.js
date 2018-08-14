/* eslint-env node, browser */
/* eslint-disable no-unused-expressions */

import { expect, testUtils, describe, it, before, after } from './assets/init-test';

import replace from '../replace';



const testID = 'TestNode';



describe('"replace"', () => {
  let testNode;

  before(() => {
    testUtils.html(`
      <div id="${testID}">
        <div class="moved"><div id="child"></div></div>
        <div class="container">
          <div class="replaceMove"></div>
          <div class="replaceComment"></div>
          <div class="replaceNode"></div>
          <div class="replaceString"></div>
          <div class="removeString"></div>
          <div class="removeNull"></div>
        </div>
      </div>
    `);

    testNode = testUtils.id(testID);
  });

  after(() => testUtils.remove(testID));

  it('Should ignore non DOM child elements', () => {
    const moved = testUtils.query('.moved', testNode)[0];

    expect(replace(null, moved)).to.not.fail;
    expect(replace(document, moved)).to.not.fail;
    expect(replace(document.documentElement, moved)).to.not.fail;
    expect(replace(window, moved)).to.not.fail;

    expect(moved.parentNode).to.equal(testNode);
  });

  it('Should always return the replaced element', () => {
    const child = testUtils.id('child', testNode)[0];

    expect(replace(null, child)).to.be.null;
    expect(replace(document, child)).to.equal(document);
    expect(replace(child, testUtils.create('div'))).to.equal(child);
  });

  it('Should ignore replacements that are not DOM node, null or string', () => {
    const moved = testUtils.query('.moved', testNode)[0];

    expect(replace(moved)).to.equal(moved);
    expect(replace(moved, {})).to.equal(moved);
    expect(replace(moved, 1234)).to.equal(moved);

    expect(moved.parentNode).to.equal(testNode);
  });

  it('Should replace a given DOM child element with a DOM node', () => {
    // --- Node replacement ---

    const replaceNode = testUtils.query('.replaceNode', testNode)[0];

    let replacement = testUtils.create('div');
    replacement.className = 'replacement';

    expect(replaceNode.parentNode).to.have.class('container');

    replace(replaceNode, replacement);

    replacement = testUtils.query('.replacement', testNode)[0];

    expect(replaceNode.parentNode).to.be.null;
    expect(testUtils.query('.replaceNode', testNode)[0]).to.be.undefined;
    expect(replacement.parentNode).to.have.class('container');


    // --- Comment replacement ---

    const replaceComment = testUtils.query('.replaceComment', testNode)[0];
    const comment = document.createComment('Replace comment');

    expect(replaceComment.parentNode).to.have.class('container');

    replace(replaceComment, comment);

    expect(replaceComment.parentNode).to.be.null;
    expect(testUtils.query('.replaceCommet', testNode)[0]).to.be.undefined;
    expect(comment.parentNode).to.have.class('container');
  });

  it('Should replace a given DOM child element with a String', () => {
    const replaceMove = testUtils.query('.replaceMove', testNode)[0];
    let moved = testUtils.query('.moved', testNode)[0];

    expect(moved.parentNode).to.equal(testNode);
    expect(replaceMove.parentNode).to.have.class('container');

    replace(replaceMove, moved);

    expect(testUtils.query('.replaceMove', testNode)[0]).to.be.undefined;
    expect(moved.parentNode).to.have.class('container');
  });

  it('Should move given DOM node replacement', () => {
    const replaceString = testUtils.query('.replaceString', testNode)[0];
    expect(replaceString.parentNode).to.have.class('container');

    replace(replaceString, '<div class="string-replacement"></div>');

    const replacement = testUtils.query('.string-replacement', testNode)[0];

    expect(testUtils.query('.replaceString', testNode)[0]).to.be.undefined;
    expect(replacement).not.to.be.undefined;
    expect(replacement.parentNode).to.have.class('container');
  });

  it('Should remove given DOM node when null or empty string is given', () => {
    // --- Empty string ---

    const removeString = testUtils.query('.removeString', testNode)[0];
    expect(removeString).not.to.be.undefined;
    expect(removeString.parentNode).to.have.class('container');

    replace(removeString, '');

    expect(removeString.parentNode).to.be.null;
    expect(testUtils.query('.removeString', testNode)[0]).to.be.undefined;

    // --- NULL ---

    const removeNull = testUtils.query('.removeNull', testNode)[0];
    expect(removeNull).not.to.be.undefined;
    expect(removeNull.parentNode).to.have.class('container');

    replace(removeNull, null);

    expect(removeNull.parentNode).to.be.null;
    expect(testUtils.query('.removeNull', testNode)[0]).to.be.undefined;
  });
});
