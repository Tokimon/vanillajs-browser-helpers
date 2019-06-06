import isDOMChildNode from './isDOMChildNode';
import children from './children';



/**
 * Get all sibling elements of a given DOM element
 * @function siblings
 * @param {HTMLElement} elm - DOM element to find siblings of
 * @return {HTMLElement[]} Collection of sibling elements
 */
export default function siblings(elm) {
  if (!isDOMChildNode(elm)) { return []; }
  return children(elm.parentNode).filter((child) => child !== elm);
}



/**
 * Get the next sibling element of a DOM element
 * @function next
 * @param {HTMLElement} elm - The HTMLElement to find the sibling of
 * @return {HTMLElement|null} The next sibling element or null
 */
export function next(elm) {
  return isDOMChildNode(elm) ? elm.nextElementSibling : null;
}



/**
 * Get the previous sibling element of a DOM element
 * @function prev
 * @param {HTMLElement} elm - The HTMLElement to find the sibling of
 * @return {HTMLElement|null} The previous sibling element
 */
export function prev(elm) {
  return isDOMChildNode(elm) ? elm.previousElementSibling : null;
}
