'use strict';

exports.default = prepend;

var _isString = require('vanillajs-helpers/isString');

var _isString2 = _interopRequireDefault(_isString);

var _isDOMNode = require('./isDOMNode');

var _isDOMNode2 = _interopRequireDefault(_isDOMNode);

var _isDOMContainer = require('./isDOMContainer');

var _isDOMContainer2 = _interopRequireDefault(_isDOMContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Prepend HTML Element or plain HTML into a given HTML Element
 * @param  {HTMLElement} elm - The HTML Element to prepend into
 * @param  {string|HTMLElement} insertElm - HTML Element or String to prepend to the {elm}
 */
function prepend(elm, insertElm) {
  if (!(0, _isDOMContainer2.default)(elm)) {
    return;
  }
  if ((0, _isDOMNode2.default)(insertElm)) {
    elm.insertBefore(insertElm, elm.firstChild);
  } else if ((0, _isString2.default)(insertElm)) {
    elm.insertAdjacentHTML('afterbegin', insertElm);
  }
}