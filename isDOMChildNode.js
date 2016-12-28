import isDOMNode from './isDOMNode';
import isDOMElement from './isDOMElement';

/**
 * Is the given object a DOM node the child of a DOM element
 * @function isDOMChildNode
 * @param {Object} obj - The object to check
 * @return {Boolean} Is it a DOM child node or not
 */
export default function isDOMChildNode(obj) {
  return isDOMNode(obj) && isDOMElement(obj.parentNode);
}
