import { expect, helpers, describe, it, spy } from './assets/init-test';

import off from '../off';



// TODO: add test for events on window



describe('"off"', () => {
  it('Should fallback to document, if the element is not a DOM Node', () => {
    const cb = spy();

    helpers.on(document, 'test-undefined', cb);
    helpers.on(document, 'test-null', cb);
    helpers.on(document, 'test-object', cb);
    helpers.on(document, 'test-number', cb);

    helpers.trigger('test-undefined', document);
    helpers.trigger('test-null', document);
    helpers.trigger('test-object', document);
    helpers.trigger('test-number', document);

    expect(cb).to.have.callCount(4);

    cb.resetHistory();

    expect(off('test-undefined', cb)).to.be.equal(document);
    expect(off(null, 'test-null', cb)).to.be.equal(document);
    expect(off({}, 'test-object', cb)).to.be.equal(document);
    expect(off(123, 'test-number', cb)).to.be.equal(document);

    helpers.trigger('test-undefined', document);
    helpers.trigger('test-null', document);
    helpers.trigger('test-object', document);
    helpers.trigger('test-number', document);

    expect(cb).to.have.callCount(0);
  });

  it('Should not remove event if handler is not defined', () => {
    const cb = spy();
    const b = document.body;

    helpers.on(b, 'test', cb);
    helpers.trigger('test', b);

    expect(cb).to.have.callCount(1);

    cb.resetHistory();

    off(b, 'test');

    helpers.trigger('test', b);
    helpers.off(document, 'test', cb);

    expect(cb).to.have.callCount(1);
  });

  it('Should remove an given event handler from an object', () => {
    const cb = spy();
    const d = document;
    const b = d.body;

    helpers.on(d, 'test', cb);
    helpers.on(b, 'test', cb);
    helpers.trigger('test', b);

    expect(cb).to.have.callCount(2);
    cb.resetHistory();

    expect(off(d, 'test', cb)).to.equal(d);

    helpers.trigger('test', b);
    expect(cb).to.have.callCount(1);
    cb.resetHistory();

    expect(off(b, 'test', cb)).to.equal(b);

    helpers.trigger('test', b);
    expect(cb).to.have.callCount(0);
  });

  it('Should remove multiple event handlers from an object', () => {
    const cb = spy();
    const b = document.body;

    const addEvents = () => {
      helpers.on(b, 'test', cb);
      helpers.on(b, 'test2', cb);
      helpers.on(b, 'test3', cb);
    };

    const triggerEvents = () => {
      helpers.trigger('test', b);
      helpers.trigger('test2', b);
      helpers.trigger('test3', b);
    };

    addEvents();
    triggerEvents();
    expect(cb).to.have.been.callCount(3);

    cb.resetHistory();

    expect(off(b, 'test test2 test3', cb)).to.be.equal(b);

    triggerEvents();
    expect(cb).to.have.callCount(0);

    cb.resetHistory();

    addEvents();
    triggerEvents();
    expect(cb).to.have.been.callCount(3);

    cb.resetHistory();

    expect(off(b, 'test, test2, test3', cb)).to.be.equal(b);

    triggerEvents();
    expect(cb).to.have.callCount(0);

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
    expect(cb).to.have.callCount(0);
  });
});
