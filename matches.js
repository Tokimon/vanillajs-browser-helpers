import prefixed from './prefixed';
import inDOM from './inDOM';

// Determine the supported method of 'matches' (with or without prefixes)
const _matchMethod = Element.matches ||
  Element.matchesSelector ||
  Element[prefixed('MatchesSelector').filter((method) => !!Element[method])[0]];

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
