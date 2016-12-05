'use strict';

exports.default = append;

var _isString = require('vanillajs-helpers/isString');

var _isString2 = _interopRequireDefault(_isString);

var _isDOMNode = require('./isDOMNode');

var _isDOMNode2 = _interopRequireDefault(_isDOMNode);

var _isDOMContainer = require('./isDOMContainer');

var _isDOMContainer2 = _interopRequireDefault(_isDOMContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Append DOM element or plain HTML to the end of a given DOM element
 * @param  {HTMLElement} elm - The DOM element to append to
 * @param  {String|HTMLElement} insertElm - DOM element or String to append to the {elm}
 */
function append(elm, insertElm) {
  if (!(0, _isDOMContainer2.default)(elm)) {
    return null;
  }

  if ((0, _isDOMNode2.default)(insertElm)) {
    elm.appendChild(insertElm);
  } else if ((0, _isString2.default)(insertElm)) {
    elm.insertAdjacentHTML('beforeend', insertElm);
  } else {
    return null;
  }

  return elm.lastChild;
}