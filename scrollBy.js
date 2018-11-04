import isNumber from 'vanillajs-helpers/isNumber';

import isDOMChildNode from './isDOMChildNode';



/**
 * Scroll an element by this amount compared to its current scrolling position
 *
 * @function scrollBy
 * @param {HTMLElement|window} [elm = window] - The element to find the scrolling position from
 * @param {Number} x - How much to scroll the horisontal scroll by
 * @param {Number} y - How much to scroll the vertical scroll by
 * @return {HTMLElement|window} - The scrolling element (if no element was given Window is returned)
 */
export default function scrollBy(elm, x, y) {
  if (isNumber(elm)) { [elm, x, y] = [window, elm, x]; }
  if (!isNumber(x)) { return elm; }

  const orgElm = elm;
  if (!isDOMChildNode(elm)) { elm = window; }
  if (!isNumber(y)) { y = elm.scrollY || elm.scrollTop; }

  if (elm.scrollBy) {
    elm.scrollBy(x, y);
  } else {
    elm.scrollLeft = Math.max(elm.scrollLeft + x, 0);
    elm.scrollTop = Math.max(elm.scrollTop + y, 0);
  }

  return orgElm;
}
