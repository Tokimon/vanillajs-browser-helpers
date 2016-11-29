'use strict';

exports.default = visible;

var _invisible = require('./invisible');

var _invisible2 = _interopRequireDefault(_invisible);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Test if a given HTML element is visibile.
 * @param  {HTMLElement} elm - HTML element to test
 * @return {Boolean} - Is the element visible for the user
 */
function visible(elm) {
  return !(0, _invisible2.default)(elm);
}