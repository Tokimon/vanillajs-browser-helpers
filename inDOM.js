import isDOMNode from './isDOMNode';

/**
 * Is the given DOM node inserted into the DOM
 * @param {HTMLElement} elm - The element to check
 * @return {Boolean} - Is it a DOM node in the DOM or not
 */
export default function inDOM(elm) {
  return isDOMNode(elm) && !!(elm.offsetParent || elm.offsetHeight || elm.offsetWidth);
}
