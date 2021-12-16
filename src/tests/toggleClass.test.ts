import { byId, createElement, generateId, insertHtml, removeElement } from './assets/helpers';

import toggleClass from '../toggleClass';



const testID = generateId('ToggleClass');



describe('"toggleClass"', () => {
  let testNode: HTMLElement;
  const cn = 'test';
  const cns = ['test', 'test2', 'test3'];
  const cnsStr = cns.join(' ');

  beforeAll(() => {
    insertHtml(`<div id="${testID}"></div>`);
    testNode = byId(testID);
  });

  beforeEach(() => { testNode.className = ''; });

  afterAll(() => removeElement(testID));

  it('Returns given element', () => {
    const div = createElement('div');
    expect(toggleClass(div, cn)).toBe(div);
  });

  describe('Toggles a single class name', () => {
    it('Adds it', () => {
      testNode.className = '';

      toggleClass(testNode, cn);
      expect(testNode.className).toBe(cn);
    });

    it('Removes it', () => {
      testNode.className = cn;

      toggleClass(testNode, cn);
      expect(testNode.className).toBe('');
    });

    describe('When `force == true`', () => {
      it('Does nothing when class name already exists', () => {
        testNode.className = cn;

        toggleClass(testNode, cn, true);
        expect(testNode.className).toBe(cn);
      });

      it('Adds the class name', () => {
        testNode.className = '';

        toggleClass(testNode, cn, true);
        expect(testNode.className).toBe(cn);
      });
    });

    describe('When `force == false`', () => {
      it('Does nothing when class name does not exists', () => {
        testNode.className = '';

        toggleClass(testNode, cn, false);
        expect(testNode.className).toBe('');
      });

      it('Removes the class name', () => {
        testNode.className = cn;

        toggleClass(testNode, cn, false);
        expect(testNode.className).toBe('');
      });
    });
  });

  describe('Toggles a multiple class names', () => {
    it('Adds them', () => {
      testNode.className = '';

      toggleClass(testNode, cns);
      expect(testNode.className).toBe(cnsStr);
    });

    it('Removes it', () => {
      testNode.className = cnsStr;

      toggleClass(testNode, cns);
      expect(testNode.className).toBe('');
    });

    it('Adds non existing class names and removes existing', () => {
      const str = cns.slice(1).join(' ');
      testNode.className = str;

      toggleClass(testNode, cns);
      expect(testNode.className).toBe(cns[0]);

      toggleClass(testNode, cns);
      expect(testNode.className).toBe(str);
    });

    describe('When `force == true`', () => {
      it('Does nothing when class names already exists', () => {
        testNode.className = cnsStr;

        toggleClass(testNode, cns, true);
        expect(testNode.className).toBe(cnsStr);
      });

      it('Adds the class name', () => {
        testNode.className = '';

        toggleClass(testNode, cns, true);
        expect(testNode.className).toBe(cnsStr);
      });

      it('Only adds non existing class names', () => {
        const str = cns.slice(1).join(' ');
        testNode.className = str;

        toggleClass(testNode, cns, true);
        expect(testNode.className).toBe('test2 test3 test');
      });

      it('Only add non existing class names in the given list', () => {
        testNode.className = 'existing';

        toggleClass(testNode, cns, true);
        expect(testNode.className).toBe(['existing', ...cns].join(' '));
      });
    });

    describe('When `force == false`', () => {
      it('Does nothing when class name does not exists', () => {
        testNode.className = '';

        toggleClass(testNode, cns, false);
        expect(testNode.className).toBe('');
      });

      it('Removes the class name', () => {
        testNode.className = cnsStr;

        toggleClass(testNode, cns, false);
        expect(testNode.className).toBe('');
      });

      it('Only removes existing class names', () => {
        const str = cns.slice(1).join(' ');
        testNode.className = str;

        toggleClass(testNode, cns, false);
        expect(testNode.className).toBe('');
      });

      it('Only removes existing class names in the given list', () => {
        const list = cns.concat('untouched');
        testNode.className = list.join(' ');

        toggleClass(testNode, cns, false);
        expect(testNode.className).toBe('untouched');
      });
    });
  });
});
