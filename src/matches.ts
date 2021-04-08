import inDOM from './inDOM';



function fallback(this: Element, selector: string) {
  const matches = document.querySelectorAll(selector);
  let i = matches.length;
  while (--i >= 0 && matches.item(i) !== this) {} // eslint-disable-line no-empty
  return i > -1;
}



// Determine the supported method of 'matches' (with or without prefixes)
const ElmProto = Element.prototype;
const _match = ElmProto.matches || ElmProto.webkitMatchesSelector || fallback;



/**
 * Determines whether or not a DOM element matches a given CSS query selector
 *
 * @param elm - DOM element to test
 * @param selector - CSS selector {elm} should match
 * @return Whether or not {elm} matched the selector
 */
export default function matches(elm: Element, selector = ''): boolean {
  if (!inDOM(elm)) { return false; }
  return _match.call(elm, selector);
}
