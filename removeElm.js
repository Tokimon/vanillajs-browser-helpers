import isDOMChildNode from './isDOMChildNode';

/**
 * Remove a given HTML Element from the DOM
 * @param  {HTMLElement} elm - The HTML Element to remove
 */
export default function removeElm(elm) {
  if(isDOMChildNode(elm)) { elm.parentNode.removeChild(elm); }
}
