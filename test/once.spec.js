import { expect, helpers, describe, it, spy, fake, stub } from './assets/init-test';

import * as evtProps from '../eventOptionsSupported';
import once, { onceBuilder } from '../once';



describe('"once" package', () => {
  describe('"onceBuilder"', () => {
    it('Should always return a function', () => {
      expect(onceBuilder()).to.be.a('function');
      expect(onceBuilder({})).to.be.a('function');
    });

    it('Should only trigger given handler once', () => {
      const cb = spy();

      onceBuilder()(document.body, 'evt', cb);
      expect(cb).to.have.callCount(0);

      helpers.trigger('evt', document.body);
      expect(cb).to.have.callCount(1);

      helpers.trigger('evt', document.body);
      expect(cb).to.have.callCount(1);
    });

    it('Should accept a custom "on" event binder', () => {
      const fakeOn = fake();

      onceBuilder({ on: fakeOn })(document.body, 'evt', () => {});

      expect(fakeOn).to.have.callCount(1);
    });

    it('Should accept a custom "off" event remover', () => {
      spy(helpers, 'off');
      stub(evtProps, 'default').returns(false);

      onceBuilder({ off: helpers.off })(document.body, 'evt', () => {});

      helpers.trigger('evt', document.body);

      expect(helpers.off).to.have.callCount(1);

      helpers.off.restore();
      evtProps.default.restore();
    });


    const evtPropsTest = evtProps.default() ? it : it.skip;

    evtPropsTest('Should should only use the event remover if event properties are not supported', () => {
      spy(helpers, 'off');
      stub(evtProps, 'default').returns(false);

      const noop = () => {};

      onceBuilder({ off: helpers.off })(document.body, 'evt', noop);
      helpers.trigger('evt', document.body);

      expect(helpers.off).to.have.callCount(1);
      evtProps.default.restore();

      onceBuilder({ off: helpers.off })(document.body, 'evt', noop);
      helpers.trigger('evt', document.body);

      expect(helpers.off).to.have.callCount(1);

      helpers.off.restore();
    });
  });

  describe('"once"', () => {
    it('Should return null if neihter handler nor eventNames are given', () => {
      expect(once()).to.equal(null);
      expect(once('evt')).to.equal(null);
      expect(once(() => {})).to.equal(null);

      expect(once('evt', null)).to.equal(null);
      expect(once('evt', undefined)).to.equal(null);

      expect(once(null, () => {})).to.equal(null);
      expect(once(undefined, () => {})).to.equal(null);
    });

    it('Should add an given event handler to an object that is triggered only once', () => {
      const cb = spy();

      once(document.body, 'evt', cb);

      helpers.trigger('evt', document.body);
      expect(cb).to.have.callCount(1);

      helpers.trigger('evt', document.body);
      expect(cb).to.have.callCount(1);
    });

    it('Should accept a "when" option that decides when the handler is triggered', () => {
      const cb = spy();
      const condition = stub();

      condition.returns(false);
      condition.onCall(1).returns(true);

      once(document.body, 'evt', cb, { when: condition });

      helpers.trigger('evt', document.body);
      expect(cb).to.have.callCount(0);
      expect(condition).to.have.callCount(1);

      helpers.trigger('evt', document.body);
      expect(cb).to.have.callCount(1);
      expect(condition).to.have.callCount(2);

      helpers.trigger('evt', document.body);
      expect(cb).to.have.callCount(1);
      expect(condition).to.have.callCount(2);
    });

    it('Should add multiple event handlers to an object that are triggered only once', () => {
      const spy1 = spy();
      const spy2 = spy();

      once(document.body, 'click custom', spy1);
      once(document.body, ['click', 'custom'], spy2);

      helpers.trigger('click', document.body);

      expect(spy1).to.have.callCount(1);
      expect(spy2).to.have.callCount(1);

      helpers.trigger('custom', document.body);

      expect(spy1).to.have.callCount(2);
      expect(spy2).to.have.callCount(2);

      helpers.trigger('click', document.body);
      helpers.trigger('custom', document.body);

      expect(spy1).to.have.callCount(2);
      expect(spy2).to.have.callCount(2);
    });

    it('Should fall back to document if element is not defined', () => {
      const cb = spy();

      once('evt', cb);

      helpers.trigger('evt', window);
      expect(cb).to.have.callCount(0);

      helpers.trigger('evt', document);
      expect(cb).to.have.callCount(1);
    });
  });
});
