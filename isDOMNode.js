/**
 * Is the given object a DOM node
 * @function isDOMNode
 * @param {Object} obj - The object to check
 * @return {Boolean} Is it a DOM node or not
 */
export default function isDOMNode(obj) {
  return obj instanceof Node;
}
