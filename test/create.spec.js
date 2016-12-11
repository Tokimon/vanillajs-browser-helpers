/* eslint-env node, mocha, browser */
/* global expect */

import create, { parseSelector, selectorToHTML } from '../create';

describe('"parseSelector"', () => {
  it('Should parse the tag name', () => {
    expect(parseSelector('div')).to.eql({ tagName: 'div', attributes: {} });
    expect(parseSelector('span')).to.eql({ tagName: 'span', attributes: {} });
    expect(parseSelector('custom')).to.eql({ tagName: 'custom', attributes: {} });
  });

  it('Should default "tagName" to a DIV when no or non string element is given', () => {
    expect(parseSelector('')).to.eql({ tagName: 'div', attributes: {} });
    expect(parseSelector(123)).to.eql({ tagName: 'div', attributes: {} });
    expect(parseSelector({})).to.eql({ tagName: 'div', attributes: {} });
    expect(parseSelector(null)).to.eql({ tagName: 'div', attributes: {} });
    expect(parseSelector()).to.eql({ tagName: 'div', attributes: {} });
  });

  it('Should parse a given ID', () => {
    expect(parseSelector('#id')).to.eql({ tagName: 'div', attributes: { id: 'id' } });
    expect(parseSelector('#id#id2')).to.eql({ tagName: 'div', attributes: { id: 'id' } });
  });

  it('Should parse a given class names', () => {
    expect(parseSelector('.class')).to.eql({ tagName: 'div', attributes: { class: 'class' } });
    expect(parseSelector('.class.class2')).to.eql({ tagName: 'div', attributes: { class: 'class class2' } });
    expect(parseSelector('.some-class.some_class')).to.eql({ tagName: 'div', attributes: { class: 'some-class some_class' } });
  });

  describe('Should parse attributes', () => {
    it('Supports with or without quotes (single and double)', () => {
      expect(parseSelector('[class=class]')).to.eql({ tagName: 'div', attributes: { class: 'class' } });
      expect(parseSelector('[class="class"]')).to.eql({ tagName: 'div', attributes: { class: 'class' } });
      expect(parseSelector('[class=\'class\']')).to.eql({ tagName: 'div', attributes: { class: 'class' } });
    });

    it('Supports no value attributes', () => {
      expect(parseSelector('[disabled]')).to.eql({ tagName: 'div', attributes: { disabled: '' } });
      expect(parseSelector('[custom]')).to.eql({ tagName: 'div', attributes: { custom: '' } });
    });

    it('Combines double expressions', () => {
      expect(parseSelector('[class="class"][class="class2"]'))
        .to.eql({ tagName: 'div', attributes: { class: 'class class2' } });

      expect(parseSelector('[data-attr="some_sort of"][data-attr="phrase"]'))
        .to.eql({ tagName: 'div', attributes: { 'data-attr': 'some_sort of phrase' } });
    });

    it('Accepts any kind of value', () => {
      expect(parseSelector('[data-attr="some-kind of phrase"]'))
        .to.eql({ tagName: 'div', attributes: { 'data-attr': 'some-kind of phrase' } });

      expect(parseSelector('[data-attr="{ json: true }"]'))
        .to.eql({ tagName: 'div', attributes: { 'data-attr': '{ json: true }' } });
    });

    it('Autoescapes double quotes', () => {
      expect(parseSelector('[data-attr="should accept \'this\'"]'))
        .to.eql({ tagName: 'div', attributes: { 'data-attr': 'should accept \'this\'' } });

      expect(parseSelector('[data-attr="should accept "this""]'))
        .to.eql({ tagName: 'div', attributes: { 'data-attr': 'should accept \\"this\\"' } });
    });

    it('Eliminates expressions inside class/id attributes', () => {
      expect(parseSelector('[class=".class"]')).to.eql({ tagName: 'div', attributes: { class: 'class' } });
      expect(parseSelector('[class="#class"]')).to.eql({ tagName: 'div', attributes: { class: 'class' } });

      expect(parseSelector('[id=".id"]')).to.eql({ tagName: 'div', attributes: { id: 'id' } });
      expect(parseSelector('[id="#id"]')).to.eql({ tagName: 'div', attributes: { id: 'id' } });

      expect(parseSelector('[attr="#id"]')).to.eql({ tagName: 'div', attributes: { attr: '#id' } });
    });

    it('Should accept custom attributes (even with numbers)', () => {
      expect(parseSelector('[custom-attribute="value = ok"]'))
        .to.eql({ tagName: 'div', attributes: { 'custom-attribute': 'value = ok' } });

      expect(parseSelector('[custom-2nd-attribute="value = ok"]'))
        .to.eql({ tagName: 'div', attributes: { 'custom-2nd-attribute': 'value = ok' } });

      expect(parseSelector('[custom_attribute="value = ok"]'))
        .to.eql({ tagName: 'div', attributes: { 'custom_attribute': 'value = ok' } });
    });
  });

  it('Should accept mixed expressions', () => {
    // ".class" takes precedence over "[class=class]"
    expect(parseSelector('[class=".class"].main-class'))
      .to.eql({ tagName: 'div', attributes: { class: 'main-class class' } });

    // "#id" overrides "[id=id]"
    expect(parseSelector('[id="id"]#main-id'))
      .to.eql({ tagName: 'div', attributes: { id: 'main-id' } });

    // Shuld add all attributes
    expect(parseSelector('span#id.class[data-attr="value"]'))
      .to.eql({
        tagName: 'span',
        attributes: {
          id: 'id',
          class: 'class',
          'data-attr': 'value'
        }
      });
  });

  it('Should should ignore illegal selectors');
});

describe('"selectorToHTML"', () => {
  it('Should default to a DIV element when no or non string element is given', () => {
    expect(selectorToHTML('')).to.equal('<div></div>');
    expect(selectorToHTML(123)).to.equal('<div></div>');
    expect(selectorToHTML({})).to.equal('<div></div>');
    expect(selectorToHTML(null)).to.equal('<div></div>');
    expect(selectorToHTML()).to.equal('<div></div>');
  });

  it('Should generate HTML element', () => {
    expect(selectorToHTML('div')).to.equal('<div></div>');
    expect(selectorToHTML('span')).to.equal('<span></span>');
    expect(selectorToHTML('custom')).to.equal('<custom></custom>');
    expect(selectorToHTML('input')).to.equal('<input>');
    expect(selectorToHTML('br')).to.equal('<br>');
    expect(selectorToHTML('img')).to.equal('<img>');
  });

  it('Should generate HTML element with a given ID', () => {
    expect(selectorToHTML('#id')).to.equal('<div id="id"></div>');
    expect(selectorToHTML('#id#id2')).to.equal('<div id="id"></div>');
  });

  it('Should generate HTML element with given class names', () => {
    expect(selectorToHTML('.class')).to.equal('<div class="class"></div>');
    expect(selectorToHTML('.class.class2')).to.equal('<div class="class class2"></div>');
    expect(selectorToHTML('.some-class.some_class')).to.equal('<div class="some-class some_class"></div>');
  });

  describe('Should generate HTML element with given attributes', () => {
    it('Supports with or without quotes (single and double)', () => {
      expect(selectorToHTML('[class=class]')).to.equal('<div class="class"></div>');
      expect(selectorToHTML('[class="class"]')).to.equal('<div class="class"></div>');
      expect(selectorToHTML('[class=\'class\']')).to.equal('<div class="class"></div>');
    });

    it('Supports no value attributes', () => {
      expect(selectorToHTML('[disabled]')).to.equal('<div disabled></div>');
      expect(selectorToHTML('[custom]')).to.equal('<div custom></div>');
    });

    it('Combines double expressions', () => {
      expect(selectorToHTML('[class="class"][class="class2"]')).to.equal('<div class="class class2"></div>');
      expect(selectorToHTML('[data-attr="some_sort of"][data-attr="phrase"]')).to.equal('<div data-attr="some_sort of phrase"></div>');
    });

    it('Accepts any kind of value', () => {
      expect(selectorToHTML('[data-attr="some-kind of phrase"]')).to.equal('<div data-attr="some-kind of phrase"></div>');
      expect(selectorToHTML('[data-attr="{ json: true }"]')).to.equal('<div data-attr="{ json: true }"></div>');
    });

    it('Autoescapes double quotes', () => {
      expect(selectorToHTML('[data-attr="should accept \'this\'"]')).to.equal('<div data-attr="should accept \'this\'"></div>');
      expect(selectorToHTML('[data-attr="should accept "this""]')).to.equal('<div data-attr="should accept \\"this\\""></div>');
    });

    it('Eliminates expressions inside class/id attributes', () => {
      expect(selectorToHTML('[class=".class"]')).to.equal('<div class="class"></div>');
      expect(selectorToHTML('[class="#class"]')).to.equal('<div class="class"></div>');

      expect(selectorToHTML('[id=".id"]')).to.equal('<div id="id"></div>');
      expect(selectorToHTML('[id="#id"]')).to.equal('<div id="id"></div>');

      expect(selectorToHTML('[attr="#id"]')).to.eql('<div attr="#id"></div>');
    });

    it('Should accept custom attributes (even with numbers)', () => {
      expect(selectorToHTML('[custom-attribute="value = ok"]')).to.equal('<div custom-attribute="value = ok"></div>');
      expect(selectorToHTML('[custom-2nd-attribute="value = ok"]')).to.equal('<div custom-2nd-attribute="value = ok"></div>');
      expect(selectorToHTML('[custom_attribute="value = ok"]')).to.equal('<div custom_attribute="value = ok"></div>');
    });
  });

  it('Should accept mixed expressions', () => {
    // ".class" takes precedence over "[class=class]"
    expect(selectorToHTML('[class=".class"].main-class')).to.equal('<div class="main-class class"></div>');

    // "#id" overrides "[id=id]"
    expect(selectorToHTML('[id="id"]#main-id')).to.equal('<div id="main-id"></div>');

    // Shuld add all attributes
    expect(selectorToHTML('span#id.class[data-attr="value"]')).to.match(/^<span( data-attr="value"| id="id"| class="class"){3}/);
  });

  it('Should should ignore illegal selectors');
});

describe('"create"', () => {
  it('Should return null for non strings');
  it('Should create HTML element');
  it('Should create HTML element with a given ID');
  it('Should create HTML element with given class names');
  it('Should create HTML element with given attributes');
  it('Should default to a DIV element when no element is given');
  it('Should should ignore illegal selectors');
});
