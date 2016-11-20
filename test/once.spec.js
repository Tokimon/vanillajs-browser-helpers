/* eslint-env node, mocha, browser */
/* global expect, $ */

import once, { onceBuilder } from '../once';

describe('"once" package', () => {
  const onCb = sinon.spy();
  const strCb = sinon.spy();
  const arrCb = sinon.spy();

  describe('"onceBuilder"', () => {
    it('Should always return a function', () => {
      expect(onceBuilder()).to.be.a('function');
      expect(onceBuilder(null, null)).to.be.a('function');
      expect(onceBuilder(null, () => {})).to.be.a('function');
      expect(onceBuilder(() => {}, () => {})).to.be.a('function');
      expect(onceBuilder('String', 1234)).to.be.a('function');
      expect(onceBuilder(1234, 'String')).to.be.a('function');
      expect(onceBuilder({})).to.be.a('function');
      expect(onceBuilder(undefined, 'String')).to.be.a('function');
    });

    it('Should use "on" as default event binder and "off" as default event remover', () => {
      // NOTE:
      // This can't actually be tested as the "on" and "off" methods cannot be mocked from here,
      // but it can be tested that an event has been bound and removed after event has fired
      // even if no methods have been given

      const customOnce = onceBuilder();
      customOnce(document.body, 'on', onCb);

      onCb.reset();

      expect(onCb).not.to.have.been.called;

      $.trigger('on', document.body);
      expect(onCb).to.have.been.calledOnce;

      onCb.reset();

      $.trigger('on', document.body);
      expect(onCb).not.to.have.been.called;
    });

    it('Should accept a custom "on" event binder', () => {
      sinon.spy($, 'on');

      const customOnce = onceBuilder($.on);
      const tempHandler = customOnce(document.body, 'on', onCb);
      expect($.on).to.have.been.calledOnce;

      // Clean up
      $.off(document.body, 'on', tempHandler);

      onCb.reset();
      $.on.restore();
    });

    it('Should accept a custom "off" event remover', () => {
      sinon.spy($, 'off');

      const customOnce = onceBuilder($.on, $.off);
      customOnce(document.body, 'on', onCb);

      onCb.reset();

      $.trigger('on', document.body);

      expect($.off).to.have.been.calledOnce;

      onCb.reset();

      $.trigger('on', document.body);
      expect(onCb).not.to.have.been.called;

      onCb.reset();
      $.off.restore();
    });
  });

  describe('"once"', () => {
    it('Should return null if the handler is not a function', () => {
      expect(once(document.body, 'on')).to.be.null;
      expect(once(document.body, 'on', null)).to.be.null;
      expect(once(document.body, 'on', 'String')).to.be.null;
      expect(once(document.body, 'on', 1234)).to.be.null;
      expect(once(document.body, 'on', {})).to.be.null;
    });

    it('Should always return a function if the handler is defined', () => {
      expect(once(null, null, () => {})).to.be.a('function');
      const tempHandler = once(document.body, 'on', () => {});
      expect(tempHandler).to.be.a('function');
      expect(once(123, 'on', () => {})).to.be.a('function');

      // Clean up
      $.off(document.body, 'on', tempHandler);
    });

    it('Should not add event if handler is not defined', () => {
      onCb.reset();

      $.trigger('on', document.body);
      expect(onCb).not.to.have.been.called;

      once(document.body, 'on');

      onCb.reset();

      $.trigger('on', document.body);
      expect(onCb).not.to.have.been.called;
    });

    it('Should add an given event handler to an object that is triggered only once', () => {
      onCb.reset();

      $.trigger('on', document.body);
      expect(onCb).not.to.have.been.called;

      onCb.reset();

      once(document.body, 'on', onCb);

      $.trigger('on', document.body);
      expect(onCb).to.have.been.calledOnce;

      onCb.reset();

      $.trigger('on', document.body);
      expect(onCb).not.to.have.been.called;
    });

    it('Should add multiple event handlers to an object that are triggered only once', () => {
      strCb.reset();
      arrCb.reset();

      $.trigger('click', document.body);
      $.trigger('custom', document.body);

      expect(strCb).not.to.have.been.called;
      expect(arrCb).not.to.have.been.called;

      once(document.body, 'click custom', strCb);
      once(document.body, ['click', 'custom'], arrCb);

      strCb.reset();
      arrCb.reset();

      $.trigger('click', document.body);
      $.trigger('custom', document.body);

      expect(strCb).to.have.been.calledTwice;
      expect(arrCb).to.have.been.calledTwice;

      strCb.reset();
      arrCb.reset();

      $.trigger('click', document.body);
      $.trigger('custom', document.body);

      expect(strCb).not.to.have.been.called;
      expect(arrCb).not.to.have.been.called;
    });
  })
});
