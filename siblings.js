import isDOMChildNode from './isDOMChildNode';
import children from './children';

/**
 * Get all sibling elements of a given HTML element
 * @param  {HTMLElement} elm - HTML element to find siblings of
 * @return {Array<HTMLElement>} - Collection of sibling elements
 */
export default function siblings(elm) {
  if(!isDOMChildNode(elm)) { return []; }
  return children(elm.parentNode).filter((child) => child !== elm);
}




/**
 * Get the next sibling element of a HTML element
 * @param  {HTMLElement} elm - The HTMLElement to find the sibling of
 * @return {HTMLElement|null} - The next sibling element or null
 */
export function next(elm) {
  return isDOMChildNode(elm) ? elm.nextElementSibling : null;
}




/**
 * Get the previous sibling element of a HTML element
 * @param  {HTMLElement} elm - The HTMLElement to find the sibling of
 * @return {[type]} - The previous sibling element or null
 */
export function prev(elm) {
  return isDOMChildNode(elm) ? elm.previousElementSibling : null;
}
