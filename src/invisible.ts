import hidden from './hidden';

/**
 * Test if a given DOM element is invisible.
 *
 * @param elm - DOM element to test
 * @return Is the element invisible
 */
export default function invisible(elm: HTMLElement): boolean {
  let checkElm: HTMLElement | null = elm;

  while (checkElm && checkElm.tagName !== 'BODY') {
    if (
      hidden(checkElm)
      || !checkElm.offsetHeight
      || !checkElm.offsetWidth
      || !Number(getComputedStyle(checkElm).opacity)
    ) {
      return true;
    }

    checkElm = checkElm.parentElement;
  }

  return false;
}
