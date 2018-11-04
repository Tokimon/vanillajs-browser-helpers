import { expect, helpers, describe, it, spy } from './assets/init-test';

import on from '../on';



// TODO: add test for events on window



describe('"on"', () => {
  it('Should fallback to document, if the element is not a DOM Node', () => {
    const cb = spy();

    expect(on('test-undefined', cb)).to.be.equal(document);
    expect(on(null, 'test-null', cb)).to.be.equal(document);
    expect(on({}, 'test-object', cb)).to.be.equal(document);
    expect(on(123, 'test-number', cb)).to.be.equal(document);

    helpers.trigger('test-undefined', document);
    helpers.trigger('test-null', document);
    helpers.trigger('test-object', document);
    helpers.trigger('test-number', document);

    expect(cb).to.have.callCount(4);

    helpers.off(document, 'test-undefined', cb);
    helpers.off(document, 'test-null', cb);
    helpers.off(document, 'test-object', cb);
    helpers.off(document, 'test-number', cb);
  });

  it('Should not add event neither handler nor eventNames are not defined', () => {
    const cb = spy();

    helpers.on(document, 'test', cb);

    expect(on(document, undefined, cb)).to.be.equal(document);
    expect(on(undefined, cb)).to.be.equal(document);
    expect(on(document, null, cb)).to.be.equal(document);

    helpers.trigger('123', document);
    helpers.trigger('null', document);

    expect(cb).to.have.callCount(0);
  });

  it.skip('Should add an given event handler to an object', () => {
    const cb = spy();
    const b = document.body;

    expect(on(b, 'test', cb)).to.be.equal(b);
    expect(on(b, 'test_underscore', cb)).to.be.equal(b);
    expect(on(b, 'test-dash', cb)).to.be.equal(b);
    expect(on(b, 'test.dot', cb)).to.be.equal(b);
    expect(on(b, 'test:colon', cb)).to.be.equal(b);

    helpers.trigger('test', b);
    helpers.trigger('test_underscore', b);
    helpers.trigger('test-dash', b);
    helpers.trigger('test.dot', b);
    helpers.trigger('test:colon', b);

    expect(cb).to.have.callCount(5);

    helpers.off(b, 'test', cb);
    helpers.off(b, 'test_underscore', cb);
    helpers.off(b, 'test-dash', cb);
    helpers.off(b, 'test.dot', cb);
    helpers.off(b, 'test:colon', cb);
  });

  it.skip('Should add multiple event handlers to an object', () => {
    const cb = spy();
    const b = document.body;

    const test = () => {
      helpers.trigger('test', b);
      helpers.trigger('test2', b);
      helpers.trigger('test3', b);

      helpers.off(b, 'test', cb);
      helpers.off(b, 'test2', cb);
      helpers.off(b, 'test3', cb);

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
