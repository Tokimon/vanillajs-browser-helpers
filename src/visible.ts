import invisible from './invisible';

/**
 * Test if a given DOM element is visible.
 *
 * @param elm - DOM element to test
 * @return Is the element visible for the user
 */
export default function visible(elm: HTMLElement): boolean {
  return !invisible(elm);
}
