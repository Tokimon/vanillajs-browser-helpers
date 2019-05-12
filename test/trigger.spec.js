import { expect, helpers, describe, it, sinon } from './assets/init-test';

import trigger from '../trigger';



describe('"Trigger" >', () => {
  it('Should fallback to document, if the element is not an event target', () => {
    const cb = sinon.spy();
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

  it('Should not trigger handler if event name is not a string or an array', () => {
    const cb = sinon.spy();

    helpers.on(document, 'test', cb);

    trigger();
    trigger(document);
    trigger(document, 123);
    trigger(document, null);
    trigger(document, {});

    trigger(document, ['test']);
    trigger('test');

    expect(cb).to.have.callCount(2);

    helpers.off(document, 'test', cb);
  });

  it('Should trigger given event', () => {
    const cb = sinon.spy();
    const b = document.body;

    ['test', 'test_underscore', 'test-dash', 'test-dash', 'test.dot', 'test:colon']
      .forEach((evt) => {
        helpers.on(b, evt, cb);
        trigger(b, evt);
        helpers.off(b, evt, cb);
      });

    expect(cb).to.have.callCount(6);
  });

  it('Should trigger given event attached to window', () => {
    const cb = sinon.spy();

    ['test', 'test_underscore', 'test-dash', 'test-dash', 'test.dot', 'test:colon']
      .forEach((evt) => {
        helpers.on(window, evt, cb);
        trigger(window, evt);
        helpers.off(window, evt, cb);
      });

    expect(cb).to.have.callCount(6);
  });

  it('Should trigger multiple events', () => {
    const cb = sinon.spy();
    const b = document.body;

    helpers.on(b, 'test', cb);
    helpers.on(b, 'test2', cb);
    helpers.on(b, 'test3', cb);

    trigger(b, ['test', 'test2', 'test3']);

    expect(cb).to.have.callCount(3);

    helpers.off(b, 'test', cb);
    helpers.off(b, 'test2', cb);
    helpers.off(b, 'test3', cb);
  });

  it('Should trigger given event with extra data', () => {
    const cb = sinon.spy();
    const b = document.body;
    const fn = () => {};

    helpers.on(b, 'test', cb);

    trigger(b, 'test', { extra: 'test' });
    trigger(b, 'test', 'test');
    trigger(b, 'test', fn);
    trigger(b, 'test');

    expect(cb.getCall(0)).to.have.been.calledWith(sinon.match.has('detail', { extra: 'test' }));
    expect(cb.getCall(1)).to.have.been.calledWith(sinon.match.has('detail', 'test'));
    expect(cb.getCall(2)).to.have.been.calledWith(sinon.match.has('detail', fn));
    expect(cb.getCall(3)).to.have.been.calledWith(sinon.match.has('detail'));

    helpers.off(b, 'test', cb);
  });
});
