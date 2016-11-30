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
 * Finds the size of a DOM Element or window.
 * @param  {HTMLElement|window} [elm = viewport] - The HTML element (or window) to find the size of
 * @return {Object} - Object describing the various sizes of an element
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