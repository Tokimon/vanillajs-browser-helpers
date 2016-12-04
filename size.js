import viewport from './viewport';
import isWindow from './isWindow';
import isDOMRoot from './isDOMRoot';
import isDOMDocument from './isDOMDocument';

/**
 * @typedef {Object} SizeData
 * @property {Number} width - The total width of the element (with border etc.)
 * @property {Number} height - The total height of the element (with border etc.)
 * @property {Number} innerWidth - The width of the elements view area (without border etc.)
 * @property {Number} innerHeight - The height of the elements view area (without border etc.)
 * @property {Number} contentWidth - The width of content of the element
 * @property {Number} contentHeight - The height of content of the element
 */

/**
 * Finds the size of a DOM element or window.
 * @param  {HTMLElement|window} [elm = viewport] - The DOM element (or window) to find the size of
 * @return {SizeData} - Object describing the various size information of an element
 */
export default function size(elm) {
  if(isDOMDocument(elm)) { elm = elm.documentElement; }

  const isRoot = isDOMRoot(elm);
  const isWin = isWindow(elm);
  const win = isWin ? elm : elm.ownerDocument.defaultView;
  const view = isRoot ? viewport(elm) : elm;

  return {
    width: !isRoot ? elm.offsetWidth : win[`${isWin ? 'outer' : 'inner'}Width`],
    height: !isRoot ? elm.offsetHeight : win[`${isWin ? 'outer' : 'inner'}Height`],
    innerWidth: !isWin ? elm[`${!isRoot ? 'client' : 'offset'}Width`] : win.innerWidth,
    innerHeight: !isWin ? elm[`${!isRoot ? 'client' : 'offset'}Height`] : win.innerHeight,
    contentWidth: view.scrollWidth,
    contentHeight: view.scrollHeight
  };
}
