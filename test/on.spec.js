/* eslint-env node, browser */
/* eslint-disable no-unused-expressions */
/* global sinon */

import { expect, testUtils, describe, it } from './assets/init-test';

import on from '../on';



// TODO: add test for events on window



describe('"on"', () => {
  it('Should fallback to document, if the element is not a DOM Node', () => {
    const cb = sinon.spy();

    expect(on('test-undefined', cb)).to.be.equal(document);
    expect(on(null, 'test-null', cb)).to.be.equal(document);
    expect(on({}, 'test-object', cb)).to.be.equal(document);
    expect(on(123, 'test-number', cb)).to.be.equal(document);

    testUtils.trigger('test-undefined', document);
    testUtils.trigger('test-null', document);
    testUtils.trigger('test-object', document);
    testUtils.trigger('test-number', document);

    expect(cb).to.have.callCount(4);

    testUtils.off(document, 'test-undefined', cb);
    testUtils.off(document, 'test-null', cb);
    testUtils.off(document, 'test-object', cb);
    testUtils.off(document, 'test-number', cb);
  });

  it('Should not add event neither handler nor eventNames are not defined', () => {
    const cb = sinon.spy();

    testUtils.on(document, 'test', cb);

    expect(on(document, undefined, cb)).to.be.equal(document);
    expect(on(undefined, cb)).to.be.equal(document);
    expect(on(document, null, cb)).to.be.equal(document);

    testUtils.trigger('123', document);
    testUtils.trigger('null', document);

    expect(cb).to.not.have.been.called;
  });

  it.skip('Should add an given event handler to an object', () => {
    const cb = sinon.spy();
    const b = document.body;

    expect(on(b, 'test', cb)).to.be.equal(b);
    expect(on(b, 'test_underscore', cb)).to.be.equal(b);
    expect(on(b, 'test-dash', cb)).to.be.equal(b);
    expect(on(b, 'test.dot', cb)).to.be.equal(b);
    expect(on(b, 'test:colon', cb)).to.be.equal(b);

    testUtils.trigger('test', b);
    testUtils.trigger('test_underscore', b);
    testUtils.trigger('test-dash', b);
    testUtils.trigger('test.dot', b);
    testUtils.trigger('test:colon', b);

    expect(cb).to.have.callCount(5);

    testUtils.off(b, 'test', cb);
    testUtils.off(b, 'test_underscore', cb);
    testUtils.off(b, 'test-dash', cb);
    testUtils.off(b, 'test.dot', cb);
    testUtils.off(b, 'test:colon', cb);
  });

  it.skip('Should add multiple event handlers to an object', () => {
    const cb = sinon.spy();
    const b = document.body;

    const test = () => {
      testUtils.trigger('test', b);
      testUtils.trigger('test2', b);
      testUtils.trigger('test3', b);

      testUtils.off(b, 'test', cb);
      testUtils.off(b, 'test2', cb);
      testUtils.off(b, 'test3', cb);

      expect(cb).to.have.callCount(3);

      cb.resetHistory();
    };

    expect(on(b, 'test test2 test3', cb)).to.be.equal(b);
    test();

    expect(on(b, 'test, test2, test3', cb)).to.be.equal(b);
    test();

    expect(on(b, ['test', 'test2', 'test3'], cb)).to.be.equal(b);
    test();

    expect(on(b, ['test test2', null, 'test3'], cb)).to.be.equal(b);
    test();
  });
});
