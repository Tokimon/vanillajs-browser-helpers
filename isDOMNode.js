/**
 * Is the given object a Element, Text or Comment Node in the DOM
 *
 * @function isDOMNode
 * @param {Object} obj - The object to check
 * @return {Boolean} Is it a DOM node or not
 */
export default function isDOMNode(obj) {
  const type = (obj || {}).nodeType;
  return !!type && (type === Node.ELEMENT_NODE || type === Node.TEXT_NODE || type === Node.COMMENT_NODE);
}
