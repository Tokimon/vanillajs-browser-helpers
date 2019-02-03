import vendorPrefixed from './vendorPrefixed';
import inDOM from './inDOM';

function fallback(selector) {
  const matches = document.querySelectorAll(selector);
  let i = matches.length;
  while (--i >= 0 && matches.item(i) !== this) {} // eslint-disable-line no-empty
  return i > -1;
}

// Determine the supported method of 'matches' (with or without prefixes)
const _match = Element.matches ||
  Element.matchesSelector ||
  Element[vendorPrefixed('MatchesSelector').filter((method) => !!Element[method])[0]] ||
  fallback;

/**
 * Determines whether or not a DOM element matches a given CSS query selector
 *
 * @function matches
 * @param {DOM element} elm - DOM element to test
 * @param {String} selector - CSS selector {elm} should match
 * @return {Boolean} Whether or not {elm} matched the selector
 */
export default function matches(elm, selector = '') {
  if (!inDOM(elm)) { return false; }
  return _match.call(elm, selector);
}
