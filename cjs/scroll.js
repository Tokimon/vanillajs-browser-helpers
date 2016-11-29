'use strict';

exports.default = scroll;

var _viewport = require('./viewport');

var _viewport2 = _interopRequireDefault(_viewport);

var _size = require('./size');

var _size2 = _interopRequireDefault(_size);

var _isObject = require('vanillajs-helpers/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _isNumber = require('vanillajs-helpers/isNumber');

var _isNumber2 = _interopRequireDefault(_isNumber);

var _isWindow = require('./isWindow');

var _isWindow2 = _interopRequireDefault(_isWindow);

var _isDOMElement = require('./isDOMElement');

var _isDOMElement2 = _interopRequireDefault(_isDOMElement);

var _inDOM = require('./inDOM');

var _inDOM2 = _interopRequireDefault(_inDOM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Find the current scroll position of a HTML Element
 * @param  {HTMLElement|window} [elm = window] - The HTML element to find the scrolling position from
 * @return {Object} - The current scroll information
 */
function scroll(elm = window, scrollPos = null) {
  let isWin = (0, _isWindow2.default)(elm);
  let view = elm;

  if (!isWin) {
    // If the element is a plain object, consider it as the scrollPos and correct variables
    if ((0, _isObject2.default)(elm)) {
      [elm, scrollPos] = [window, elm];
    }

    // For HTML and BODY we will use window, so we reference 'document' that in turn will reference window
    if ((0, _isDOMElement2.default)(elm, 'html', 'body')) {
      elm = elm.ownerDocument;
    }
    // If the element has a 'defaultView' (is the document node) we refer to the window element
    if (typeof elm.defaultView !== 'undefined') {
      elm = elm.defaultView;
    }

    // After all checks have been performed, do we now have the window?
    isWin = (0, _isWindow2.default)(elm);

    // 'elm' has to be a DOM Element in th DOM or the window object
    if (!((0, _isDOMElement2.default)(elm) && (0, _inDOM2.default)(elm)) || isWin) {
      return null;
    }
  } else {
    // If the view is a window/Frame use its viewport (for consitency)
    view = (0, _viewport2.default)(view);
  }

  // NOTE: We could use the 'pageXoffset'/'scollX' (and Y equivalents) values, but we
  // need the max scroll height of the content and the 'scrollMaxX' (and Y) are
  // non standard properties. So for consitency we use the viewport, that uses the
  // same methods as the normal HTML Elements.

  // Set the scroll position if the position object is defined
  if (scrollPos) {
    const { byX, byY, x, y } = scrollPos;

    // X Values - x = absolute pixel value, byX = relative pixel value
    if ((0, _isNumber2.default)(x)) {
      view.scrollTop = x;
    } else if ((0, _isNumber2.default)(byX)) {
      view.scrollTop += byX;
    }

    // Y Values - y = absolute pixel value, byY = relative pixel value
    if ((0, _isNumber2.default)(y)) {
      view.scrollTop = y;
    } else if ((0, _isNumber2.default)(byY)) {
      view.scrollTop += byY;
    }
  }

  // We use the size method to determine height of the content and the view area,
  // as the method used vary depending on the type of element
  const s = (0, _size2.default)(elm);

  // Return x, y coordinates of the current scroll and their max values
  return {
    x: view.scrollLeft,
    xMax: s.contentWidth - s.innerWidth,
    y: view.scrollTop,
    yMax: s.contentHeight - s.innerHeight
  };
}