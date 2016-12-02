import isDOMNode from './isDOMNode';

/**
 * Indicate if the element is in the DOM tree
 * @param  {HTMLElement} elm - DOM element to test
 * @return {Boolean} - Is the element in the DOM tree
 */
export default function inDOM(elm) {
  return isDOMNode(elm) && !!(elm.offsetParent || elm.offsetHeight || elm.offsetWidth);
}
