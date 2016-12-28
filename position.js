import scroll from './scroll';
import size from './size';
import isWindow from './isWindow';
import isDOMElement from './isDOMElement';
import isDOMDocument from './isDOMDocument';


/**
 * @typedef {Object} Position
 * @property {Number} top - The distance from the top.
 * @property {Number} left - The distance from the left.
 * @property {Number} right - The distance from the right.
 * @property {Number} bottom - The distance from the bottom.
 */

/**
 * @typedef {Object} PositionData
 * @extends Position
 * @property {Position} parent - Postion relative to the offset parent.
 * @property {Position} viewport - Position relative to the viewport area.
 */

/**
 * Get the curernt position of a DOM element, either relative to the offsetParent
 * or relative to the document. If the element is the viewport or the window, the
 * position of the window is returned.
 * @function position
 * @param {HTMLElement|window} [elm = window] - The DOM element to find the position of
 * @param {Boolean} relative = false - Find the position relative to the offsetParent rather than the document
 * @return {PositionData} the position information of the element
 */
export default function position(elm) {
  if(!elm) { elm = window; }
  if(isDOMElement(elm, 'html', 'body')) { elm = elm.ownerDocument; }
  if(isDOMDocument(elm)) { elm = elm.defaultView; }

  // If element is window or the viewport, return the window position
  if(isWindow(elm)) {
    const top = window.screenLeft || window.screenX || 0;
    const left = window.screenY || window.screenTop || 0;
    const right = window.screen.availWidth - left - window.outerWidth;
    const bottom = window.screen.availHeight - top - window.outerHeight;

    return { top, left, right, bottom };
  }

  const rect = elm.getBoundingClientRect();
  const vpScroll = scroll();
  const vpSize = size();
  const parentSize = size(elm.offsetParent);
  const elmSize = size(elm);

  return {
    top: rect.top + vpScroll.top,
    left: rect.left + vpScroll.left,
    right: vpSize.width - rect.right - vpScroll.left,
    bottom: vpSize.height - rect.bottom - vpScroll.top,

    parent: {
      top: elm.offsetTop,
      left: elm.offsetLeft,
      right: parentSize.innerWidth - elm.offsetLeft - elmSize.width,
      bottom: parentSize.innerHeight - elm.offsetRight - elmSize.height
    },

    viewport: {
      top: rect.top,
      left: rect.left,
      right: vpSize.width - rect.right,
      bottom: vpSize.height - rect.bottom
    }
  };
}
