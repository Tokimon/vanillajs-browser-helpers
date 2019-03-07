import inDOM from './inDOM';



/**
 * Test if a given DOM element is technically hidden
 * - Not is DOM
 * - Collapsed
 * - display: none
 * - visibility: hidden.
 * @function hidden
 * @param {HTMLElement} elm - DOM element to test
 * @return {Boolean} Is the element technically hidden or not
 */
export default function hidden(elm) {
  return !inDOM(elm) ||
    !(elm.offsetHeight || elm.offsetWidth) ||
    getComputedStyle(elm).visibility === 'hidden';
}
