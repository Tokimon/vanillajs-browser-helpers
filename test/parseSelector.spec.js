import { expect, describe, it } from './assets/init-test';

import parseSelector from '../parseSelector';



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
        .to.eql({ tagName: 'div', attributes: { 'data-attr': 'should accept &quot;this&quot;' } });
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
