import isDOMChildNode from './isDOMChildNode';



/**
 * Get all the siblings before a given element
 * @function siblingsBefore
 * @param {HTMLElement} elm - The HTMLElement to find the siblings of
 * @return {Array} The siblings before the given element
 */
export function siblingsBefore(elm) {
  const siblings = [];

  if (isDOMChildNode(elm)) {
    let sibling = elm.previousElementSibling;

    while (sibling) {
      siblings.push(sibling);
      sibling = sibling.previousElementSibling;
    }

    siblings.reverse();
  }

  return siblings;
}



/**
 * Get all the siblings after a given element
 * @function siblingsAfter
 * @param {HTMLElement} elm - The HTMLElement to find the siblings of
 * @return {Array} The siblings after the given element
 */
export function siblingsAfter(elm) {
  const siblings = [];

  if (isDOMChildNode(elm)) {
    let sibling = elm.nextElementSibling;

    while (sibling) {
      siblings.push(sibling);
      sibling = sibling.nextElementSibling;
    }
  }

  return siblings;
}



/**
 * Get all sibling elements of a given DOM element
 * @function siblings
 * @param {HTMLElement} elm - DOM element to find siblings of
 * @return {HTMLElement[]} Collection of sibling elements
 */
export default function siblings(elm) {
  return siblingsBefore(elm).concat(siblingsAfter(elm));
}
