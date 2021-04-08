import isString from 'vanillajs-helpers/isString';

import ensureHTML from './ensureHTML';



/**
 * Inserts DOM element or plain HTML after a given DOM element
 *
 * @param elm - The DOM element to insert elements after
 * @param insertElm - DOM element or HTML (or selector) to insert
 * @return The inserted element
 */
export default function insertAfter(elm: Element, insertElm: string | Element): Element | null {
  if (isString(insertElm)) {
    elm.insertAdjacentHTML('afterend', ensureHTML(insertElm));
  } else {
    elm.insertAdjacentElement('afterend', insertElm);
  }

  return elm.nextElementSibling;
}
