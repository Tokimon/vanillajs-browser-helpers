'use strict';

exports.default = isDOMContainer;

var _isDOMDocument = require('./isDOMDocument');

var _isDOMDocument2 = _interopRequireDefault(_isDOMDocument);

var _isDOMNode = require('./isDOMNode');

var _isDOMNode2 = _interopRequireDefault(_isDOMNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isDOMContainer(elm) {
  return (0, _isDOMNode2.default)(elm) && (elm.nodeType === 1 || elm.nodeType === 11);
}