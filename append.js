import isString from 'vanillajs-helpers/isString';

import isDOMNode from './isDOMNode';
import isDOMContainer from './isDOMContainer';
import selectorToHTML from './selectorToHTML';



/**
 * Append DOM element or plain HTML to the end of a given DOM element
 * @function addClass
 * @param {HTMLElement} elm - The DOM element to append to
 * @param {String|HTMLElement} insertElm - DOM element or String to append to the {elm}
 * @return {HTMLElement|null} The inserted child element
 */
export default function append(elm, insertElm) {
  if(!isDOMContainer(elm)) { return null; }

  if(isDOMNode(insertElm)) {
    elm.appendChild(insertElm);
  } else if(isString(insertElm)) {
    if(insertElm.indexOf('<') < 0) {
      insertElm = selectorToHTML(insertElm);
    }

    elm.insertAdjacentHTML('beforeend', insertElm);
  } else {
    return null;
  }

  return elm.lastChild;
}
