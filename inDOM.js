import isDOMNode from './isDOMNode';



/**
 * Is the given DOM node inserted into the DOM
 *
 * @function inDOM
 * @param {HTMLElement} elm - The element to check
 * @return {Boolean} Is it a DOM node in the DOM or not
 */
export default function inDOM(elm) {
  return isDOMNode(elm) && document.contains(elm);
}
