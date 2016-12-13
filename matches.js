import prefixed from './prefixed';
import inDOM from './inDOM';

// Determine the supported method of 'matches' (with or without prefixes)
function fallback(selector) {
  const matches = document.querySelectorAll(selector);
  let i = matches.length;
  while(--i >= 0 && matches.item(i) !== this) {}
  return i > -1;
}

const _matchMethod = Element.matches ||
  Element.matchesSelector ||
  Element[prefixed('MatchesSelector').filter((method) => !!Element[method])[0]] ||
  fallback;

/**
 * Determines whether or not a DOM element matches a given CSS query selector
 * @param  {DOM element} elm - DOM element to test
 * @param  {String} selector - CSS selector {elm} should match
 * @return {Boolean} - Whether or not {elm} matched the selector
 */
export default function matches(elm, selector = '') {
  if(!inDOM(elm)) { return false; }
  return _matchMethod.call(elm, selector);
}
