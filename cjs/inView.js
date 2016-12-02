'use strict';

exports.default = inView;

var _isDOMChildNode = require('./isDOMChildNode');

var _isDOMChildNode2 = _interopRequireDefault(_isDOMChildNode);

var _hidden = require('./hidden');

var _hidden2 = _interopRequireDefault(_hidden);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Determines whether the element is in the area of the viewport or not.
 * @param  {HTMLElement} elm - DOM element to test
 * @param  {Number} [threshold = 0] - The distance to the edge of the viwport before
 *                                    the element is no longer visible in the viewport area
 *
 * @return {Boolean|Object} - If the element is in the viewport area it returns true,
 *                            otherwise it returns an object with indications of
 *                            where the element is compared to the viewport area
 */
function inView(elm, threshold = 0) {
  if (!(0, _isDOMChildNode2.default)(elm) || (0, _hidden2.default)(elm)) {
    return false;
  }

  const rect = elm.getBoundingClientRect();
  const vpWidth = window.innerWidth;
  const vpHeight = window.innerHeight;

  // Determine if the element is on screen
  const above = rect.bottom - threshold <= 0;
  const below = rect.top - vpHeight + threshold >= 0;
  const left = rect.right - threshold <= 0;
  const right = rect.left - vpWidth + threshold >= 0;

  // If it is on screen return true
  if (!above && !below && !left && !right) {
    return true;
  }

  // Otherwise return an object saying where the element is compared to the viewport
  return { above, below, left, right };
}