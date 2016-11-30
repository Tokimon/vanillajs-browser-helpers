import isDOMContainer from './isDOMContainer';

/**
 * Find the children of a given DOM Element
 * @param  {HTMLElement} [elm=document.body] - DOM Element to find children from
 * @return {Array<HTMLElement>} - List of found child DOM Elements
 */
export default function children(elm = document.body) {
  return isDOMContainer(elm) ? Array.from(elm.children) : [];
}
