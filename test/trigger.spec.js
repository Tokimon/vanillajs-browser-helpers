import { expect, helpers, describe, it, spy, sinonMatch } from './assets/init-test';

import trigger from '../trigger';



// TODO: add test for events on window



describe('"Trigger"', () => {
  it('Should fallback to document, if the element is not a DOM Node', () => {
    const cb = spy();
    helpers.on(document, 'test', cb);

    expect(trigger(null, 'test')).to.be.equal(document);
    expect(trigger(undefined, 'test')).to.be.equal(document);
    expect(trigger({}, 'test')).to.be.equal(document);
    expect(trigger(123, 'test')).to.be.equal(document);
    expect(trigger('test')).to.be.equal(document);

    expect(trigger(document.body, 'test')).to.be.equal(document.body);

    expect(cb).to.have.callCount(6);

    helpers.off(document, 'test', cb);
  });

  it('Should not trigger handler if event name is not a string or an array given', () => {
    const cb = spy();

    helpers.on(document, 'test', cb);

    trigger(document);
    trigger();
    trigger(document, 123);
    trigger(document, null);
    trigger(document, {});

    trigger(document, ['test']);
    trigger('test');

    expect(cb).to.have.callCount(2);

    helpers.off(document, 'test', cb);
  });

  it('Should trigger given event', () => {
    const cb = spy();
    const b = document.body;

    helpers.on(b, 'test', cb);
    helpers.on(b, 'test_underscore', cb);
    helpers.on(b, 'test-dash', cb);
    helpers.on(b, 'test.dot', cb);
    helpers.on(b, 'test:colon', cb);

    trigger(b, 'test');
    trigger(b, 'test_underscore');
    trigger(b, 'test-dash');
    trigger(b, 'test.dot');
    trigger(b, 'test:colon');

    expect(cb).to.have.callCount(5);

    helpers.off(b, 'test', cb);
    helpers.off(b, 'test_underscore', cb);
    helpers.off(b, 'test-dash', cb);
    helpers.off(b, 'test.dot', cb);
    helpers.off(b, 'test:colon', cb);
  });

  it('Should trigger multiple event', () => {
    const cb = spy();
    const b = document.body;

    helpers.on(b, 'test', cb);
    helpers.on(b, 'test2', cb);
    helpers.on(b, 'test3', cb);

    trigger(b, 'test test2 test3');
    trigger(b, 'test, test2, test3');
    trigger(b, ['test', 'test2', 'test3']);
    trigger(b, ['test test2', 'test3']);

    expect(cb).to.have.callCount(3);

    helpers.off(b, 'test', cb);
    helpers.off(b, 'test2', cb);
    helpers.off(b, 'test3', cb);
  });

  it('Should trigger given event with extra data', () => {
    const cb = spy();
    const b = document.body;
    const fn = () => {};

    helpers.on(b, 'test', cb);

    trigger(b, 'test', { extra: 'test' });
    trigger(b, 'test', 'test');
    trigger(b, 'test', fn);
    trigger(b, 'test');

    expect(cb.getCall(0)).to.have.been.calledWith(sinonMatch.has('detail', { extra: 'test' }));
    expect(cb.getCall(1)).to.have.been.calledWith(sinonMatch.has('detail', 'test'));
    expect(cb.getCall(2)).to.have.been.calledWith(sinonMatch.has('detail', fn));
    expect(cb.getCall(3)).to.have.been.calledWith(sinonMatch.has('detail'));

    helpers.off(b, 'test', cb);
  });
});
