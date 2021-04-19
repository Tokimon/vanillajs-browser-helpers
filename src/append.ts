import isString from 'vanillajs-helpers/isString';

import ensureHTML from './ensureHTML';



/**
 * Append DOM element or plain HTML to the end of a given DOM element
 *
 * @param elm - The DOM element to append to
 * @param insertElm - DOM element or HTML (or selector) to append to insert
 * @return The inserted child element
 */
export default function append(elm: Element, insertElm: string | Node): Element | null {
  if (!elm) { return null; }

  if (isString(insertElm)) {
    elm.insertAdjacentHTML('beforeend', ensureHTML(insertElm));
  } else {
    elm.append(insertElm);
  }

  return elm.lastElementChild;
}
