import inDOM from './inDOM';
import isDOMElement from './isDOMElement';

/**
 * Is the given object root node of the DOM
 * @param {Object} obj - The object to check
 * @return {Boolean} - Is it the root node of the DOM or not
 */
export default function isDOMRoot(obj) {
  return isDOMElement(obj) && inDOM(obj) && !obj.parentElement;
}
