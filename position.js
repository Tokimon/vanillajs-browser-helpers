import isWindow from './isWindow';
import isDOMElement from './isDOMElement';
import isDOMDocument from './isDOMDocument';
import scrollInfo from './scrollInfo';
import size from './size';



function windowPosition() {
  const top = window.screenLeft || window.screenX || 0;
  const left = window.screenY || window.screenTop || 0;
  const right = window.screen.availWidth - left - window.outerWidth;
  const bottom = window.screen.availHeight - top - window.outerHeight;

  return { top, left, right, bottom };
}

function relativeToDoc(elm) {
  const rect = elm.getBoundingClientRect();
  const vpScroll = scrollInfo();
  const vpSize = size();

  return {
    top: rect.top + vpScroll.top,
    left: rect.left + vpScroll.left,
    right: vpSize.width - rect.right - vpScroll.left,
    bottom: vpSize.height - rect.bottom - vpScroll.top
  };
}

function relativeToParent(elm) {
  const parentSize = size(elm.offsetParent);
  const elmSize = size(elm);

  return {
    top: elm.offsetTop,
    left: elm.offsetLeft,
    right: parentSize.innerWidth - elm.offsetLeft - elmSize.width,
    bottom: parentSize.innerHeight - elm.offsetRight - elmSize.height
  };
}

function relativeToViewport(elm) {
  const rect = elm.getBoundingClientRect();
  const vpSize = size();

  return {
    top: rect.top,
    left: rect.left,
    right: vpSize.width - rect.right,
    bottom: vpSize.height - rect.bottom
  };
}


/**
 * @typedef {Object} Position
 * @property {Number} top - The distance from the top.
 * @property {Number} left - The distance from the left.
 * @property {Number} right - The distance from the right.
 * @property {Number} bottom - The distance from the bottom.
 */

/**
 * Get the curernt position of a DOM element. Position calculation is per default
 * relative to the document, but this can be changed via the `relativity` argument.
 * If the element is the viewport or the window, the position of the window is returned.
 * @function position
 * @param {HTMLElement|window} [elm = window] - The DOM element to find the position of
 * @param {Boolean} [relativity = 'document'] - What the position is relative to. Valid values:
 *  - document = relative to the document (default)
 *  - viewport = relative to current viewport
 *  - parent = relative to the offset parent
 * @return {Position} the position information of the element
 */
export default function position(elm, relativity) {
  if (!elm) { elm = window; }
  if (isDOMElement(elm, 'html', 'body')) { elm = elm.ownerDocument; }
  if (isDOMDocument(elm)) { elm = elm.defaultView; }

  // If element is window, return the window position relative to the screen
  if (isWindow(elm)) { return windowPosition(); }

  switch (relativity) {
    case 'viewport': return relativeToViewport(elm);
    case 'parent': return relativeToParent(elm);
    case 'document':
    default: return relativeToDoc(elm);
  }
}
