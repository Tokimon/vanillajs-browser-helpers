import { expect, describe, it } from './assets/init-test';

import create from '../create';



describe('"create"', () => {
  it('Should default to a DIV element when no or non string element is given', () => {
    expect(create('')).to.be.instanceof(HTMLElement).and.to.match('div');
    expect(create(123)).to.be.instanceof(HTMLElement).and.to.match('div');
    expect(create({})).to.be.instanceof(HTMLElement).and.to.match('div');
    expect(create(null)).to.be.instanceof(HTMLElement).and.to.match('div');
    expect(create()).to.be.instanceof(HTMLElement).and.to.match('div');
  });

  it('Should generate HTML element', () => {
    expect(create('div')).to.be.instanceof(HTMLElement).and.to.match('div');
    expect(create('span')).to.be.instanceof(HTMLElement).and.to.match('span');
    expect(create('custom')).to.be.instanceof(HTMLElement).and.to.match('custom');
    expect(create('input')).to.be.instanceof(HTMLElement).and.to.match('input');
    expect(create('br')).to.be.instanceof(HTMLElement).and.to.match('br');
    expect(create('img')).to.be.instanceof(HTMLElement).and.to.match('img');
  });

  it('Should generate HTML element with a given ID', () => {
    expect(create('#id')).to.be.instanceof(HTMLElement).and.to.match('div#id');
    expect(create('#id#id2')).to.be.instanceof(HTMLElement).and.to.match('div#id');
  });

  it('Should generate HTML element with given class names', () => {
    expect(create('.class')).to.be.instanceof(HTMLElement).and.to.match('div.class');
    expect(create('.class.class2')).to.be.instanceof(HTMLElement).and.to.match('div.class.class2');
    expect(create('.some-class.some_class')).to.be.instanceof(HTMLElement).and.to.match('div.some-class.some_class');
  });

  describe('Should generate HTML element with given attributes', () => {
    it('Supports with or without quotes (single and double)', () => {
      expect(create('[class=class]')).to.be.instanceof(HTMLElement).and.to.match('div.class');
      expect(create('[class="class"]')).to.be.instanceof(HTMLElement).and.to.match('div.class');
      expect(create('[class=\'class\']')).to.be.instanceof(HTMLElement).and.to.match('div.class');
    });

    it('Supports no value attributes', () => {
      expect(create('[disabled]')).to.be.instanceof(HTMLElement).and.to.match('div[disabled]');
      expect(create('[custom]')).to.be.instanceof(HTMLElement).and.to.match('div[custom]');
    });

    it('Combines double expressions', () => {
      expect(create('[class="class"][class="class2"]'))
        .to.be.instanceof(HTMLElement)
        .and.to.match('div.class.class2');

      expect(create('[data-attr="some_sort of"][data-attr="phrase"]'))
        .to.be.instanceof(HTMLElement)
        .and.to.match('div[data-attr="some_sort of phrase"]');
    });

    it('Accepts any kind of value', () => {
      expect(create('[data-attr="some-kind of phrase"]'))
        .to.be.instanceof(HTMLElement)
        .and.to.match('div[data-attr="some-kind of phrase"]');

      expect(create('[data-attr="{ json: true }"]'))
        .to.be.instanceof(HTMLElement)
        .and.to.match('div[data-attr="{ json: true }"]');
    });

    it('Autoescapes double quotes', () => {
      expect(create('[data-attr="should accept \'this\'"]'))
        .to.be.instanceof(HTMLElement)
        .and.to.match('div[data-attr="should accept \'this\'"]');

      expect(create('[data-attr="should accept "this""]'))
        .to.be.instanceof(HTMLElement)
        .and.to.have.attribute('data-attr', 'should accept "this"');
    });

    it('Eliminates expressions inside class/id attributes', () => {
      expect(create('[class=".class"]')).to.be.instanceof(HTMLElement).and.to.match('div.class');
      expect(create('[class="#class"]')).to.be.instanceof(HTMLElement).and.to.match('div.class');

      expect(create('[id=".id"]')).to.be.instanceof(HTMLElement).and.to.match('div#id');
      expect(create('[id="#id"]')).to.be.instanceof(HTMLElement).and.to.match('div#id');

      expect(create('[attr="#id"]')).to.be.instanceof(HTMLElement).and.to.match('div[attr="#id"]');
    });

    it('Should accept custom attributes (even with numbers)', () => {
      expect(create('[custom-attribute="value = ok"]'))
        .to.be.instanceof(HTMLElement)
        .and.to.match('div[custom-attribute="value = ok"]');

      expect(create('[custom-2nd-attribute="value = ok"]'))
        .to.be.instanceof(HTMLElement)
        .and.to.match('div[custom-2nd-attribute="value = ok"]');

      expect(create('[custom_attribute="value = ok"]'))
        .to.be.instanceof(HTMLElement)
        .and.to.match('div[custom_attribute="value = ok"]');
    });
  });

  it('Should accept mixed expressions', () => {
    // ".class" takes precedence over "[class=class]"
    expect(create('[class=".class"].main-class'))
      .to.be.instanceof(HTMLElement)
      .and.to.match('div.main-class.class');

    // "#id" overrides "[id=id]"
    expect(create('[id="id"]#main-id'))
      .to.be.instanceof(HTMLElement)
      .and.to.match('div#main-id');

    // Shuld add all attributes
    expect(create('span#id.class[data-attr="value"]'))
      .to.be.instanceof(HTMLElement)
      .and.to.match('span#id.class[data-attr="value"]');
  });

  it('Should should ignore illegal selectors');
});
