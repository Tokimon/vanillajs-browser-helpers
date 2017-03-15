/* eslint-env node, mocha, browser */
/* eslint-disable no-unused-expressions */
/* global expect, sinon, $ */

import trigger from '../trigger';

// TODO: add test for events on window

describe('"Trigger"', () => {
  it('Should fallback to document, if the element is not a DOM Node', () => {
    const cb = sinon.spy();
    $.on(document, 'test', cb);

    expect(trigger(null, 'test')).to.be.equal(document);
    expect(trigger(undefined, 'test')).to.be.equal(document);
    expect(trigger({}, 'test')).to.be.equal(document);
    expect(trigger(123, 'test')).to.be.equal(document);
    expect(trigger('test')).to.be.equal(document);

    expect(trigger(document.body, 'test')).to.be.equal(document.body);

    expect(cb).to.have.callCount(6);

    $.off(document, 'test', cb);
  });

  it('Should not trigger handler if event name is not a string or an array given', () => {
    const cb = sinon.spy();

    $.on(document, 'test', cb);

    trigger(document);
    trigger();
    trigger(document, 123);
    trigger(document, null);
    trigger(document, {});

    trigger(document, ['test']);
    trigger('test');

    expect(cb).to.have.been.calledTwice;

    $.off(document, 'test', cb);
  });

  it('Should trigger given event', () => {
    const cb = sinon.spy();
    const b = document.body;

    $.on(b, 'test', cb);
    $.on(b, 'test_underscore', cb);
    $.on(b, 'test-dash', cb);
    $.on(b, 'test.dot', cb);
    $.on(b, 'test:colon', cb);

    trigger(b, 'test');
    trigger(b, 'test_underscore');
    trigger(b, 'test-dash');
    trigger(b, 'test.dot');
    trigger(b, 'test:colon');

    expect(cb).to.have.callCount(5);

    $.off(b, 'test', cb);
    $.off(b, 'test_underscore', cb);
    $.off(b, 'test-dash', cb);
    $.off(b, 'test.dot', cb);
    $.off(b, 'test:colon', cb);
  });

  it('Should trigger multiple event', () => {
    const cb = sinon.spy();
    const b = document.body;

    $.on(b, 'test', cb);
    $.on(b, 'test2', cb);
    $.on(b, 'test3', cb);

    trigger(b, 'test test2 test3');
    trigger(b, 'test, test2, test3');
    trigger(b, ['test', 'test2', 'test3']);
    trigger(b, ['test test2', 'test3']);

    expect(cb).to.have.been.calledTrice;

    $.off(b, 'test', cb);
    $.off(b, 'test2', cb);
    $.off(b, 'test3', cb);
  });

  it('Should trigger given event with extra data', () => {
    const cb = sinon.spy();
    const b = document.body;
    const fn = () => {};

    $.on(b, 'test', cb);

    trigger(b, 'test', { extra: 'test' });
    trigger(b, 'test', 'test');
    trigger(b, 'test', fn);
    trigger(b, 'test');

    expect(cb.getCall(0)).to.have.been.calledWith(sinon.match.has('detail', { extra: 'test' }));
    expect(cb.getCall(1)).to.have.been.calledWith(sinon.match.has('detail', 'test'));
    expect(cb.getCall(2)).to.have.been.calledWith(sinon.match.has('detail', fn));
    expect(cb.getCall(3)).to.have.been.calledWith(sinon.match.has('detail'));

    $.off(b, 'test', cb);
  });
});
