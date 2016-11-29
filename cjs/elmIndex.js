'use strict';

exports.default = elmIndex;

var _isDOMChildNode = require('./isDOMChildNode');

var _isDOMChildNode2 = _interopRequireDefault(_isDOMChildNode);

var _children = require('./children');

var _children2 = _interopRequireDefault(_children);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Find the index of a HTML element amongst its siblings
 * @param  {HTMLElement} elm - HTML element to find the index of
 * @return {Number} - The index of {elm}
 */
function elmIndex(elm) {
  return (0, _isDOMChildNode2.default)(elm) ? (0, _children2.default)(elm.parentNode).indexOf(elm) : -1;
}