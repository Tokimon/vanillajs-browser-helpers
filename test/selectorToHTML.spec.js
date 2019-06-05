import { expect, describe, it } from './assets/init-test';

import selectorToHTML from '../selectorToHTML';



describe('"selectorToHTML" >', () => {
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

  describe('Should generate HTML element with given attributes >', () => {
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
      expect(selectorToHTML('[data-attr="should accept "this""]')).to.equal('<div data-attr="should accept &quot;this&quot;"></div>');
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

  it.skip('Should should ignore illegal selectors', () => {
    throw new Error('Not implemented');
  });
});
