/* eslint-env node, mocha, browser */
/* global expect, $, sinon */

import off from '../off';

// TODO: add test for events on window

describe('"off"', () => {
  it('Should fallback to document, if the element is not a DOM Node', () => {
    const cb = sinon.spy();

    $.on(document, 'test-undefined', cb);
    $.on(document, 'test-null', cb);
    $.on(document, 'test-object', cb);
    $.on(document, 'test-number', cb);

    $.trigger('test-undefined', document);
    $.trigger('test-null', document);
    $.trigger('test-object', document);
    $.trigger('test-number', document);

    expect(cb).to.have.callCount(4);

    cb.reset();

    expect(off('test-undefined', cb)).to.be.equal(document);
    expect(off(null, 'test-null', cb)).to.be.equal(document);
    expect(off({}, 'test-object', cb)).to.be.equal(document);
    expect(off(123, 'test-number', cb)).to.be.equal(document);

    $.trigger('test-undefined', document);
    $.trigger('test-null', document);
    $.trigger('test-object', document);
    $.trigger('test-number', document);

    expect(cb).to.not.have.called;
  });

  it('Should not remove event if handler is not defined', () => {
    const cb = sinon.spy();
    const b = document.body;

    $.on(b, 'test', cb);
    $.trigger('test', b);

    expect(cb).to.have.been.calledOnce;

    cb.reset();

    off(b, 'test');

    $.trigger('test', b);
    $.off(document, 'test', cb);

    expect(cb).to.have.been.calledOnce;
  });

  it('Should remove an given event handler from an object', () => {
    const cb = sinon.spy();
    const d = document;
    const b = d.body;

    $.on(d, 'test', cb);
    $.on(b, 'test', cb);
    $.trigger('test', b);

    expect(cb).to.have.been.calledTwice;
    cb.reset();

    expect(off(d, 'test', cb)).to.equal(d);

    $.trigger('test', b);
    expect(cb).to.have.been.calledOnce;
    cb.reset();

    expect(off(b, 'test', cb)).to.equal(b);

    $.trigger('test', b);
    expect(cb).to.not.have.been.called;
  });

  it('Should remove multiple event handlers from an object', () => {
    const cb = sinon.spy();
    const b = document.body;

    const addEvents = () => {
      $.on(b, 'test', cb);
      $.on(b, 'test2', cb);
      $.on(b, 'test3', cb);
    };

    const triggerEvents = () => {
      $.trigger('test', b);
      $.trigger('test2', b);
      $.trigger('test3', b);
    };

    addEvents();
    triggerEvents();
    expect(cb).to.have.been.calledTrice;

    cb.reset();

    expect(off(b, 'test test2 test3', cb)).to.be.equal(b);

    triggerEvents();
    expect(cb).to.not.have.been.called;

    cb.reset();

    addEvents();
    triggerEvents();
    expect(cb).to.have.been.calledTrice;

    cb.reset();

    expect(off(b, 'test, test2, test3', cb)).to.be.equal(b);

    triggerEvents();
    expect(cb).to.not.have.been.called;

    cb.reset();

    addEvents();
    triggerEvents();
    expect(cb).to.have.been.calledTrice;

    cb.reset();

    expect(off(b, ['test', 'test2', 'test3'], cb)).to.be.equal(b);

    addEvents();
    triggerEvents();
    expect(cb).to.have.been.calledTrice;

    cb.reset();

    expect(off(b, ['test test2', null, 'test3'], cb)).to.be.equal(b);

    triggerEvents();
    expect(cb).to.not.have.been.called;
  });
});
