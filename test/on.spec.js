/* eslint-env node, mocha, browser */
/* global expect, $, sinon */

import on from '../on';

// TODO: add test for events on window

describe('"on"', () => {
  it('Should fallback to document, if the element is not a DOM Node', () => {
    const cb = sinon.spy();

    expect(on('test-undefined', cb)).to.be.equal(document);
    expect(on(null, 'test-null', cb)).to.be.equal(document);
    expect(on({}, 'test-object', cb)).to.be.equal(document);
    expect(on(123, 'test-number', cb)).to.be.equal(document);

    $.trigger('test-undefined', document);
    $.trigger('test-null', document);
    $.trigger('test-object', document);
    $.trigger('test-number', document);

    expect(cb).to.have.callCount(4);

    $.off(document, 'test-undefined', cb);
    $.off(document, 'test-null', cb);
    $.off(document, 'test-object', cb);
    $.off(document, 'test-number', cb);
  });

  it('Should not add event if handler is not defined', () => {
    const cb = sinon.spy();

    $.on(document, 'test', cb);

    expect(on(document, undefined, cb)).to.be.equal(document);
    expect(on(undefined, cb)).to.be.equal(document);
    expect(on(document, 123, cb)).to.be.equal(document);
    expect(on(document, null, cb)).to.be.equal(document);
    expect(on(document, {}, cb)).to.be.equal(document);

    $.trigger('123', document);
    $.trigger('null', document);
    $.trigger('undefined', document);
    $.trigger('[object Object]', document);

    expect(cb).to.not.have.been.called;
  });

  it('Should add an given event handler to an object', () => {
    const cb = sinon.spy();
    const b = document.body;

    expect(on(b, 'test', cb)).to.be.equal(b);
    expect(on(b, 'test_underscore', cb)).to.be.equal(b);
    expect(on(b, 'test-dash', cb)).to.be.equal(b);
    expect(on(b, 'test.dot', cb)).to.be.equal(b);
    expect(on(b, 'test:colon', cb)).to.be.equal(b);

    $.trigger('test', b);
    $.trigger('test_underscore', b);
    $.trigger('test-dash', b);
    $.trigger('test.dot', b);
    $.trigger('test:colon', b);

    expect(cb).to.have.callCount(5);

    $.off(b, 'test', cb);
    $.off(b, 'test_underscore', cb);
    $.off(b, 'test-dash', cb);
    $.off(b, 'test.dot', cb);
    $.off(b, 'test:colon', cb);
  });

  it('Should add multiple event handlers to an object', () => {
    const cb = sinon.spy();
    const b = document.body;

    const test = () => {
      $.trigger('test', b);
      $.trigger('test2', b);
      $.trigger('test3', b);

      $.off(b, 'test', cb);
      $.off(b, 'test2', cb);
      $.off(b, 'test3', cb);

      expect(cb).to.have.been.calledTrice;

      cb.reset();
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
