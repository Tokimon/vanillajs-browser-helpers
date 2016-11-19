import isDOMnode from './isDOMnode';

/**
 * Indicate if the element is in the DOM tree
 * @param  {HTMLElement} elm - HTML element to test
 * @return {Boolean} - Is the element in the DOM tree
 */
export default function isInDOM(elm) {
  return isDOMnode(elm) && !!(elm.offsetParent || elm.offsetHeight || elm.offsetWidth);
}
