import { expect, helpers, describe, it, spy, beforeEach, afterEach } from './assets/init-test';

import on from '../on';



// TODO: add test for when event options are not supported



describe('"on" >', () => {
  describe('Default behaviour >', () => {
    beforeEach(() => spy(document, 'addEventListener'));
    afterEach(() => document.addEventListener.restore());

    it('Should fallback to document, if the element is not a valid EventTarget', () => {
      const cb = () => {};

      expect(on('undefined', cb)).to.be.equal(document);
      expect(on(null, 'null', cb)).to.be.equal(document);
      expect(on({}, 'object', cb)).to.be.equal(document);
      expect(on(123, 'number', cb)).to.be.equal(document);

      expect(document.addEventListener).to.have.callCount(4);

      helpers.off(document, 'undefined', cb);
      helpers.off(document, 'null', cb);
      helpers.off(document, 'object', cb);
      helpers.off(document, 'number', cb);
    });

    it('Should not add event when eventNames is not defined', () => {
      on(document);
      on(document, null, () => {});

      expect(document.addEventListener).to.have.callCount(0);
    });

    it('Should not add event when handler is not defined', () => {
      on(document);
      on(document, null, () => {});

      expect(document.addEventListener).to.have.callCount(0);
    });

    it('Should add event with elaborate name', () => {
      const cb = () => {};

      on(document, 'test', cb);
      on(document, 'test_underscore', cb);
      on(document, 'test-dash', cb);
      on(document, 'test.dot', cb);
      on(document, 'test:colon', cb);

      expect(document.addEventListener).to.have.callCount(5);

      helpers.off(document, 'test', cb);
      helpers.off(document, 'test_underscore', cb);
      helpers.off(document, 'test-dash', cb);
      helpers.off(document, 'test.dot', cb);
      helpers.off(document, 'test:colon', cb);
    });

    describe('Multiple event handlers >', () => {
      it('Should call addEventListener for each event name', () => {
        const cb = () => {};

        on(document, ['test', 'test2', 'test3'], cb);

        expect(document.addEventListener).to.have.callCount(3);

        helpers.off(document, 'test', cb);
        helpers.off(document, 'test2', cb);
        helpers.off(document, 'test3', cb);
      });

      it('Should filter out non string event names', () => {
        const cb = () => {};

        on(document, ['test', 123, null, undefined], cb);

        expect(document.addEventListener).to.have.callCount(1);

        helpers.off(document, 'test', cb);
      });
    });
  });

  it('Should add a given event handler to an element', () => {
    const b = document.body;
    spy(b, 'addEventListener');

    const cb = () => {};

    expect(on(b, 'test', cb)).to.be.equal(b);
    expect(b.addEventListener).to.have.callCount(1);

    helpers.off(b, 'test', cb);

    b.addEventListener.restore();
  });

  it('Should add a given event handler to window', () => {
    const w = window;

    spy(w, 'addEventListener');

    const cb = () => {};

    expect(on(w, 'test', cb)).to.be.equal(w);
    expect(w.addEventListener).to.have.callCount(1);

    helpers.off(w, 'test', cb);

    w.addEventListener.restore();
  });
});
