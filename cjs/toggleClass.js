'use strict';

exports.default = toggle;

var _isString = require('vanillajs-helpers/isString');

var _isString2 = _interopRequireDefault(_isString);

var _isArray = require('vanillajs-helpers/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _isBoolean = require('vanillajs-helpers/isBoolean');

var _isBoolean2 = _interopRequireDefault(_isBoolean);

var _isDOMElement = require('./isDOMElement');

var _isDOMElement2 = _interopRequireDefault(_isDOMElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Toggles (add/remove) one or multiple class names on a DOM element
 * @param {HTMLElement} elm - DOM element to toggle class names from
 * @param {String|Array<String>} classNames - Class names to toggle
 * @param {Boolean} force - Force to add or remove (true = add, false = remove)
 */
function toggle(elm, classNames, force) {
  if ((0, _isString2.default)(classNames)) {
    classNames = classNames.split(/\s+/);
  }
  if (!(0, _isDOMElement2.default)(elm) || !(0, _isArray2.default)(classNames)) {
    return elm;
  }

  // Some Browsers requires the method to not be called with the force paramter if it is not a boolean
  force = (0, _isBoolean2.default)(force) ? [force] : [];
  classNames.forEach(cn => elm.classList.toggle(cn, ...force));

  return elm;
}