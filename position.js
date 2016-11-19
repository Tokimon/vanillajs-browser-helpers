import scroll from './scroll';
import size from './size';
import isWindow from './isWindow';
import isDOMElement from './isDOMElement';
import isDOMDocument from './isDOMDocument';

/**
 * Get the curernt position of a HTML element, either relative to the offsetParent
 * or relative to the document. If the element is the viewport or the window, the
 * position of the window is returned.
 * @param  {HTMLElement|window} [elm = window] - The HTML element to find the position of
 * @param  {Boolean} relative = false - Find the position relative to the offsetParent rather than the document
 * @return {Object} - the position information of the element
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

    relative: {
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
