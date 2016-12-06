Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = position;

var _scroll = require('./scroll');

var _scroll2 = _interopRequireDefault(_scroll);

var _size = require('./size');

var _size2 = _interopRequireDefault(_size);

var _isWindow = require('./isWindow');

var _isWindow2 = _interopRequireDefault(_isWindow);

var _isDOMElement = require('./isDOMElement');

var _isDOMElement2 = _interopRequireDefault(_isDOMElement);

var _isDOMDocument = require('./isDOMDocument');

var _isDOMDocument2 = _interopRequireDefault(_isDOMDocument);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
 * @param  {HTMLElement|window} [elm = window] - The DOM element to find the position of
 * @param  {Boolean} relative = false - Find the position relative to the offsetParent rather than the document
 * @return {PositionData} - the position information of the element
 */
function position(elm) {
  if (!elm) {
    elm = window;
  }
  if ((0, _isDOMElement2.default)(elm, 'html', 'body')) {
    elm = elm.ownerDocument;
  }
  if ((0, _isDOMDocument2.default)(elm)) {
    elm = elm.defaultView;
  }

  // If element is window or the viewport, return the window position
  if ((0, _isWindow2.default)(elm)) {
    const top = window.screenLeft || window.screenX || 0;
    const left = window.screenY || window.screenTop || 0;
    const right = window.screen.availWidth - left - window.outerWidth;
    const bottom = window.screen.availHeight - top - window.outerHeight;

    return { top, left, right, bottom };
  }

  const rect = elm.getBoundingClientRect();
  const vpScroll = (0, _scroll2.default)();
  const vpSize = (0, _size2.default)();
  const parentSize = (0, _size2.default)(elm.offsetParent);
  const elmSize = (0, _size2.default)(elm);

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