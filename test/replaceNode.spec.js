/* eslint-disable no-unused-expressions */

import { expect, helpers, describe, it, before, beforeEach, after } from './assets/init-test';

import replaceNode from '../replaceNode';



const testID = 'ReplaceNodeTest';



describe('"replaceNode" >', () => {
  let testNode;

  before(() => {
    helpers.html(`<div id="${testID}"></div>`);
    testNode = helpers.id(testID);
  });

  beforeEach(() => {
    testNode.innerHTML = '';
  });

  after(() => {
    helpers.remove(testID);
  });

  it('Should ignore non DOM child elements', () => {
    try {
      const div = helpers.create('div');

      replaceNode(null, div);
      replaceNode(document, div);
      replaceNode(document.documentElement, div);
      replaceNode(window, div);
    } catch (ex) {
      expect.fail();
    }
  });

  it('Should always return the replaced element', () => {
    const div = helpers.create('div');

    expect(replaceNode(null, div)).to.equal(null);
    expect(replaceNode(document, div)).to.equal(document);

    helpers.html('<div class="item"></div>', testNode);
    const replaced = helpers.one('.item', testNode);

    expect(replaceNode(replaced, div)).to.equal(replaced);
  });

  it('Should ignore replacements that are not DOM nodes, string or falsy', () => {
    helpers.html(`<div class="parent"><div class="invalid"></div></div>`, testNode);

    const invalid = helpers.one('.invalid', testNode);
    const node = helpers.one('.parent', testNode);

    const test = (replacement) => {
      replaceNode(invalid, replacement);

      const found = helpers.one('.invalid', testNode);
      expect(found).not.to.equal(null, `Didn't ignore: ${replacement}`);
      expect(found.parentNode).to.equal(node, `Moved the item: ${replacement}`);
    };

    test([]);
    test({});
    test(123);
  });

  it('Should remove given DOM node when replacement is falsy', () => {
    helpers.html(`
      <div class="null"></div>
      <div class="undefined"></div>
      <div class="string"></div>
      <div class="number"></div>
      <div class="false"></div>
    `, testNode);

    const test = (replacement) => {
      const type = typeof replacement;
      const cn = `.${type === 'string' || type === 'number' ? type : replacement}`;

      replaceNode(helpers.one(cn, testNode), replacement);
      expect(helpers.one(cn, testNode)).to.equal(null, `Didn't remove on: ${replacement}`);
    };

    test(null);
    test(undefined);
    test(false);
    test(0);
    test('');
  });

  it('Should replace a given DOM element with a DOM node', () => {
    helpers.html(`<div class="item"></div>`, testNode);

    const item = helpers.one('.item', testNode);
    const replacement = helpers.create('div');

    replaceNode(item, replacement);

    expect(helpers.one('.item', testNode)).to.equal(null);
    expect(replacement.parentNode).to.equal(testNode);
  });

  it('Should replace a give DOM element with a DOM comment', () => {
    helpers.html(`<div class="item"></div>`, testNode);

    const item = helpers.one('.item', testNode);
    const comment = document.createComment('Replace comment');

    replaceNode(item, comment);

    expect(helpers.one('.item', testNode)).to.equal(null);
    expect(comment.parentNode).to.equal(testNode);
  });

  it('Should replace a given DOM element with a DOM element generated from a String', () => {
    helpers.html(`<div class="item"></div>`, testNode);

    const item = helpers.one('.item', testNode);
    const string = '<div class="string"></div>';

    replaceNode(item, string);

    expect(helpers.one('.item', testNode)).to.equal(null);

    const inserted = helpers.one('.string', testNode);
    expect(inserted).not.to.equal(null);
    expect(inserted.parentNode).to.equal(testNode);
  });

  it('Should replace a given DOM element with a DOM element elsewhere in the DOM', () => {
    helpers.html(`
      <div class="moveme"></div>
      <div class="parent">
        <div class="item"></div>
      </div>
    `, testNode);

    const moveme = helpers.one('.moveme', testNode);
    const parent = helpers.one('.parent', testNode);
    const item = helpers.one('.item', testNode);

    replaceNode(item, moveme);

    expect(helpers.one('.item', testNode)).to.equal(null);
    expect(moveme.parentNode).to.equal(parent);
  });
});
