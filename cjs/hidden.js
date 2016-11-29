'use strict';

exports.default = hidden;

var _inDOM = require('./inDOM');

var _inDOM2 = _interopRequireDefault(_inDOM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Test if a given HTML element is technically hidden ('display:none' or 'visibility: hidden').
 * @param  {HTMLElement} elm - HTML element to test
 * @return {Boolean} - Is the element technically hidden or not
 */
function hidden(elm) {
  return !(0, _inDOM2.default)(elm) || !(elm.offsetHeight || elm.offsetWidth) || getComputedStyle(elm).visibility === 'hidden';
}