/* eslint-env node, mocha, browser */
/* global expect, $ */

import trigger from '../trigger';

describe('"Trigger"', () => {
  it('Should return null if the element is empty or not defined', () => {
    expect(trigger(null, 'evt')).to.be.null;
    expect(trigger(undefined, 'evt')).to.be.null;
    expect(trigger('', 'evt')).to.be.null;
  });

  it('Should always return the element if it is defined', () => {
    expect(trigger({}, 'evt')).to.be.an('object');
    expect(trigger(document.body, 'evt')).to.be.equal(document.body);
    expect(trigger(123, 'evt')).to.be.a('number');
  });

  it('Should not trigger event if neither element nor event is given', () => {
    const cb = sinon.spy();
    const b = document.body;

    b.addEventListener('test', cb, false);

    trigger(b);
    trigger(null, 'test');

    expect(cb).to.not.have.been.called;

    b.removeEventListener('test', cb, false);
  });

  it('Should trigger given event', () => {
    const cb = sinon.spy();
    const b = document.body;

    b.addEventListener('test', cb, false);

    trigger(b, 'test');
    expect(cb).to.have.been.called;

    b.removeEventListener('test', cb, false);
  });

  it('Should trigger given event with extra data', () => {
    const cb = sinon.spy();
    const b = document.body;

    b.addEventListener('test', cb, false);

    trigger(b, 'test', { extra: 'test' });
    expect(cb).to.have.been.calledWith(sinon.match.has('detail', { extra: 'test' }));

    b.removeEventListener('test', cb, false);
  });
});
