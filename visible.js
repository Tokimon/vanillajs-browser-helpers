import invisible from './invisible';

/**
 * Test if a given DOM element is visibile.
 * @param  {HTMLElement} elm - DOM element to test
 * @return {Boolean} - Is the element visible for the user
 */
export default function visible(elm) {
  return !invisible(elm);
}
