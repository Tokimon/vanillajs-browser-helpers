import isDOMChildNode from './isDOMChildNode';
import children from './children';

/**
 * Find the index of a DOM element amongst its siblings
 * @param  {HTMLElement} elm - DOM element to find the index of
 * @return {Number} - The index of {elm}
 */
export default function elmIndex(elm) {
  return isDOMChildNode(elm) ? children(elm.parentNode).indexOf(elm) : -1;
}
