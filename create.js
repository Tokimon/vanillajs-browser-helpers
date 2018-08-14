import selectorToHTML from './selectorToHTML';
import toDOM from './toDOM';



/**
 * Creates an element from a given CSS selector (restricted to only one element)
 * @function create
 * @param  {String} selector - The CSS selector to convert
 * @return {HTMLElement} The converted element
 */
export default function create(selector) {
  return /^[a-z]+$/i.test(selector)
    ? document.createElement(selector)
    : toDOM(selectorToHTML(selector))[0];
}
