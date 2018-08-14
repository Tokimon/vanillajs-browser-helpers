/* eslint-env node, browser */
/* eslint-disable no-unused-expressions */
/* global sinon */

import { expect, testUtils, describe, it } from './assets/init-test';

import * as evtProps from '../eventOptionsSupported';
import once, { onceBuilder } from '../once';



describe('"once" package', () => {
  describe('"onceBuilder"', () => {
    it('Should always return a function', () => {
      expect(onceBuilder()).to.be.a('function');
      expect(onceBuilder({})).to.be.a('function');
    });

    it('Should only trigger given handler once', () => {
      const spy = sinon.spy();

      onceBuilder()(document.body, 'evt', spy);
      expect(spy).not.to.have.been.called;

      testUtils.trigger('evt', document.body);
      expect(spy).to.have.been.calledOnce;

      testUtils.trigger('evt', document.body);
      expect(spy).to.have.been.calledOnce;
    });

    it('Should accept a custom "on" event binder', () => {
      const fakeOn = sinon.fake();

      onceBuilder({ on: fakeOn })(document.body, 'evt', () => {});

      expect(fakeOn).to.have.been.calledOnce;
    });

    it('Should accept a custom "off" event remover', () => {
      sinon.spy(testUtils, 'off');
      sinon.stub(evtProps, 'default').returns(false);

      onceBuilder({ off: testUtils.off })(document.body, 'evt', () => {});

      testUtils.trigger('evt', document.body);

      expect(testUtils.off).to.have.been.calledOnce;

      testUtils.off.restore();
      evtProps.default.restore();
    });


    const evtPropsTest = evtProps.default() ? it : it.skip;

    evtPropsTest('Should should only use the event remover if event properties are not supported', () => {
      sinon.spy(testUtils, 'off');
      sinon.stub(evtProps, 'default').returns(false);

      const noop = () => {};

      onceBuilder({ off: testUtils.off })(document.body, 'evt', noop);
      testUtils.trigger('evt', document.body);

      expect(testUtils.off).to.have.been.calledOnce;
      evtProps.default.restore();

      onceBuilder({ off: testUtils.off })(document.body, 'evt', noop);
      testUtils.trigger('evt', document.body);

      expect(testUtils.off).to.have.been.calledOnce;

      testUtils.off.restore();
    });
  });

  describe('"once"', () => {
    it('Should return null if neihter handler nor eventNames are given', () => {
      expect(once()).to.be.null;
      expect(once('evt')).to.be.null;
      expect(once(() => {})).to.be.null;

      expect(once('evt', null)).to.be.null;
      expect(once('evt', undefined)).to.be.null;

      expect(once(null, () => {})).to.be.null;
      expect(once(undefined, () => {})).to.be.null;
    });

    it('Should add an given event handler to an object that is triggered only once', () => {
      const spy = sinon.spy();

      once(document.body, 'evt', spy);

      testUtils.trigger('evt', document.body);
      expect(spy).to.have.been.calledOnce;

      testUtils.trigger('evt', document.body);
      expect(spy).to.have.been.calledOnce;
    });

    it('Should accept a "when" option that decides when the handler is triggered', () => {
      const spy = sinon.spy();
      const condition = sinon.stub();

      condition.returns(false);
      condition.onCall(1).returns(true);

      once(document.body, 'evt', spy, { when: condition });

      testUtils.trigger('evt', document.body);
      expect(spy).not.to.have.been.called;
      expect(condition).to.have.been.calledOnce;

      testUtils.trigger('evt', document.body);
      expect(spy).to.have.been.calledOnce;
      expect(condition).to.have.been.calledTwice;

      testUtils.trigger('evt', document.body);
      expect(spy).to.have.been.calledOnce;
      expect(condition).to.have.been.calledTwice;
    });

    it('Should add multiple event handlers to an object that are triggered only once', () => {
      const spy1 = sinon.spy();
      const spy2 = sinon.spy();

      once(document.body, 'click custom', spy1);
      once(document.body, ['click', 'custom'], spy2);

      testUtils.trigger('click', document.body);

      expect(spy1).to.have.been.calledOnce;
      expect(spy2).to.have.been.calledOnce;

      testUtils.trigger('custom', document.body);

      expect(spy1).to.have.been.calledTwice;
      expect(spy2).to.have.been.calledTwice;

      testUtils.trigger('click', document.body);
      testUtils.trigger('custom', document.body);

      expect(spy1).to.have.been.calledTwice;
      expect(spy2).to.have.been.calledTwice;
    });

    it('Should fall back to document if element is not defined', () => {
      const spy = sinon.spy();

      once('evt', spy);

      testUtils.trigger('evt', window);
      expect(spy).not.to.have.been.called;

      testUtils.trigger('evt', document);
      expect(spy).to.have.been.calledOnce;
    });
  });
});
