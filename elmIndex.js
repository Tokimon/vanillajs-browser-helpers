import children from './children';
import isDOMChildNode from './isDOMChildNode';



/**
 * Find the index of a DOM element amongst its siblings
 * @function elmIndex
 * @param {HTMLElement} elm - DOM element to find the index of
 * @return {Number} The index of `elm`
 */
export default function elmIndex(elm) {
  return isDOMChildNode(elm)
    ? children(elm.parentNode).indexOf(elm)
    : -1;
}
