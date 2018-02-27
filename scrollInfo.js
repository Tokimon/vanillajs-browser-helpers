import viewport from './viewport';
import isDOMChildNode from './isDOMChildNode';



/**
 * @typedef {Object} ScrollInfo
 * @property {Number} x - The distance scrolled from the top.
 * @property {Number} xMax - Max distance to scroll from the top.
 * @property {Number} y - The distance scrolled from the left.
 * @property {Number} yMax - Max distance to scroll from the left.
 */

/**
 * Gather the current scrolling information of a DOM/Window element
 * @function scroll
 * @param {HTMLElement|window} [elm = window] - The element to find the scrolling position from
 * @return {ScrollInfo} The scroll information
 */
export default function scroll(elm = window, scrollPos = null) {
  const info = { x: 0, xMax: 0, xPct: 0, y: 0, yMax: 0, yPct: 0 };
  if(!isDOMChildNode(elm)) { elm = viewport(elm); }
  if(!elm) { return info; }

  info.x = elm.scrollLeft;
  info.y = elm.scrollTop;

  info.xMax = Math.max(elm.scrollWidth - elm.clientWidth, 0);
  info.yMax = Math.max(elm.scrollHeight - elm.clientHeight, 0);

  info.xPct = info.xMax ? info.x / info.xMax : 0;
  info.yPct = info.yMax ? info.y / info.yMax : 0;

  return info;
}
