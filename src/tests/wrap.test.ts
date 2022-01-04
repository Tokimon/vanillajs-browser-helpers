import { generateId, removeElement, byId, insertHtml } from './assets/helpers';

import wrap from '../wrap';



const testID = generateId('Wrap');
const elmID = generateId('Wrap_Elm');

describe('wrap', () => {
  beforeEach(() => {
    insertHtml(`
      <div id="${testID}">
        <div id="${elmID}"></div>
      </div>
    `);
  });

  afterEach(() => removeElement(testID));

  it('Does nothing when no HTML given', () => {
    const elm = byId(elmID);
    wrap(elm, '');
    expect(elm.parentElement?.id).toBe(testID);
  });

  it('Wraps an element in given HTML', () => {
    const elm = byId(elmID);

    wrap(elm, '<div class="wrapper"></div>');

    expect(elm.parentElement?.className).toBe('wrapper');
  });

  it('Inserts the given element after the text in the wrap', () => {
    const elm = byId(elmID);

    wrap(elm, `
      <div class="wrapper">
        some text here
      </div>
    `);

    expect(elm.previousSibling?.nodeValue?.trim()).toBe('some text here');
  });

  describe('Nested html structure', () => {
    it('Wraps the element in the deepest child', () => {
      const elm = byId(elmID);

      wrap(elm, `
        <div class="root">
          <div class="level1">
            <div class="wrapper"></div>
          </div>
        </div>
      `);

      expect(elm.parentElement?.className).toBe('wrapper');
      expect(elm.parentElement?.parentElement?.parentElement?.className).toBe('root');
    });

    it('Wraps the element in the first child', () => {
      const elm = byId(elmID);

      wrap(elm, `
        <div class="root">
          <div class="wrapper"></div>
          <div class="not-the-wrapper"></div>
        </div>
      `);

      expect(elm.parentElement?.className).toBe('wrapper');
      expect(elm.parentElement?.parentElement?.className).toBe('root');
    });
  });
});
