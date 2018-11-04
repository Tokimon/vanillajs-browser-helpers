import { expect, helpers, describe, it, before, after } from './assets/init-test';

import inView from '../inView';



const testID = 'TestNode';



function scroll(x, y) { window.scroll(x, y); }

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
  const itemX = (w / 2) - itemHalfSize;
  const itemY = (h / 2) - itemHalfSize;
  const justAbove = itemY + itemSize;
  const justBelow = itemY - viewH;
  const justLeft = itemX + itemSize;
  const justRight = itemX - viewW;

  const threshold = 20;

  before(() => {
    helpers.html(`
      <div id="View">
        <div id="hidden"></div>
        <div id="${testID}"></div>
        <style>
          body { margin: 0; width: 800px; height: 800px; overflow: hidden; }

          #View {
            width: ${w}px;
            height: ${h}px;
          }

          #${testID} {
            width: ${itemSize}px;
            height: ${itemSize}px;
            margin: ${viewH + itemHalfSize}px auto 0;
          }

          #hidden {
            display: none;
          }
        </style>
      </div>
    `);

    node = helpers.id(testID);
  });

  after(() => { helpers.remove('View'); });

  it('Should return false if the given element is hidden or not an element in the DOM', () => {
    const div = helpers.create('div');
    div.innerHTML = '<p></p>';

    expect(inView()).to.equal(false);
    expect(inView(null)).to.equal(false);
    expect(inView({})).to.equal(false);
    expect(inView(div)).to.equal(false);
    expect(inView(div.firstChild)).to.equal(false);
    expect(inView(helpers.id('hidden'))).to.equal(false);
    expect(inView(node)).not.to.equal(false);
  });

  it('Should return true if the element is inside the viewport area', () => {
    scroll(0, 0);
    expect(inView(node)).to.be.an('object');

    scrollX(w / 4);
    expect(inView(node)).to.be.an('object');

    scrollY(h / 4);
    expect(inView(node)).to.equal(true);
  });

  describe('- Off screen indications', () => {
    it('Should indicate that the element is off the viewport area to the left', () => {
      scroll(justLeft, 0);
      expect(inView(node)).to.have.property('left', true);

      scroll(justLeft - 1, 0);
      expect(inView(node)).to.have.property('left', false);
    });

    it('Should indicate that the element is off the viewport area to the right', () => {
      scroll(justRight, 0);
      expect(inView(node)).to.have.property('right', true);

      scroll(justRight + 1, 0);
      expect(inView(node)).to.have.property('right', false);
    });

    it('Should indicate that the element is above the viewport area', () => {
      scroll(0, justAbove);
      expect(inView(node)).to.have.property('above', true);

      scroll(0, justAbove - 1);
      expect(inView(node)).to.have.property('above', false);
    });

    it('Should indicate that the element is above the viewport area to the left', () => {
      scroll(justLeft, justAbove);
      expect(inView(node)).to.have.property('above', true);
      expect(inView(node)).to.have.property('left', true);

      scroll(justLeft - 1, justAbove - 1);
      expect(inView(node)).to.equal(true);
    });

    it('Should indicate that the element is above the viewport area to the right', () => {
      // Scroll out of view top/right
      scroll(justRight, justAbove);

      let shown = inView(node);
      expect(shown.above).to.equal(true);
      expect(shown.right).to.equal(true);

      // Scroll just into view
      scroll(justRight + 1, justAbove - 1);

      shown = inView(node);
      expect(shown).to.equal(true);
    });

    it('Should indicate that the element is below the viewport area', () => {
      scroll(0, justBelow);
      expect(inView(node)).to.have.property('below', true);

      scroll(0, justBelow + 1);
      expect(inView(node)).to.have.property('below', false);
    });

    it('Should indicate that the element is below the viewport area to the left', () => {
      scroll(justLeft, justBelow);
      expect(inView(node)).to.have.property('below', true);
      expect(inView(node)).to.have.property('left', true);

      scroll(justLeft - 1, justBelow + 1);
      expect(inView(node)).to.equal(true);
    });

    it('Should indicate that the element is below the viewport area to the right', () => {
      scroll(justRight, justBelow);
      expect(inView(node)).to.have.property('below', true);
      expect(inView(node)).to.have.property('right', true);

      scroll(justRight + 1, justBelow + 1);
      expect(inView(node)).to.equal(true);
    });
  });

  describe('- With a given threshold', () => {
    it('Should ignore non-number threshold values', () => {
      scroll(justLeft, 0);
      expect(inView(node)).to.have.property('left', true);
      expect(inView(node, '')).to.have.property('left', true);
      expect(inView(node, null)).to.have.property('left', true);
      expect(inView(node, 0)).to.have.property('left', true);

      scrollX(justLeft - 1);
      expect(inView(node)).to.have.property('left', false);
      expect(inView(node, '')).to.have.property('left', false);
      expect(inView(node, null)).to.have.property('left', false);
      expect(inView(node, 0)).to.have.property('left', false);
    });

    describe('- With a positive value', () => {
      it('Should indicate that the element is off the viewport area to the left', () => {
        scroll(justLeft, 0);
        expect(inView(node, threshold)).to.have.property('left', true);

        scrollX(justLeft - threshold);
        expect(inView(node, threshold)).to.have.property('left', true);

        scrollX(justLeft - threshold - 1);
        expect(inView(node, threshold)).to.have.property('left', false);
      });

      it('Should indicate that the element is off the viewport area to the right', () => {
        scroll(justRight, 0);
        expect(inView(node, threshold)).to.have.property('right', true);

        scrollX(justRight + threshold);
        expect(inView(node, threshold)).to.have.property('right', true);

        scrollX(justRight + threshold + 1);
        expect(inView(node, threshold)).to.have.property('right', false);
      });

      it('Should indicate that the element is above the viewport area', () => {
        scroll(0, justAbove);
        expect(inView(node, threshold)).to.have.property('above', true);

        scrollY(justAbove - threshold);
        expect(inView(node, threshold)).to.have.property('above', true);

        scrollY(justAbove - threshold - 1);
        expect(inView(node, threshold)).to.have.property('above', false);
      });

      it('Should indicate that the element is below the viewport area', () => {
        scroll(0, justBelow);
        expect(inView(node, threshold)).to.have.property('below', true);

        scrollY(justBelow + threshold);
        expect(inView(node, threshold)).to.have.property('below', true);

        scrollY(justBelow + threshold + 1);
        expect(inView(node, threshold)).to.have.property('below', false);
      });
    });

    describe('- With a negative value', () => {
      const negThreshold = -threshold;

      it('Should indicate that the element is off the viewport area to the left', () => {
        scroll(justLeft, 0);
        expect(inView(node, negThreshold)).to.have.property('left', false);


        scrollX(justLeft - negThreshold);
        expect(inView(node, negThreshold)).to.have.property('left', true);

        scrollX(justLeft - negThreshold - 1);
        expect(inView(node, negThreshold)).to.have.property('left', false);
      });

      it('Should indicate that the element is off the viewport area to the right', () => {
        scroll(justRight, 0);
        expect(inView(node, negThreshold)).to.have.property('right', false);

        scrollX(justRight + negThreshold);
        expect(inView(node, negThreshold)).to.have.property('right', true);

        scrollX(justRight + negThreshold + 1);
        expect(inView(node, negThreshold)).to.have.property('right', false);
      });

      it('Should indicate that the element is above the viewport area', () => {
        scroll(0, justAbove);
        expect(inView(node, negThreshold)).to.have.property('above', false);

        scrollY(justAbove - negThreshold);
        expect(inView(node, negThreshold)).to.have.property('above', true);

        scrollY(justAbove - negThreshold - 1);
        expect(inView(node, negThreshold)).to.have.property('above', false);
      });

      it('Should indicate that the element is below the viewport area', () => {
        scroll(0, justBelow);
        expect(inView(node, negThreshold)).to.have.property('below', false);

        scrollY(justBelow + negThreshold);
        expect(inView(node, negThreshold)).to.have.property('below', true);

        scrollY(justBelow + negThreshold + 1);
        expect(inView(node, negThreshold)).to.have.property('below', false);
      });
    });
  });
});
