import { mockClientRect } from './assets/mocks';
import { byId, createElement, generateId, insertHtml, removeElement } from './assets/helpers';

import inView from '../inView';



const testID = generateId('InView');
const hiddenID = generateId('InView_hidden');



describe('"inView"', () => {
  insertHtml(`
    <div id="${hiddenID}" style="display: none;"></div>
    <div id="${testID}"></div>
  `);

  const testNode = byId(testID);
  testNode.style.cssText = 'width: 100px; height: 100px';

  const div = createElement('div');
  div.innerHTML = '<p></p>';
  div.style.cssText = 'width: 100px; height: 100px';

  afterAll(() => {
    removeElement(hiddenID);
    removeElement(testID);
  });

  it('Sets only `inside` property to `true` when the element is inside the viewport area', () => {
    const result = { inside: true, above: false, below: false, left: false, right: false };
    const restore = mockClientRect({ top: 100, left: 100, right: 100, bottom: 100 });

    expect(inView(testNode)).toEqual(result);

    restore();
  });

  describe('Set all properties to `false` when the given element is', () => {
    it.each([
      ['Element not in the DOM', div],
      ['Child of element not in the DOM', div.firstElementChild as HTMLElement],
      ['Hidden', byId('hidden')]
    ])('%s', (_, elm) => {
      const result = { inside: false, above: false, below: false, left: false, right: false };
      expect(inView(elm)).toEqual(result);
    });
  });

  describe.each([0, 10, -10])('Indicates where the element is off screen (threshold: %i)', (threshold) => {
    it.each([
      'above',
      'below',
      'left',
      'right',
      'above, left',
      'above, right',
      'below, left',
      'below, right'
    ])('Indicates where the element is off the viewport area: "%s"', (places) => {
      type Key = 'above' | 'below' | 'left' | 'right';

      const keys = places.split(', ') as [Key] | [Key, Key];
      const result = { inside: false, above: false, below: false, left: false, right: false };
      const mock = { top: 100, left: 100, right: 100, bottom: 100 };

      keys.forEach((key) => {
        if (key === 'left') {
          mock.right = threshold;
        }

        if (key === 'right') {
          mock.left = window.innerWidth - threshold;
        }

        if (key === 'above') {
          mock.bottom = threshold;
        }

        if (key === 'below') {
          mock.top = window.innerHeight - threshold;
        }

        result[key] = true;
      });

      const restore = mockClientRect(mock);

      expect(inView(testNode, threshold || undefined)).toEqual(result);

      restore();
    });
  });
});
