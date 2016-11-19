import isDOMContainer from './isDOMContainer';

/**
 * Find the children of a given HTML Element
 * @param  {HTMLElement} [elm=document.body] - HTML Element to find children from
 * @return {Array<HTMLElement>} - List of found child HTML Elements
 */
export default function children(elm = document.body) {
  return isDOMContainer(elm) ? Array.from(elm.children) : [];
}
