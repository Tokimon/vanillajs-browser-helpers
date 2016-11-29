'use strict';

exports.default = isInDOM;

var _isDOMnode = require('./isDOMnode');

var _isDOMnode2 = _interopRequireDefault(_isDOMnode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Indicate if the element is in the DOM tree
 * @param  {HTMLElement} elm - HTML element to test
 * @return {Boolean} - Is the element in the DOM tree
 */
function isInDOM(elm) {
  return (0, _isDOMnode2.default)(elm) && !!(elm.offsetParent || elm.offsetHeight || elm.offsetWidth);
}