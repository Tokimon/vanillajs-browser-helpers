import { expect, helpers, describe, it, sinon, beforeEach, afterEach, before, after } from './assets/init-test';

import { rewire as rewireEvtOpts, restore as restoreEvtOpts } from '../eventOptionsSupported';
import on from '../on';



// TODO: add test for when event options are not supported



describe('"on" >', () => {
  const d = document;

  describe('Default behaviour >', () => {
    beforeEach(() => sinon.spy(d, 'addEventListener'));
    afterEach(() => d.addEventListener.restore());

    it('Should fallback to document, if the element is not a valid EventTarget', () => {
      const cb = () => {};

      expect(on('undefined', cb)).to.be.equal(d);
      expect(on(null, 'null', cb)).to.be.equal(d);
      expect(on({}, 'object', cb)).to.be.equal(d);
      expect(on(123, 'number', cb)).to.be.equal(d);

      expect(d.addEventListener).to.have.callCount(4);

      helpers.off(d, 'undefined', cb);
      helpers.off(d, 'null', cb);
      helpers.off(d, 'object', cb);
      helpers.off(d, 'number', cb);
    });

    it('Should not add event when eventNames is not defined', () => {
      on(d);
      on(d, null, () => {});

      expect(d.addEventListener).to.have.callCount(0);
    });

    it('Should not add event when handler is not defined', () => {
      on(d);
      on(d, null, () => {});

      expect(d.addEventListener).to.have.callCount(0);
    });

    it('Should add event with elaborate name', () => {
      const cb = () => {};

      on(d, 'test', cb);
      on(d, 'test_underscore', cb);
      on(d, 'test-dash', cb);
      on(d, 'test.dot', cb);
      on(d, 'test:colon', cb);

      expect(d.addEventListener).to.have.callCount(5);

      helpers.off(d, 'test', cb);
      helpers.off(d, 'test_underscore', cb);
      helpers.off(d, 'test-dash', cb);
      helpers.off(d, 'test.dot', cb);
      helpers.off(d, 'test:colon', cb);
    });

    describe('When event options are not supported >', () => {
      before(() => rewireEvtOpts(() => false));
      after(() => restoreEvtOpts());

      const testIt = (bool, options) => {
        const cb = () => {};

        on(d, 'test', cb, options);

        expect(d.addEventListener).to.have.callCount(1);
        expect(d.addEventListener).to.have.calledWith('test', cb, bool);

        helpers.off(d, 'test', cb);
      };

      it.each(
        [undefined, null, false, {}, { capture: false }],
        'Should call `addEventListener` with `false` when `options` is %s',
        ['element'],
        (options) => testIt(false, options)
      );

      it.each(
        [true, { capture: true }],
        'Should call `addEventListener` with `true` when `options` is %s',
        ['element'],
        (options) => testIt(false, options)
      );
    });

    describe('Multiple event handlers >', () => {
      it('Should call addEventListener for each event name', () => {
        const cb = () => {};

        on(d, ['test', 'test2', 'test3'], cb);

        expect(d.addEventListener).to.have.callCount(3);

        helpers.off(d, 'test', cb);
        helpers.off(d, 'test2', cb);
        helpers.off(d, 'test3', cb);
      });

      it('Should filter out non string event names', () => {
        const cb = () => {};

        on(d, ['test', 123, null, undefined], cb);

        expect(d.addEventListener).to.have.callCount(1);

        helpers.off(d, 'test', cb);
      });
    });
  });

  it('Should add a given event handler to an element', () => {
    const b = d.body;
    sinon.spy(b, 'addEventListener');

    const cb = () => {};

    expect(on(b, 'test', cb)).to.be.equal(b);
    expect(b.addEventListener).to.have.callCount(1);

    helpers.off(b, 'test', cb);

    b.addEventListener.restore();
  });

  it('Should add a given event handler to window', () => {
    const w = window;

    sinon.spy(w, 'addEventListener');

    const cb = () => {};

    expect(on(w, 'test', cb)).to.be.equal(w);
    expect(w.addEventListener).to.have.callCount(1);

    helpers.off(w, 'test', cb);

    w.addEventListener.restore();
  });
});
