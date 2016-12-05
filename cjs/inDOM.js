'use strict';

exports.default = inDOM;

var _isDOMNode = require('./isDOMNode');

var _isDOMNode2 = _interopRequireDefault(_isDOMNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Is the given DOM node inserted into the DOM
 * @param {HTMLElement} elm - The element to check
 * @return {Boolean} - Is it a DOM node in the DOM or not
 */
function inDOM(elm) {
  return (0, _isDOMNode2.default)(elm) && !!(elm.offsetParent || elm.offsetHeight || elm.offsetWidth);
}