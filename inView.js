import isDOMChildNode from './isDOMChildNode';
import hidden from './hidden';



/**
 * @typedef {Object} PositionIndicator
 * @property {Boolean} inside - Is the element inside the viewport area
 * @property {Boolean} above - Is the element above the viewport area
 * @property {Boolean} below - Is the element below the viewport area
 * @property {Boolean} left - Is the element to the left of the viewport area
 * @property {Boolean} right- Is the element to the right of the viewport area
 */

/**
 * Determines whether the element is in the area of the viewport or not.
 * @function inView
 * @param {HTMLElement} elm - DOM element to test
 * @param {Number} [threshold = 0] - The distance to the edge of the viwport before
 *                                   the element is no longer inside in the viewport area
 *
 * @return {PositionIndicator} Returns an object with indications of where the element is compared to the viewport area
 */
export default function inView(elm, threshold = 0) {
  const elmOk = isDOMChildNode(elm) && !hidden(elm);

  const rect = !!elmOk && elm.getBoundingClientRect();
  const vpWidth = window.innerWidth;
  const vpHeight = window.innerHeight;

  const above = rect && rect.bottom - threshold <= 0;
  const below = rect && rect.top - vpHeight + threshold >= 0;
  const left = rect && rect.right - threshold <= 0;
  const right = rect && rect.left - vpWidth + threshold >= 0;
  const inside = !!rect && !above && !below && !left && !right;

  return { inside, above, below, left, right };
}
