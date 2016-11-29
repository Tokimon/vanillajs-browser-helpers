'use strict';

exports.default = findByQuery;

var _isBoolean = require('vanillajs-helpers/isBoolean');

var _isBoolean2 = _interopRequireDefault(_isBoolean);

var _isString = require('vanillajs-helpers/isString');

var _isString2 = _interopRequireDefault(_isString);

var _isArray = require('vanillajs-helpers/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findByQuery(queries, elm = document, first = false) {
  // Correct variables if 'elm' is omitted but 'first' isn't
  if ((0, _isBoolean2.default)(elm)) {
    [elm, first] = [document, elm];
  }
  // If we got an array, filter out bad queries and convert to a string
  if ((0, _isArray2.default)(queries)) {
    queries = queries.filter(query => (0, _isString2.default)(query)).join(',');
  }
  // Query must be string at this point
  if (!(0, _isString2.default)(queries)) {
    return first ? null : [];
  }

  // 'elm' must be an object with the 'querySelector' implementation
  if (!elm || !elm.querySelector) {
    elm = document;
  }

  try {
    return first ? elm.querySelector(queries) : Array.from(elm.querySelectorAll(queries));
  } catch (ex) {
    return first ? null : [];
  }
}