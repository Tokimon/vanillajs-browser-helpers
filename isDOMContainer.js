import isDOMElement from './isDOMElement';
import isDOMFragment from './isDOMFragment';

/**
 * Is the given object a DOM node that can contain child DOM nodes
 * @function isDOMContainer
 * @param {Object} obj - The object to check
 * @return {Boolean} Is it a DOM container or not
 */
export default function isDOMContainer(obj) {
  return isDOMElement(obj) || isDOMFragment(obj);
}
