import isDOMChildNode from './isDOMChildNode';

/**
 * Remove a given DOM element from the DOM
 * @param {HTMLElement} elm - The DOM element to remove
 * @return {HTMLElement} - The given `elm` value
 */
export default function remove(elm) {
  if(isDOMChildNode(elm)) { return elm.parentNode.removeChild(elm); }
  return elm;
}
