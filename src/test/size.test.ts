import { byId, generateId, insertHtml, removeElement } from './assets/helpers';

import viewport from '../viewport';
import * as sizeFns from '../size';



const {
  SizeType,
  elmSize,
  windowSize,
  marginBoxSize,
  outerSize,
  innerSize,
  contentSize,
  contentBoxSize,
  default: size
} = sizeFns;



const testID = generateId('Size');



describe('"size"', () => {
  let testNode: HTMLElement;

  const s = 100;
  const b = 2;
  const m = 10;
  const p = 5;

  beforeAll(() => {
    insertHtml(`
      <div
        id="${testID}"
        style="width: ${s}px; height: ${s}px; border: ${b}px solid; margin: ${m}px; padding: ${p}px;"
      />
    `);

    testNode = byId(testID);
  });

  afterAll(() => {
    removeElement(testID);
  });

  describe('.elmSize', () => {
    it('`type` = OUTER, returns the size including padding and border', () => {
      expect(elmSize(testNode, SizeType.OUTER)).toEqual({
        width: s,
        height: s
      });
    });

    it('`type` = INNER, returns the size including padding', () => {
      expect(elmSize(testNode, SizeType.INNER)).toEqual({
        width: s - (b * 2),
        height: s - (b * 2)
      });
    });

    it('`type` = CONTENT, returns the size of content excluding padding', () => {
      expect(elmSize(testNode, SizeType.CONTENT)).toEqual({
        width: testNode.scrollWidth - (p * 2),
        height: testNode.scrollHeight - (p * 2)
      });
    });

    it('`type` = CONTENT_BOX, returns the size excluding padding and border', () => {
      expect(elmSize(testNode, SizeType.CONTENT_BOX)).toEqual({
        width: testNode.clientWidth - (p * 2),
        height: testNode.clientHeight - (p * 2)
      });
    });

    it('`type` = MARGIN_BOX, returns the size including border, padding and margin', () => {
      expect(elmSize(testNode, SizeType.MARGIN_BOX)).toEqual({
        width: s + (m * 2),
        height: s + (m * 2)
      });
    });

    it('`type` defaults to CONTENT', () => {
      expect(elmSize(testNode)).toEqual(elmSize(testNode, SizeType.CONTENT));
    });
  });

  describe('.windowSize', () => {
    const vp = viewport() as HTMLElement;
    // TODO: Should test iFrame window as well, but its size has to be mocked

    // it('iFrame', () => {
    //   const frame = appendFrame();
    //   frame.style.cssText = 'width: 100px; height: 100px;';
    //   const win = frame.contentWindow;
    //   console.log({
    //     width: win.outerWidth,
    //     height: win.outerHeight,
    //     isWin: window === win
    //   });
    // });

    it('`type` = OUTER, should return the outer size of the window', () => {
      expect(windowSize(window, SizeType.OUTER)).toEqual({
        width: window.outerWidth,
        height: window.outerHeight
      });
    });

    it('`type` = INNER, calls .elmSize, with the viewport element', () => {
      expect(windowSize(window, SizeType.INNER))
        .toEqual(elmSize(vp, SizeType.INNER));
    });

    it('`type` = CONTENT, calls .elmSize, with the viewport element', () => {
      expect(windowSize(window, SizeType.CONTENT))
        .toEqual(elmSize(vp, SizeType.CONTENT));
    });

    it('`type` = CONTENT_BOX, calls .elmSize, with the viewport element', () => {
      expect(windowSize(window, SizeType.CONTENT_BOX))
        .toEqual(elmSize(vp, SizeType.CONTENT_BOX));
    });

    it('`type` = MARGIN_BOX, calls .elmSize, with the viewport element', () => {
      expect(windowSize(window, SizeType.MARGIN_BOX))
        .toEqual(elmSize(vp, SizeType.MARGIN_BOX));
    });

    it('`type` defaults to OUTER', () => {
      expect(windowSize()).toEqual(windowSize(window, SizeType.OUTER));
    });
  });

  describe('.size', () => {
    it('Calls `windowSize` when elm is window', () => {
      expect(size(window))
        .toEqual(windowSize(window));
    });

    it('Call `elmSize` when elm is a HTML Element', () => {
      expect(size(testNode, SizeType.INNER))
        .toEqual(elmSize(testNode, SizeType.INNER));
    });
  });

  describe('Shortcut methods', () => {
    it('`.marginBoxSize` calls `elmSize` with MARGIN_BOX', () => {
      expect(marginBoxSize(testNode))
        .toEqual(elmSize(testNode, SizeType.MARGIN_BOX));
    });

    it('`.outerSize` calls `elmSize` with OUTER', () => {
      expect(outerSize(testNode))
        .toEqual(elmSize(testNode, SizeType.OUTER));
    });

    it('`.innerSize` calls `elmSize` with INNER', () => {
      expect(innerSize(testNode))
        .toEqual(elmSize(testNode, SizeType.INNER));
    });

    it('`.contentSize` calls `elmSize` with CONTENT', () => {
      expect(contentSize(testNode))
        .toEqual(elmSize(testNode, SizeType.CONTENT));
    });

    it('`.contentBoxSize` calls `elmSize` with CONTENT_BOX', () => {
      expect(contentBoxSize(testNode))
        .toEqual(elmSize(testNode, SizeType.CONTENT_BOX));
    });
  });
});
