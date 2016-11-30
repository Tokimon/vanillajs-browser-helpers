'use strict';

exports.default = after;

var _isString = require('vanillajs-helpers/isString');

var _isString2 = _interopRequireDefault(_isString);

var _isDOMNode = require('./isDOMNode');

var _isDOMNode2 = _interopRequireDefault(_isDOMNode);

var _isDOMChildNode = require('./isDOMChildNode');

var _isDOMChildNode2 = _interopRequireDefault(_isDOMChildNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Inserts DOM Element or plain HTML after a given DOM Element
 * @param  {HTMLElement} elm - The DOM Element to insert after
 * @param  {String|HTMLElement} insertElm - DOM Element or HTML to insert
 */
function after(elm, insertElm) {
  if (!(0, _isDOMChildNode2.default)(elm)) {
    return;
  }
  if ((0, _isDOMNode2.default)(insertElm)) {
    elm.parentNode.insertBefore(insertElm, elm.nextSibling);
  } else if ((0, _isString2.default)(insertElm)) {
    elm.insertAdjacentHTML('afterend', insertElm);
  }
}