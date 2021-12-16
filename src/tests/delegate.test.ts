import { triggerEvent, insertHtml, removeElement, byId, generateId } from './assets/helpers';

import delegate, { delegateHandler } from '../delegate';



const delegateID = generateId('Delegate');
const childID = generateId('Child');


describe('"delegate"', () => {
  describe('"delegateHandler"', () => {
    it('Calls handler when event target matches the delegation', () => {
      const cb = jest.fn();
      const handler = delegateHandler('body', cb);

      document.addEventListener('click', handler);

      triggerEvent('click', document.body);

      document.removeEventListener('click', handler);

      expect(cb).toHaveBeenCalledTimes(1);
    });

    it('Does not call handler when event target does not match delegation', () => {
      insertHtml(`<div id="${delegateID}"></div>`);

      const cb = jest.fn();
      const handler = delegateHandler('#Delegate', cb);

      document.addEventListener('click', handler);

      triggerEvent('click', document.body);

      document.removeEventListener('click', handler);

      expect(cb).toHaveBeenCalledTimes(0);

      removeElement(delegateID);
    });

    it('Calls handler when event target is a child of delegation target', () => {
      insertHtml(`<div id="${delegateID}"><div id="${childID}"></div></div>`);

      const cb = jest.fn();
      const handler = delegateHandler('#' + delegateID, cb);

      document.addEventListener('click', handler);

      triggerEvent('click', byId(delegateID) as Element);
      triggerEvent('click', byId(childID) as Element);

      document.removeEventListener('click', handler);

      expect(cb).toHaveBeenCalledTimes(2);

      removeElement(delegateID);
    });
  });

  describe('"delegate"', () => {
    it('Bind a delegate event handler to an object', () => {
      const cb = jest.fn();

      delegate(document, 'delegate', 'body', cb);

      triggerEvent('delegate', document.body);

      expect(cb).toHaveBeenCalledTimes(1);
    });

    it('Defaults to document if no valid event target is given', () => {
      const cb = jest.fn();

      delegate('delegate', 'body', cb);

      triggerEvent('delegate', document.body);

      expect(cb).toHaveBeenCalledTimes(1);
    });
  });
});
