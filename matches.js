import prefixed from './prefixed';
import inDOM from './inDOM';

// Determine the supported method of 'matches' (with or without prefixes)
const body = document.body;
const _matchMethod = body.matches || body[prefixed('MatchesSelector').filter((method) => !!body[method])[0]];

/**
 * Determines whether or not a HTML Element matches a given CSS query selector
 * @param  {HTML Element} elm - HTML Element to test
 * @param  {String} selector - CSS selector {elm} should match
 * @return {Boolean} - Whether or not {elm} matched the selector
 */
export default function matches(elm, selector = '') {
  if(!inDOM(elm)) { return false; }
  return _matchMethod.call(elm, selector);
}
