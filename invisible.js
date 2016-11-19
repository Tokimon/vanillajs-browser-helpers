import hidden from './hidden';

/**
 * Test if a given HTML element is invisibile.
 * @param  {HTMLElement} elm - HTML element to test
 * @return {Boolean} - Is the element invisible
 */
export default function invisible(elm) {
  if(hidden(elm)) { return true; }

  // In collapsed or transparent elements we have to look at the element and its
  // paranets to see if we finde one that is invisible
  while(elm) {
    if(!elm.offsetHeight || !elm.offsetWidth || !Number(getComputedStyle(elm).opacity)) { return true; }
    elm = elm.parentElement;
  };

  return false;
}
