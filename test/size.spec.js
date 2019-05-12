import { expect, helpers, describe, it, before, beforeEach, after, sinon } from './assets/init-test';

import viewport from '../viewport';
import size, {
  elmSize,
  windowSize,
  sizeType,
  marginBoxSize,
  outerSize,
  innerSize,
  contentSize,
  contentBoxSize,

  rewire$elmSize,
  rewire$windowSize,
  restore
} from '../size';



const testID = 'SizeTest';
const { MARGIN_BOX, OUTER, INNER, CONTENT, CONTENT_BOX } = sizeType;



describe('"size" >', () => {
  let testNode, scrollBarSize;

  const vp = viewport();

  before(() => {
    helpers.html(`
      <div
        id="${testID}"
        style="width: 90px; height: 90px; border: 5px solid; margin: 5px; padding: 5px; overflow: auto;"
      >
        <div id="Inner" style="width: 200px; height: 200px; overflow: scroll;"></div>
      </div>
    `);

    if (typeof scrollBarSize === 'undefined') {
      const Inner = helpers.id('Inner');
      scrollBarSize = Inner.offsetWidth - Inner.clientWidth;
    }

    testNode = helpers.id(testID);
  });

  after(() => {
    helpers.remove(testID);
  });

  describe('.elmSize >', () => {
    it('incorrect type, should return undefined', () => {
      expect(elmSize(testNode)).to.deep.equal(undefined);
      expect(elmSize(testNode, null)).to.deep.equal(undefined);
      expect(elmSize(testNode, 'NotGood')).to.deep.equal(undefined);
    });

    it('type = OUTER, should return the size including padding and border', () => {
      expect(elmSize(testNode, OUTER)).to.deep.equal({
        width: 110,
        height: 110
      });
    });

    it('type = INNER, should return the size including padding', () => {
      expect(elmSize(testNode, INNER)).to.deep.equal({
        width: 100 - scrollBarSize,
        height: 100 - scrollBarSize
      });
    });

    it('type = CONTENT, should return the size of content excluding padding', () => {
      expect(elmSize(testNode, CONTENT)).to.deep.equal({
        width: testNode.scrollWidth - 5,
        height: testNode.scrollHeight - 5
      });
    });

    it('type = CONTENT_BOX, should return the size excluding padding and border', () => {
      expect(elmSize(testNode, CONTENT_BOX)).to.deep.equal({
        width: 90 - scrollBarSize,
        height: 90 - scrollBarSize
      });
    });

    it('type = MARGIN_BOX, should return the size including border, padding and margin', () => {
      expect(elmSize(testNode, MARGIN_BOX)).to.deep.equal({
        width: 120,
        height: 120
      });
    });
  });

  describe('.windowSize >', () => {
    const spy = sinon.spy();

    before(() => { rewire$elmSize(spy); });
    beforeEach(() => { spy.resetHistory(); });
    after(() => { restore(); });

    it('type = falsy, should return the outer size of the window', () => {
      expect(windowSize()).to.deep.equal({
        width: window.outerWidth,
        height: window.outerHeight
      });

      expect(windowSize(null)).to.deep.equal({
        width: window.outerWidth,
        height: window.outerHeight
      });
    });

    it('type = OUTER, should return the outer size of the window', () => {
      expect(windowSize(OUTER)).to.deep.equal({
        width: window.outerWidth,
        height: window.outerHeight
      });
    });

    it('type = INNER, should call .elmSize, with the viewport element', () => {
      windowSize(INNER);
      expect(spy).to.be.calledWith(vp, INNER);
    });

    it('type = CONTENT, should call .elmSize, with the viewport element', () => {
      windowSize(CONTENT);
      expect(spy).to.be.calledWith(vp, CONTENT);
    });

    it('type = CONTENT_BOX, should call .elmSize, with the viewport element', () => {
      windowSize(CONTENT_BOX);
      expect(spy).to.be.calledWith(vp, CONTENT_BOX);
    });

    it('type = MARGIN_BOX, should call .elmSize, with the viewport element', () => {
      windowSize(MARGIN_BOX);
      expect(spy).to.be.calledWith(vp, MARGIN_BOX);
    });
  });

  describe('.size >', () => {
    it('Should return null when elm is neither window nor a DOM child node', () => {
      expect(size(document, INNER), 'Doc').to.equal(null);
      expect(size(document.documentElement), 'Body').to.equal(null);
    });

    it('Should call "windowSize" when elm is window', () => {
      const windowSizeSpy = sinon.spy();
      const elmSizeSpy = sinon.spy();

      rewire$windowSize(windowSizeSpy);
      rewire$elmSize(elmSizeSpy);

      size(window, INNER);

      expect(windowSizeSpy).to.have.been.calledWith(INNER);
      expect(elmSizeSpy).to.have.callCount(0);

      restore();
    });

    it('Should call "elmSize" when elm is a DOM Child Node', () => {
      const windowSizeSpy = sinon.spy();
      const elmSizeSpy = sinon.spy();

      rewire$windowSize(windowSizeSpy);
      rewire$elmSize(elmSizeSpy);

      size(testNode, INNER);

      expect(elmSizeSpy).to.have.been.calledWith(testNode, INNER);
      expect(windowSizeSpy).to.have.callCount(0);

      restore();
    });
  });

  describe('Shortcut methods >', () => {
    const spy = sinon.spy();

    before(() => { rewire$elmSize(spy); });
    beforeEach(() => { spy.resetHistory(); });
    after(() => { restore(); });

    it('.marginBoxSize should call elmSize with MARGIN_BOX', () => {
      marginBoxSize(testNode);
      expect(spy).to.have.been.calledWith(testNode, MARGIN_BOX);
    });

    it('.outerSize should call elmSize with OUTER', () => {
      outerSize(testNode);
      expect(spy).to.have.been.calledWith(testNode, OUTER);
    });

    it('.innerSize should call elmSize with INNER', () => {
      innerSize(testNode);
      expect(spy).to.have.been.calledWith(testNode, INNER);
    });

    it('.contentSize should call elmSize with CONTENT', () => {
      contentSize(testNode);
      expect(spy).to.have.been.calledWith(testNode, CONTENT);
    });

    it('.contentBoxSize should call elmSize with CONTENT_BOX', () => {
      contentBoxSize(testNode);
      expect(spy).to.have.been.calledWith(testNode, CONTENT_BOX);
    });
  });
});
