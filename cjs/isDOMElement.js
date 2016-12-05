'use strict';

exports.default = isDOMElement;

var _isString = require('vanillajs-helpers/isString');

var _isString2 = _interopRequireDefault(_isString);

var _isArray = require('vanillajs-helpers/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Is the given object a DOM element node and of a given type
 * @param {Object} obj - The object to check
 * @param  {String|Array<String>} [tags] - Tag name to match
 * @return {Boolean} - Is it a DOM element node or not and of the right type
 */
function isDOMElement(obj, tags) {
  const isElm = obj instanceof Element;
  if ((0, _isString2.default)(tags)) {
    tags = tags.split(/[ ,]+/);
  }
  if (!isElm || !(0, _isArray2.default)(tags)) {
    return isElm;
  }
  const tagname = obj.tagName.toLowerCase();
  return tags.some(tag => tag.toLowerCase() === tagname);
}