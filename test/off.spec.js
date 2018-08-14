/* eslint-env node, browser */
/* eslint-disable no-unused-expressions */
/* global sinon */

import { expect, testUtils, describe, it } from './assets/init-test';

import off from '../off';



// TODO: add test for events on window



describe('"off"', () => {
  it('Should fallback to document, if the element is not a DOM Node', () => {
    const cb = sinon.spy();

    testUtils.on(document, 'test-undefined', cb);
    testUtils.on(document, 'test-null', cb);
    testUtils.on(document, 'test-object', cb);
    testUtils.on(document, 'test-number', cb);

    testUtils.trigger('test-undefined', document);
    testUtils.trigger('test-null', document);
    testUtils.trigger('test-object', document);
    testUtils.trigger('test-number', document);

    expect(cb).to.have.callCount(4);

    cb.resetHistory();

    expect(off('test-undefined', cb)).to.be.equal(document);
    expect(off(null, 'test-null', cb)).to.be.equal(document);
    expect(off({}, 'test-object', cb)).to.be.equal(document);
    expect(off(123, 'test-number', cb)).to.be.equal(document);

    testUtils.trigger('test-undefined', document);
    testUtils.trigger('test-null', document);
    testUtils.trigger('test-object', document);
    testUtils.trigger('test-number', document);

    expect(cb).to.not.have.called;
  });

  it('Should not remove event if handler is not defined', () => {
    const cb = sinon.spy();
    const b = document.body;

    testUtils.on(b, 'test', cb);
    testUtils.trigger('test', b);

    expect(cb).to.have.been.calledOnce;

    cb.resetHistory();

    off(b, 'test');

    testUtils.trigger('test', b);
    testUtils.off(document, 'test', cb);

    expect(cb).to.have.been.calledOnce;
  });

  it('Should remove an given event handler from an object', () => {
    const cb = sinon.spy();
    const d = document;
    const b = d.body;

    testUtils.on(d, 'test', cb);
    testUtils.on(b, 'test', cb);
    testUtils.trigger('test', b);

    expect(cb).to.have.been.calledTwice;
    cb.resetHistory();

    expect(off(d, 'test', cb)).to.equal(d);

    testUtils.trigger('test', b);
    expect(cb).to.have.been.calledOnce;
    cb.resetHistory();

    expect(off(b, 'test', cb)).to.equal(b);

    testUtils.trigger('test', b);
    expect(cb).to.not.have.been.called;
  });

  it('Should remove multiple event handlers from an object', () => {
    const cb = sinon.spy();
    const b = document.body;

    const addEvents = () => {
      testUtils.on(b, 'test', cb);
      testUtils.on(b, 'test2', cb);
      testUtils.on(b, 'test3', cb);
    };

    const triggerEvents = () => {
      testUtils.trigger('test', b);
      testUtils.trigger('test2', b);
      testUtils.trigger('test3', b);
    };

    addEvents();
    triggerEvents();
    expect(cb).to.have.been.callCount(3);

    cb.resetHistory();

    expect(off(b, 'test test2 test3', cb)).to.be.equal(b);

    triggerEvents();
    expect(cb).to.not.have.been.called;

    cb.resetHistory();

    addEvents();
    triggerEvents();
    expect(cb).to.have.been.callCount(3);

    cb.resetHistory();

    expect(off(b, 'test, test2, test3', cb)).to.be.equal(b);

    triggerEvents();
    expect(cb).to.not.have.been.called;

    cb.resetHistory();

    addEvents();
    triggerEvents();
    expect(cb).to.have.been.callCount(3);

    cb.resetHistory();

    expect(off(b, ['test', 'test2', 'test3'], cb)).to.be.equal(b);

    addEvents();
    triggerEvents();
    expect(cb).to.have.been.callCount(3);

    cb.resetHistory();

    expect(off(b, ['test test2', null, 'test3'], cb)).to.be.equal(b);

    triggerEvents();
    expect(cb).to.not.have.been.called;
  });
});
