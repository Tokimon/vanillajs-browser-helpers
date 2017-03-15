/* eslint-env node, mocha, browser */
/* eslint-disable no-unused-expressions */
/* global expect, $, sinon */

import 'polyfills/object-assign-polyfill';

import delegate, { delegateHandler, delegateBuilder } from '../delegate';

describe('"delegate" package', () => {
  describe('"delegateHandler"', () => {
    it('Should return a function when all arguemnts are present', () => {
      expect(delegateHandler('body', () => {})).to.be.a('function');
    });

    it('Should return null if not all arguments are given', () => {
      expect(delegateHandler('body')).to.be.null;
      expect(delegateHandler()).to.be.null;
    });

    it('Should call handler if event target matches the delegation', () => {
      const delegateCb = sinon.spy();
      const handler = delegateHandler('body', delegateCb);

      handler({ target: document.body });

      expect(delegateCb).to.have.been.calledOnce;
    });

    it('Should call handler if event target is a child of delegation target', () => {
      $.html('<div id="Delegate"><div id="Child"></div></div>');

      const delegateCb = sinon.spy();
      const handler = delegateHandler('body', delegateCb);

      handler({ target: $.id('Delegate') });
      handler({ target: $.id('Child') });

      expect(delegateCb).to.have.been.calledTwice;

      $.remove('Delegate');
    });
  });

  describe('"delegateBuilder"', () => {
    it('Should return null if no function is given a parameter', () => {
      expect(delegateBuilder(null)).to.be.null;
      expect(delegateBuilder('once')).to.be.null;
      expect(delegateBuilder({})).to.be.null;
    });

    it('Should return a function if a function is given a parameter', () => {
      expect(delegateBuilder(() => {})).to.be.a('function');
    });

    it('Should use "on" as default event binding method', () => {
      // I don't really know how to test if the 'on' method has been used within
      // the function, as you can't mock the function used in the modules. Hence this vague test.
      expect(delegateBuilder()).to.be.a('function');
    });

    it('Should use specified event binding method', () => {
      const _on = sinon.spy();
      const delegateBinder = delegateBuilder(_on);

      expect(delegateBinder).to.be.a('function');
      delegateBinder(document, 'someevent', '.delegation', () => {});
      expect(_on).to.have.been.called;
    });
  });

  describe('"delegate"', () => {
    it('Should not bind event if not all arguments are given', () => {
      expect(delegate(document, 'delegate', 'body')).to.not.fail;
      expect(delegate(document, 'delegate')).to.not.fail;
      expect(delegate(document)).to.not.fail;
    });

    it('Should ignore objects that are not a HTML Node or window', () => {
      expect(delegate(null)).to.not.fail;
      expect(delegate({})).to.not.fail;
      expect(delegate()).to.not.fail;
    });

    it('Should bind a delagate event handler to an object', () => {
      const delegateCb = sinon.spy();
      delegate(document, 'delegate', 'body', delegateCb);
      $.trigger('delegate', document.body);
      expect(delegateCb).to.have.been.calledOnce;
    });
  });
});
