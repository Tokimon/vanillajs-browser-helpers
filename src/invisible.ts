import hidden from './hidden';

/**
 * Test if a given DOM element is invisible.
 *
 * @param elm - DOM element to test
 * @return Is the element invisible
 */
export default function invisible(elm: HTMLElement): boolean {
  let checkElm: HTMLElement | null = elm;

  while (checkElm) {
    if (
      hidden(checkElm)
      || !elm.offsetHeight
      || !elm.offsetWidth
      || !Number(getComputedStyle(elm).opacity)
    ) {
      return true;
    }

    checkElm = checkElm.parentElement;
  }

  return false;
}
