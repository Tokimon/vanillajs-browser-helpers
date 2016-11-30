import isDOMChildNode from './isDOMChildNode';

/**
 * Remove a given DOM Element from the DOM
 * @param  {HTMLElement} elm - The DOM Element to remove
 */
export default function removeElm(elm) {
  if(isDOMChildNode(elm)) { elm.parentNode.removeChild(elm); }
}
