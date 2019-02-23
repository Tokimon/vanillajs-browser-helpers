/* eslint-disable no-unused-expressions */

import { expect, helpers, describe, it, spy } from './assets/init-test';

import delegate, { delegateHandler } from '../delegate';



describe('"delegate" package', () => {
  describe('"delegateHandler"', () => {
    it('Should return a function when all arguemnts are present', () => {
      expect(delegateHandler('body', () => {})).to.be.a('function');
    });

    it('Should return null if not all arguments are given', () => {
      expect(delegateHandler('body')).to.equal(undefined);
      expect(delegateHandler()).to.equal(undefined);
    });

    it('Should call handler if event target matches the delegation', () => {
      const delegateCb = spy();
      const handler = delegateHandler('body', delegateCb);

      handler({ target: document.body });

      expect(delegateCb).to.have.callCount(1);
    });

    it('Should call handler if event target is a child of delegation target', () => {
      helpers.html('<div id="Delegate"><div id="Child"></div></div>');

      const delegateCb = spy();
      const handler = delegateHandler('body', delegateCb);

      handler({ target: helpers.id('Delegate') });
      handler({ target: helpers.id('Child') });

      expect(delegateCb).to.have.callCount(2);

      helpers.remove('Delegate');
    });
  });

  describe('"delegate"', () => {
    it('Should not bind event if not all arguments are given', () => {
      expect(delegate(document, 'delegate', 'body')).to.equal(undefined);
      expect(delegate(document, 'delegate')).to.equal(undefined);
      expect(delegate(document)).to.equal(undefined);
    });

    it('Should ignore objects that are not a HTML Node or window', () => {
      expect(delegate(null)).to.equal(undefined);
      expect(delegate({})).to.equal(undefined);
      expect(delegate()).to.equal(undefined);
    });

    it('Should bind a delagate event handler to an object', () => {
      const delegateCb = spy();
      delegate(document, 'delegate', 'body', delegateCb);
      helpers.trigger('delegate', document.body);
      expect(delegateCb).to.have.callCount(1);
    });

    it('Should default to document if no valid event target is given', () => {
      const delegateCb = spy();
      delegate('delegate', 'body', delegateCb);
      helpers.trigger('delegate', document.body);
      expect(delegateCb).to.have.callCount(1);
    });
  });
});
