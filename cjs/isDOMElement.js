'use strict';

exports.default = isDOMElement;

var _isArray = require('vanillajs-helpers/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isDOMElement(elm, ...tags) {
  const isElm = !!elm && elm.nodeType === 1;
  if (!isElm || !tags.length) {
    return isElm;
  }
  return ((0, _isArray2.default)(tags) ? tags : [tags]).indexOf(elm.tagName.toLowerCase()) > -1;
}