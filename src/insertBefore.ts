import isString from 'vanillajs-helpers/isString';

import ensureHTML from './ensureHTML';
import inDOM from './inDOM';
import isDOMElement from './isDOMElement';



/**
 * Inserts DOM element or plain HTML before a given DOM element
 *
 * @param elm - The DOM element to insert elements before
 * @param insertElm - DOM element or HTML (or selector) to insert
 * @return The inserted element
 */
export default function insertBefore(elm: Element, insertElm: string | Element): Element | null {
  if (!inDOM(elm) || isDOMElement(elm, 'html')) { return null; }

  if (isString(insertElm)) {
    (elm as Element).insertAdjacentHTML('beforebegin', ensureHTML(insertElm));
  } else {
    (elm as Element).insertAdjacentElement('beforebegin', insertElm);
  }

  return (elm as Element).previousElementSibling;
}
