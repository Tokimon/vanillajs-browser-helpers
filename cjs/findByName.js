'use strict';

exports.default = findByName;

var _isString = require('vanillajs-helpers/isString');

var _isString2 = _interopRequireDefault(_isString);

var _isArray = require('vanillajs-helpers/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _iterate = require('vanillajs-helpers/iterate');

var _iterate2 = _interopRequireDefault(_iterate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findByName(names) {
  // Is it is a string split by comma (convert to Array)
  if ((0, _isString2.default)(names)) {
    names = names.split(/[\s,]+/);
  }

  // 'names' has to be an Array at this point
  if (!(0, _isArray2.default)(names)) {
    return [];
  }

  if (names.length < 2) {
    return Array.from(document.getElementsByName(names[0]));
  }

  return Array.from(names.reduce((set, name) => {
    (0, _iterate2.default)(document.getElementsByName(name), elm => set.add(elm));
    return set;
  }, new Set()));
}