Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isDOMChildNode;

var _isDOMNode = require('./isDOMNode');

var _isDOMNode2 = _interopRequireDefault(_isDOMNode);

var _isDOMElement = require('./isDOMElement');

var _isDOMElement2 = _interopRequireDefault(_isDOMElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Is the given object a DOM node the child of a DOM element
 * @param {Object} obj - The object to check
 * @return {Boolean} - Is it a DOM child node or not
 */
function isDOMChildNode(obj) {
  return (0, _isDOMNode2.default)(obj) && (0, _isDOMElement2.default)(obj.parentNode);
}