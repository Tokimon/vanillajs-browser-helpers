import hidden from './hidden';

/**
 * Test if a given DOM element is invisibile.
 * @function invisibile
 * @param {HTMLElement} elm - DOM element to test
 * @return {Boolean} Is the element invisible
 */
export default function invisible(elm) {
  if(hidden(elm)) { return true; }

  // In collapsed or transparent elements we have to look at the element and its
  // parents to see if we find one that is invisible
  while(elm) {
    if(hidden(elm) || !Number(getComputedStyle(elm).opacity)) { return true; }
    elm = elm.parentElement;
  }

  return false;
}
