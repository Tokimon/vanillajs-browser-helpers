import { createElement } from './assets/helpers';

import isDOMFragment from '../isDOMFragment';



describe('"isDOMFragment"', () => {
  describe('Returns `true` for:', () => {
    it('a Document Fragment', () => {
      expect(isDOMFragment(document.createDocumentFragment())).toBe(true);
    });
  });

  describe('Returns `false` for non Document fragment element:', () => {
    it.each([
      ['<html> element', document.documentElement],
      ['<body> element', document.body],
      ['Document', document],
      ['<p> element', createElement('p')],
      ['Text Node', document.createTextNode('')],
      ['Comment Node', document.createComment('')],
      ['Window', window],
      ['NULL', null],
      ['Object', {}],
      ['Fake Element', { nodeType: 1 }]
    ])('%s', (_, elm) => {
      expect(isDOMFragment(elm)).toBe(false);
    });
  });
});
