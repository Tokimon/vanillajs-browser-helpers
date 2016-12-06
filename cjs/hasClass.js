Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hasClass;
exports.hasAnyClass = hasAnyClass;

var _isDOMElement = require('./isDOMElement');

var _isDOMElement2 = _interopRequireDefault(_isDOMElement);

var _isString = require('vanillajs-helpers/isString');

var _isString2 = _interopRequireDefault(_isString);

var _isArray = require('vanillajs-helpers/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Does all (or any) of the listed class names exist in the DOM elements list of class names
 * @param  {DOM element} elm - DOM element to test
 * @param  {String|Array<String>} classNames - Class names to test
 * @param  {Boolean} [any] - Test if at least one class name exist
 * @return {Boolean} - All/any class name listed were found in the elements list of class names
 */
function hasClass(elm, classNames, any = false) {
  if ((0, _isString2.default)(classNames)) {
    classNames = classNames.split(/\s+/);
  }
  if (!(0, _isDOMElement2.default)(elm) || !(0, _isArray2.default)(classNames)) {
    return false;
  }
  return classNames[any ? 'some' : 'every'](cn => elm.classList.contains(cn));
}

function hasAnyClass(elm, classNames) {
  return hasClass(elm, classNames, true);
}