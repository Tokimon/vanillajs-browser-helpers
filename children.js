import isDOMContainer from './isDOMContainer';

/**
 * Find the children of a given DOM element
 * @function children
 * @param {HTMLElement} [elm=document.body] - DOM element to find children from
 * @return {HTMLElement[]} List of found child DOM elements
 */
export default function children(elm = document.body) {
  return isDOMContainer(elm) ? Array.from(elm.children) : [];
}
