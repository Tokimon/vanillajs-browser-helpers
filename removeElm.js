import isDOMChildNode from './isDOMChildNode';

/**
 * Remove a given DOM element from the DOM
 * @param  {HTMLElement} elm - The DOM element to remove
 */
export default function removeElm(elm) {
  if(isDOMChildNode(elm)) { elm.parentNode.removeChild(elm); }
}
