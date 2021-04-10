import isString from 'vanillajs-helpers/isString';

import ensureHTML from './ensureHTML';



/**
 * Append DOM element or plain HTML to the beginning of a given DOM element
 * 
 * @param elm - The DOM element to append to
 * @param insertElm - DOM element or HTML (or selector) to append to insert
 * @return The inserted child element
 */
export default function append(elm: Element, insertElm: string | Node) {
  if (isString(insertElm)) {
    elm.insertAdjacentHTML('afterbegin', ensureHTML(insertElm));
  } else {
    elm.prepend(insertElm);
  }

  return elm.firstElementChild;
}
