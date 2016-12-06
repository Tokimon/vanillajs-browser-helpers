var _inView = require('../inView');

var _inView2 = _interopRequireDefault(_inView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const testID = 'TestNode'; /* eslint-env node, mocha, browser */
/* global expect, $ */

function scroll(x, y) {
  window.scroll(x, y);
}

function scrollX(x) {
  const y = typeof window.scrollY !== 'undefined' ? window.scrollY : document.documentElement.scrollLeft;
  scroll(x, y);
}

function scrollY(y) {
  const x = typeof window.scrollX !== 'undefined' ? window.scrollX : document.documentElement.scrollLeft;
  scroll(x, y);
}

describe('"inView"', () => {
  let node;
  const viewW = window.innerWidth;
  const viewH = window.innerHeight;

  // Sizes
  const itemSize = 100;
  const itemHalfSize = itemSize / 2;
  const w = (viewW + itemSize) * 2;
  const h = (viewH + itemSize) * 2;

  // Positions
  const itemX = w / 2 - itemHalfSize;
  const itemY = h / 2 - itemHalfSize;
  const justAbove = itemY + itemSize;
  const justBelow = itemY - viewH;
  const justLeft = itemX + itemSize;
  const justRight = itemX - viewW;

  const threshold = 20;

  before(() => {
    $.html(`
      <div id="View">
        <div id="hidden"></div>
        <div id="${ testID }"></div>
        <style>
          body { margin: 0; width: 800px; height: 800px; overflow: hidden; }

          #View {
            width: ${ w }px;
            height: ${ h }px;
          }

          #${ testID } {
            width: ${ itemSize }px;
            height: ${ itemSize }px;
            margin: ${ viewH + itemHalfSize }px auto 0;
          }

          #hidden {
            display: none;
          }
        </style>
      </div>
    `);

    node = $.id(testID);
  });

  after(() => {
    $.remove('View');
  });

  it('Should return false if the given element is hidden or not an element in the DOM', () => {
    const div = $.create('div');
    div.innerHTML = '<p></p>';

    expect((0, _inView2.default)()).to.be.false;
    expect((0, _inView2.default)(null)).to.be.false;
    expect((0, _inView2.default)({})).to.be.false;
    expect((0, _inView2.default)(div)).to.be.false;
    expect((0, _inView2.default)(div.firstChild)).to.be.false;
    expect((0, _inView2.default)($.id('hidden'))).to.be.false;
    expect((0, _inView2.default)(node)).to.not.be.false;
  });

  it('Should return true if the element is inside the viewport area', () => {
    scroll(0, 0);
    expect((0, _inView2.default)(node)).to.be.an('object');

    scrollX(w / 4);
    expect((0, _inView2.default)(node)).to.be.an('object');

    scrollY(h / 4);
    expect((0, _inView2.default)(node)).to.be.true;
  });

  describe('- Off screen indications', () => {
    it('Should indicate that the element is off the viewport area to the left', () => {
      scroll(justLeft, 0);
      expect((0, _inView2.default)(node)).to.have.property('left', true);

      scroll(justLeft - 1, 0);
      expect((0, _inView2.default)(node)).to.have.property('left', false);
    });

    it('Should indicate that the element is off the viewport area to the right', () => {
      scroll(justRight, 0);
      expect((0, _inView2.default)(node)).to.have.property('right', true);

      scroll(justRight + 1, 0);
      expect((0, _inView2.default)(node)).to.have.property('right', false);
    });

    it('Should indicate that the element is above the viewport area', () => {
      scroll(0, justAbove);
      expect((0, _inView2.default)(node)).to.have.property('above', true);

      scroll(0, justAbove - 1);
      expect((0, _inView2.default)(node)).to.have.property('above', false);
    });

    it('Should indicate that the element is above the viewport area to the left', () => {
      scroll(justLeft, justAbove);
      expect((0, _inView2.default)(node)).to.have.property('above', true);
      expect((0, _inView2.default)(node)).to.have.property('left', true);

      scroll(justLeft - 1, justAbove - 1);
      expect((0, _inView2.default)(node)).to.be.true;
    });

    it('Should indicate that the element is above the viewport area to the right', () => {
      // Scroll out of view top/right
      scroll(justRight, justAbove);

      let shown = (0, _inView2.default)(node);
      expect(shown.above).to.be.true;
      expect(shown.right).to.be.true;

      // Scroll just into view
      scroll(justRight + 1, justAbove - 1);

      shown = (0, _inView2.default)(node);
      expect(shown).to.be.true;
    });

    it('Should indicate that the element is below the viewport area', () => {
      scroll(0, justBelow);
      expect((0, _inView2.default)(node)).to.have.property('below', true);

      scroll(0, justBelow + 1);
      expect((0, _inView2.default)(node)).to.have.property('below', false);
    });

    it('Should indicate that the element is below the viewport area to the left', () => {
      scroll(justLeft, justBelow);
      expect((0, _inView2.default)(node)).to.have.property('below', true);
      expect((0, _inView2.default)(node)).to.have.property('left', true);

      scroll(justLeft - 1, justBelow + 1);
      expect((0, _inView2.default)(node)).to.be.true;
    });

    it('Should indicate that the element is below the viewport area to the right', () => {
      scroll(justRight, justBelow);
      expect((0, _inView2.default)(node)).to.have.property('below', true);
      expect((0, _inView2.default)(node)).to.have.property('right', true);

      scroll(justRight + 1, justBelow + 1);
      expect((0, _inView2.default)(node)).to.be.true;
    });
  });

  describe('- With a given threshold', () => {
    it('Should ignore non-number threshold values', () => {
      scroll(justLeft, 0);
      expect((0, _inView2.default)(node)).to.have.property('left', true);
      expect((0, _inView2.default)(node, '')).to.have.property('left', true);
      expect((0, _inView2.default)(node, null)).to.have.property('left', true);
      expect((0, _inView2.default)(node, 0)).to.have.property('left', true);

      scrollX(justLeft - 1);
      expect((0, _inView2.default)(node)).to.have.property('left', false);
      expect((0, _inView2.default)(node, '')).to.have.property('left', false);
      expect((0, _inView2.default)(node, null)).to.have.property('left', false);
      expect((0, _inView2.default)(node, 0)).to.have.property('left', false);
    });

    describe('- With a positive value', () => {
      it('Should indicate that the element is off the viewport area to the left', () => {
        scroll(justLeft, 0);
        expect((0, _inView2.default)(node, threshold)).to.have.property('left', true);

        scrollX(justLeft - threshold);
        expect((0, _inView2.default)(node, threshold)).to.have.property('left', true);

        scrollX(justLeft - threshold - 1);
        expect((0, _inView2.default)(node, threshold)).to.have.property('left', false);
      });

      it('Should indicate that the element is off the viewport area to the right', () => {
        scroll(justRight, 0);
        expect((0, _inView2.default)(node, threshold)).to.have.property('right', true);

        scrollX(justRight + threshold);
        expect((0, _inView2.default)(node, threshold)).to.have.property('right', true);

        scrollX(justRight + threshold + 1);
        expect((0, _inView2.default)(node, threshold)).to.have.property('right', false);
      });

      it('Should indicate that the element is above the viewport area', () => {
        scroll(0, justAbove);
        expect((0, _inView2.default)(node, threshold)).to.have.property('above', true);

        scrollY(justAbove - threshold);
        expect((0, _inView2.default)(node, threshold)).to.have.property('above', true);

        scrollY(justAbove - threshold - 1);
        expect((0, _inView2.default)(node, threshold)).to.have.property('above', false);
      });

      it('Should indicate that the element is below the viewport area', () => {
        scroll(0, justBelow);
        expect((0, _inView2.default)(node, threshold)).to.have.property('below', true);

        scrollY(justBelow + threshold);
        expect((0, _inView2.default)(node, threshold)).to.have.property('below', true);

        scrollY(justBelow + threshold + 1);
        expect((0, _inView2.default)(node, threshold)).to.have.property('below', false);
      });
    });

    describe('- With a negative value', () => {
      const negThreshold = -threshold;

      it('Should indicate that the element is off the viewport area to the left', () => {
        scroll(justLeft, 0);
        expect((0, _inView2.default)(node, negThreshold)).to.have.property('left', false);

        scrollX(justLeft - negThreshold);
        expect((0, _inView2.default)(node, negThreshold)).to.have.property('left', true);

        scrollX(justLeft - negThreshold - 1);
        expect((0, _inView2.default)(node, negThreshold)).to.have.property('left', false);
      });

      it('Should indicate that the element is off the viewport area to the right', () => {
        scroll(justRight, 0);
        expect((0, _inView2.default)(node, negThreshold)).to.have.property('right', false);

        scrollX(justRight + negThreshold);
        expect((0, _inView2.default)(node, negThreshold)).to.have.property('right', true);

        scrollX(justRight + negThreshold + 1);
        expect((0, _inView2.default)(node, negThreshold)).to.have.property('right', false);
      });

      it('Should indicate that the element is above the viewport area', () => {
        scroll(0, justAbove);
        expect((0, _inView2.default)(node, negThreshold)).to.have.property('above', false);

        scrollY(justAbove - negThreshold);
        expect((0, _inView2.default)(node, negThreshold)).to.have.property('above', true);

        scrollY(justAbove - negThreshold - 1);
        expect((0, _inView2.default)(node, negThreshold)).to.have.property('above', false);
      });

      it('Should indicate that the element is below the viewport area', () => {
        scroll(0, justBelow);
        expect((0, _inView2.default)(node, negThreshold)).to.have.property('below', false);

        scrollY(justBelow + negThreshold);
        expect((0, _inView2.default)(node, negThreshold)).to.have.property('below', true);

        scrollY(justBelow + negThreshold + 1);
        expect((0, _inView2.default)(node, negThreshold)).to.have.property('below', false);
      });
    });
  });
});