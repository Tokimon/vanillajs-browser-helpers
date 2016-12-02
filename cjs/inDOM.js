'use strict';

exports.default = inDOM;

var _isDOMNode = require('./isDOMNode');

var _isDOMNode2 = _interopRequireDefault(_isDOMNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Indicate if the element is in the DOM tree
 * @param  {HTMLElement} elm - DOM element to test
 * @return {Boolean} - Is the element in the DOM tree
 */
function inDOM(elm) {
  return (0, _isDOMNode2.default)(elm) && !!(elm.offsetParent || elm.offsetHeight || elm.offsetWidth);
}