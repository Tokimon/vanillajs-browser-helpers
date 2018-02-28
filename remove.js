import isDOMChildNode from './isDOMChildNode';

/**
 * Remove a given DOM element from the DOM
 * @function remove
 * @param {HTMLElement} elm - The DOM element to remove
 * @return {HTMLElement} The given `elm` value
 */
export default function remove(elm) {
  return isDOMChildNode(elm) ? elm.parentNode.removeChild(elm) : elm;
}
