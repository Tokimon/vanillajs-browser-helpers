'use strict';

exports.default = remove;

var _isDOMChildNode = require('./isDOMChildNode');

var _isDOMChildNode2 = _interopRequireDefault(_isDOMChildNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Remove a given DOM element from the DOM
 * @param {HTMLElement} elm - The DOM element to remove
 * @return {HTMLElement} - The given `elm` value
 */
function remove(elm) {
  if ((0, _isDOMChildNode2.default)(elm)) {
    return elm.parentNode.removeChild(elm);
  }
  return elm;
}