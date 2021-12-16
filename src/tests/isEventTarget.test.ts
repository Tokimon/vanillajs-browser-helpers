import isEventTarget from '../isEventTarget';



class Custom extends EventTarget {}



describe('"isEventTarget"', () => {
  describe('Returns `false` for:', () => {
    it.each([
      ['Undefined', undefined],
      ['NULL', null],
      ['Object', {}],
      ['Array', []],
      ['String', ''],
      ['Number', 123],
      ['Boolean', true]
    ])('%s', (_, obj) => {
      expect(isEventTarget(obj)).toBe(false);
    });
  });

  describe('Returns `true` for:', () => {
    it.each([
      ['Window', window],
      ['Document', document],
      ['<div> Element', document.createElement('div')],
      ['Text Node', document.createTextNode('')],
      ['Comment Node', document.createComment('')],
      ['XMLHttpRequest', new XMLHttpRequest()],
      ['Object extending EventTarget', new Custom()]
    ])('%s', (_, obj) => {
      expect(isEventTarget(obj)).toBe(true);
    });
  });
});
