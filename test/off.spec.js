import { expect, helpers, describe, it, spy } from './assets/init-test';

import off from '../off';



describe('"off"', () => {
  describe('Default behaviour >', () => {
    beforeEach(() => spy(document, 'removeEventListener'));
    afterEach(() => document.removeEventListener.restore());

    it('Should fallback to document, if the element is not a valid EventTarget', () => {
      const cb = () => {};

      expect(off('undefined', cb)).to.be.equal(document);
      expect(off(null, 'null', cb)).to.be.equal(document);
      expect(off({}, 'object', cb)).to.be.equal(document);
      expect(off(123, 'number', cb)).to.be.equal(document);

      expect(document.removeEventListener).to.have.callCount(4);
    });

    it('Should not remove event when eventNames is not defined', () => {
      off(document);
      off(document, null, () => {});

      expect(document.removeEventListener).to.have.callCount(0);
    });

    it('Should not add event when handler is not defined', () => {
      off(document);
      off(document, null, () => {});

      expect(document.removeEventListener).to.have.callCount(0);
    });

    it('Should remove event with elaborate name', () => {
      const cb = () => {};

      off(document, 'test', cb);
      off(document, 'test_underscore', cb);
      off(document, 'test-dash', cb);
      off(document, 'test.dot', cb);
      off(document, 'test:colon', cb);

      expect(document.removeEventListener).to.have.callCount(5);
    });

    describe('Multiple event handlers >', () => {
      it('Should call removeEventListener for each event name', () => {
        const cb = () => {};

        off(document, ['test', 'test2', 'test3'], cb);

        expect(document.removeEventListener).to.have.callCount(3);
      });

      it('Should filter out non string event names', () => {
        const cb = () => {};

        off(document, ['test', 123, null, undefined], cb);

        expect(document.removeEventListener).to.have.callCount(1);

        helpers.off(document, 'test', cb);
      });
    });
  });

  it('Should remove a given event handler from an element', () => {
    const b = document.body;
    spy(b, 'removeEventListener');

    const cb = () => {};

    expect(off(b, 'test', cb)).to.be.equal(b);
    expect(b.removeEventListener).to.have.callCount(1);

    helpers.off(b, 'test', cb);

    b.removeEventListener.restore();
  });

  it('Should remove a given event handler from window', () => {
    const w = window;

    spy(w, 'removeEventListener');

    const cb = () => {};

    expect(off(w, 'test', cb)).to.be.equal(w);
    expect(w.removeEventListener).to.have.callCount(1);

    helpers.off(w, 'test', cb);

    w.removeEventListener.restore();
  });
});
