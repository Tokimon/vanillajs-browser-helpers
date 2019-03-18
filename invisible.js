import hidden from './hidden';

/**
 * Test if a given DOM element is invisibile.
 *
 * @function invisibile
 * @param {HTMLElement} elm - DOM element to test
 * @return {Boolean} Is the element invisible
 */
export default function invisible(elm) {
  do {
    if (
      hidden(elm) ||
      !elm.offsetHeight ||
      !elm.offsetWidth ||
      !Number(getComputedStyle(elm).opacity)
    ) {
      return true;
    }

    elm = elm.parentElement;
  } while (elm);

  return false;
}
