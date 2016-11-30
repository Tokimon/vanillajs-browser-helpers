'use strict';

exports.default = children;

var _isDOMContainer = require('./isDOMContainer');

var _isDOMContainer2 = _interopRequireDefault(_isDOMContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Find the children of a given DOM Element
 * @param  {HTMLElement} [elm=document.body] - DOM Element to find children from
 * @return {Array<HTMLElement>} - List of found child DOM Elements
 */
function children(elm = document.body) {
  return (0, _isDOMContainer2.default)(elm) ? Array.from(elm.children) : [];
}