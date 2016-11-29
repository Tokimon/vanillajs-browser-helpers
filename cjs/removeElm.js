'use strict';

exports.default = removeElm;

var _isDOMChildNode = require('./isDOMChildNode');

var _isDOMChildNode2 = _interopRequireDefault(_isDOMChildNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Remove a given HTML Element from the DOM
 * @param  {HTMLElement} elm - The HTML Element to remove
 */
function removeElm(elm) {
  if ((0, _isDOMChildNode2.default)(elm)) {
    elm.parentNode.removeChild(elm);
  }
}