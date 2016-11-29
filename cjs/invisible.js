'use strict';

exports.default = invisible;

var _hidden = require('./hidden');

var _hidden2 = _interopRequireDefault(_hidden);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Test if a given HTML element is invisibile.
 * @param  {HTMLElement} elm - HTML element to test
 * @return {Boolean} - Is the element invisible
 */
function invisible(elm) {
  if ((0, _hidden2.default)(elm)) {
    return true;
  }

  // In collapsed or transparent elements we have to look at the element and its
  // paranets to see if we finde one that is invisible
  while (elm) {
    if (!elm.offsetHeight || !elm.offsetWidth || !Number(getComputedStyle(elm).opacity)) {
      return true;
    }
    elm = elm.parentElement;
  }

  return false;
}