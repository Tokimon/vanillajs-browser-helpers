import isObject from 'vanillajs-helpers/isObject';
import isNumber from 'vanillajs-helpers/isNumber';

import viewport from './viewport';
import isWindow from './isWindow';
import isDOMElement from './isDOMElement';
import inDOM from './inDOM';
import size from './size';

/**
 * @typedef {Object} ScrollData
 * @property {Number} x - The distance scrolled from the top.
 * @property {Number} xMax - Max distance to scroll from the top.
 * @property {Number} y - The distance scrolled from the left.
 * @property {Number} yMax - Max distance to scroll from the left.
 */

/**
 * Find the current scroll position of a DOM element
 * @param  {HTMLElement|window} [elm = window] - The DOM element to find the scrolling position from
 * @return {ScrollData} - The scroll information
 */
export default function scroll(elm = window, scrollPos = null) {
  let isWin = isWindow(elm);
  let view = elm;

  if(!isWin) {
    // If the element is a plain object, consider it as the scrollPos and correct variables
    if(isObject(elm)) { [elm, scrollPos] = [window, elm]; }

    // For HTML and BODY we will use window, so we reference 'document' that in turn will reference window
    if(isDOMElement(elm, 'html', 'body')) { elm = elm.ownerDocument; }
    // If the element has a 'defaultView' (is the document node) we refer to the window element
    if(typeof elm.defaultView !== 'undefined') { elm = elm.defaultView; }

    // After all checks have been performed, do we now have the window?
    isWin = isWindow(elm);

    // 'elm' has to be a DOM element in th DOM or the window object
    if(!(isDOMElement(elm) && inDOM(elm)) || isWin) { return null; }
  } else {
    // If the view is a window/Frame use its viewport (for consitency)
    view = viewport(view);
  }

  // NOTE: We could use the 'pageXoffset'/'scollX' (and Y equivalents) values, but we
  // need the max scroll height of the content and the 'scrollMaxX' (and Y) are
  // non standard properties. So for consitency we use the viewport, that uses the
  // same methods as the normal DOM elements.

  // Set the scroll position if the position object is defined
  if(scrollPos) {
    const { byX, byY, x, y } = scrollPos;

    // X Values - x = absolute pixel value, byX = relative pixel value
    if(isNumber(x)) { view.scrollTop = x; } else if(isNumber(byX)) { view.scrollTop += byX; }

    // Y Values - y = absolute pixel value, byY = relative pixel value
    if(isNumber(y)) { view.scrollTop = y; } else if(isNumber(byY)) { view.scrollTop += byY; }
  }

  // We use the size method to determine height of the content and the view area,
  // as the method used vary depending on the type of element
  const s = size(elm);

  // Return x, y coordinates of the current scroll and their max values
  return {
    x: view.scrollLeft,
    xMax: s.contentWidth - s.innerWidth,
    y: view.scrollTop,
    yMax: s.contentHeight - s.innerHeight
  };
}
