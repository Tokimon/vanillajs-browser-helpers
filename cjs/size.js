'use strict';

exports.default = size;

var _viewport = require('./viewport');

var _viewport2 = _interopRequireDefault(_viewport);

var _isWindow = require('./isWindow');

var _isWindow2 = _interopRequireDefault(_isWindow);

var _isDOMRoot = require('./isDOMRoot');

var _isDOMRoot2 = _interopRequireDefault(_isDOMRoot);

var _isDOMDocument = require('./isDOMDocument');

var _isDOMDocument2 = _interopRequireDefault(_isDOMDocument);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
function size(elm) {
  if ((0, _isDOMDocument2.default)(elm)) {
    elm = elm.documentElement;
  }

  const isRoot = (0, _isDOMRoot2.default)(elm);
  const isWin = (0, _isWindow2.default)(elm);
  const win = isWin ? elm : elm.ownerDocument.defaultView;
  const view = isRoot ? (0, _viewport2.default)(elm) : elm;

  return {
    width: !isRoot ? elm.offsetWidth : win[`${ isWin ? 'outer' : 'inner' }Width`],
    height: !isRoot ? elm.offsetHeight : win[`${ isWin ? 'outer' : 'inner' }Height`],
    innerWidth: !isWin ? elm[`${ !isRoot ? 'client' : 'offset' }Width`] : win.innerWidth,
    innerHeight: !isWin ? elm[`${ !isRoot ? 'client' : 'offset' }Height`] : win.innerHeight,
    contentWidth: view.scrollWidth,
    contentHeight: view.scrollHeight
  };
}