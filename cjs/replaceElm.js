'use strict';

exports.default = replaceElm;

var _isString = require('vanillajs-helpers/isString');

var _isString2 = _interopRequireDefault(_isString);

var _isDOMNode = require('./isDOMNode');

var _isDOMNode2 = _interopRequireDefault(_isDOMNode);

var _isDOMChildNode = require('./isDOMChildNode');

var _isDOMChildNode2 = _interopRequireDefault(_isDOMChildNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Replace a given DOM Element with another DOM Element or plain HTML string
 * @param  {HTMLElement} elm - DOM Element to replace
 * @param  {HTMLElement|String} replacement - DOM Element or plain HTML string to replace {elm}
 */
function replaceElm(elm, replacement) {
  if (!(0, _isDOMChildNode2.default)(elm)) {
    return;
  }

  if ((0, _isString2.default)(replacement)) {
    elm.outerHTML = replacement;
  } else if ((0, _isDOMNode2.default)(replacement)) {
    elm.parentNode.replaceChild(replacement, elm);
  }
}