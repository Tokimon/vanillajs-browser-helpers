'use strict';

exports.default = removeCLass;

var _isDOMElement = require('./isDOMElement');

var _isDOMElement2 = _interopRequireDefault(_isDOMElement);

var _isString = require('vanillajs-helpers/isString');

var _isString2 = _interopRequireDefault(_isString);

var _isArray = require('vanillajs-helpers/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Remove one or multiple class names from a HTML Element
 * @param {HTMLElement} elm - HTML ELement to remove class names from
 * @param {String|Array<String>} classNames - Class names to remove
 */
function removeCLass(elm, classNames) {
  if ((0, _isString2.default)(classNames)) {
    classNames = classNames.split(/\s+/);
  }
  if (!(0, _isDOMElement2.default)(elm) || !(0, _isArray2.default)(classNames)) {
    return false;
  }
  classNames.forEach(cn => elm.classList.remove(cn));
}