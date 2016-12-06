Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isDOMNode;
/**
 * Is the given object a DOM node
 * @param {Object} obj - The object to check
 * @return {Boolean} - Is it a DOM node or not
 */
function isDOMNode(obj) {
  return obj instanceof Node;
}