'use strict';

exports.default = before;

var _isString = require('vanillajs-helpers/isString');

var _isString2 = _interopRequireDefault(_isString);

var _isDOMNode = require('./isDOMNode');

var _isDOMNode2 = _interopRequireDefault(_isDOMNode);

var _isDOMChildNode = require('./isDOMChildNode');

var _isDOMChildNode2 = _interopRequireDefault(_isDOMChildNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Inserts DOM element or plain HTML before a given DOM element
 * @param  {HTMLElement} elm - The DOM element to insert {insertElm} before
 * @param  {String|HTMLElement} insertElm - DOM element or String to insert before the {elm}
 */
function before(elm, insertElm) {
  if (!(0, _isDOMChildNode2.default)(elm)) {
    return;
  }
  if ((0, _isDOMNode2.default)(insertElm)) {
    elm.parentNode.insertBefore(insertElm, elm);
  } else if ((0, _isString2.default)(insertElm)) {
    elm.insertAdjacentHTML('beforebegin', insertElm);
  }
}