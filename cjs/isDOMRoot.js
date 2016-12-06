Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isDOMRoot;

var _inDOM = require('./inDOM');

var _inDOM2 = _interopRequireDefault(_inDOM);

var _isDOMElement = require('./isDOMElement');

var _isDOMElement2 = _interopRequireDefault(_isDOMElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Is the given object root node of the DOM
 * @param {Object} obj - The object to check
 * @return {Boolean} - Is it the root node of the DOM or not
 */
function isDOMRoot(obj) {
  return (0, _isDOMElement2.default)(obj) && (0, _inDOM2.default)(obj) && !obj.parentElement;
}