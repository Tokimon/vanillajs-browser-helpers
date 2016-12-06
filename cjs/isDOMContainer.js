Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isDOMContainer;

var _isDOMElement = require('./isDOMElement');

var _isDOMElement2 = _interopRequireDefault(_isDOMElement);

var _isDOMFragment = require('./isDOMFragment');

var _isDOMFragment2 = _interopRequireDefault(_isDOMFragment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Is the given object a DOM node that can contain child DOM nodes
 * @param {Object} obj - The object to check
 * @return {Boolean} - Is it a DOM container or not
 */
function isDOMContainer(obj) {
  return (0, _isDOMElement2.default)(obj) || (0, _isDOMFragment2.default)(obj);
}