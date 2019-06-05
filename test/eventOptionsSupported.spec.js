import { expect, describe, it, sinon } from './assets/init-test';

import eventOptionsSupported from '../eventOptionsSupported';



describe('"eventOptionsSupported" >', () => {
  it('Should memoize the result', () => {
    const spy = sinon.spy();
    const stub = sinon.stub(window, 'addEventListener').callsFake(spy);

    eventOptionsSupported();
    eventOptionsSupported();

    expect(spy).to.have.callCount(1);

    stub.restore();
  });

  it('Calling with recheck = true, should bypass the memoization', () => {
    const spy = sinon.spy();
    const stub = sinon.stub(window, 'addEventListener').callsFake(spy);

    eventOptionsSupported(true);
    eventOptionsSupported(true);

    expect(spy).to.have.callCount(2);

    stub.restore();
  });

  it('Should return false when options are ignored when calling `addEventListener`', () => {
    const stub = sinon.stub(window, 'addEventListener').callsFake(() => {});

    expect(eventOptionsSupported(true)).to.equal(false);

    stub.restore();
  });

  it('Should return false when calling `addEventListener` with options, throws an error', () => {
    const stub = sinon.stub(window, 'addEventListener').throws();

    expect(eventOptionsSupported(true)).to.equal(false);

    stub.restore();
  });

  it('Should return true if options are supported', () => {
    const cb = (evt, handler, { passive }) => passive;
    const stub = sinon.stub(window, 'addEventListener').callsFake(cb);

    expect(eventOptionsSupported(true)).to.equal(true);

    stub.restore();
  });
});
