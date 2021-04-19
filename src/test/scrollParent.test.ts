import { appendFrame, byId, createDetachedDocument, generateId, getOne, insertHtml, removeElement } from './assets/helpers';

import scrollParent from '../scrollParent';



const scrollerID = generateId('scroller');
const childID = generateId('child');
const style = 'with: 10px; height: 10px;';



describe('"scrollParent', () => {
  const scrollElm = (doc: Document) => doc.documentElement;

  describe.each([
    ['<html> element', (doc: Document) => doc.documentElement],
    ['<body> element', (doc: Document) => doc.body]
  ])('%s, Returns document.scrollingElement (viewport)', (_, getElm) => {
    it('In the current document', () => {
      const doc = document;
      expect(scrollParent(getElm(doc))).toBe(scrollElm(doc));
    });

    it('In a Frame document', () => {
      const frame = appendFrame();

      const doc = frame.contentDocument as Document;
      expect(scrollParent(getElm(doc))).toBe(scrollElm(doc));

      frame.remove();
    });

    it('A DOM Node in a detached Document', () => {
      const doc = createDetachedDocument();
      expect(scrollParent(getElm(doc))).toBe(scrollElm(doc));
    });
  });

  describe.each([
    ['Single element', `<div class="root" id="${childID}" style="${style}" />`],
    ['"fixed" Element', `<div class="root" id="${childID}" style="${style}position: fixed"></div>`],
    ['Element inside "overflow: hidden;" element', `
      <div class="root" style="${style}position: relative; overflow: hidden">
        <div id="${childID}" />
      </div>
    `],
    ['Element inside "relative" Element', `
      <div class="root" style="${style}">
        <div style="position: relative">
          <div id="${childID}" />
        </div>
      </div>
    `],
    ['"absolute" Element inside an Element with "overflow"', `
      <div class="root" style="${style}">
        <div style="${style}position: static; overflow: auto">
          <div id="${childID}" style="${style}position: absolute" />
        </div>
      </div>
    `],
    ['"fixed" Element inside an Element with "overflow"', `
      <div class="root" style="${style}overflow: auto">
        <div id="${childID}" style="${style}position: fixed" />
      </div>
    `]
  ])('%s: Returns document.scrollingElement (viewport)', (_, HTML) => {
    function suite(doc: Document) {
      insertHtml(HTML, doc.body);

      expect(scrollParent(byId(childID, doc))).toBe(scrollElm(doc));

      removeElement(getOne('.root', doc), doc);
    }

    it('In the current document', () => {
      suite(document);
    });

    it('In a Frame document', () => {
      const frame = appendFrame();

      const doc = frame.contentDocument as Document;
      suite(doc);

      frame.remove();
    });

    it('A DOM Node in a detached Document', () => {
      const doc = createDetachedDocument();
      suite(doc);
    });
  });

  describe('Returns the nearest element with scrolling overflow when', () => {
    describe.each([
      ['Element is direct child', `
      <div class="root" id="${scrollerID}" style="${style}">
        <div id="${childID}" style="${style}" />
      </div>
    `],
      ['Element is child of "relative" child', `
      <div class="root" id="${scrollerID}">
        <div style="${style}position: relative">
          <div id="${childID}" style="${style}" />
        <div>
      </div>
    `],
      ['It is "relative" and element is "absolute"', `
      <div class="root" id="${scrollerID}" style="${style}position: relative">
        <div style="${style}position: static; overflow: auto">
          <div id="${childID}" style="${style}position: absolute" />
        <div>
      </div>
    `],
      ['It is "relative" and element is "absolute" (skipping no scrolling "relative" parent)', `
      <div class="root" id="${scrollerID}" style="${style}position: relative">
        <div style="${style}position: static; overflow: auto">
          <div style="${style}position: relative">
            <div id="${childID}" style="${style}position: absolute" />
          </div>
        <div>
      </div>
    `],
      ['Itself is a child of a relative scrolling element', `
      <div class="root">
        <div style="${style}position: relative; overflow: auto">
          <div id="${scrollerID}" style="${style}position: relative">
            <div id="${childID}" style="${style}position: absolute" />
          </div>
        <div>
      </div>
    `]
    ])('%s', (_, HTML) => {
      let scroller: HTMLElement;
      let child: HTMLElement;
      let root: Element;

      beforeEach(() => {
        insertHtml(HTML);
        scroller = byId(scrollerID);
        child = byId(childID);
        root = getOne('.root');
      });

      afterAll(() => {
        removeElement(root);
      });

      describe.each(['overflow', 'overflowX', 'overflowY'] as const)('with: %s', (overflow) => {
        it.each(['auto', 'scroll'] as const)('%s', (scroll) => {
          scroller.style[overflow] = scroll;
          expect(scrollParent(child)).toBe(scroller);
        });
      });
    });
  });
});
