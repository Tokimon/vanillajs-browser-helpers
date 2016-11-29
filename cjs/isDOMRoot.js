'use strict';

exports.default = isDOMRoot;

var _inDOM = require('./inDOM');

var _inDOM2 = _interopRequireDefault(_inDOM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isDOMRoot(elm) {
  return (0, _inDOM2.default)(elm) && !elm.parentElement;
}