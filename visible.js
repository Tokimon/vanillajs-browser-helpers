import invisible from './invisible';

/**
 * Test if a given HTML element is visibile.
 * @param  {HTMLElement} elm - HTML element to test
 * @return {Boolean} - Is the element visible for the user
 */
export default function visible(elm) {
  return !invisible(elm);
}
