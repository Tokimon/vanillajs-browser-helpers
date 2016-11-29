'use strict';

exports.default = findByTagName;

var _isString = require('vanillajs-helpers/isString');

var _isString2 = _interopRequireDefault(_isString);

var _isArray = require('vanillajs-helpers/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findByTagName(tags, elm) {
  // Is it is a string split by comma (convert to Array)
  if ((0, _isString2.default)(tags)) {
    tags = tags.split(/[\s,]+/);
  }

  // Tag names has to be an Array
  if (!(0, _isArray2.default)(tags)) {
    return [];
  }

  // 'elm' must be an object with the 'getElementsByTagName' implementation
  if (!elm || !elm.getElementsByTagName) {
    elm = document;
  }

  try {
    if (tags.length < 2) {
      return Array.from(elm.getElementsByTagName(tags[0]));
    }

    return tags.reduce((arr, tag) => {
      return !(0, _isString2.default)(tag) ? arr : arr.concat(Array.from(elm.getElementsByTagName(tag)));
    }, []);
  } catch (ex) {
    return [];
  }
}