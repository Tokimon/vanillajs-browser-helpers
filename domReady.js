import _once from './once';
import isFunction from 'vanillajs-helpers/isFunction';



/**
 * Build a method that executes a given function once the document has finished loading
 * @function domReadyBuilder
 * @param {Function} once - The 'once' (single trigger event) method to use
 * @return {Function} The 'domReady' method using the given once method
 */
export function domReadyBuilder(once = _once) {
  if(!isFunction(once)) { return null; }

  return (handler) => {
    if(!isFunction(handler)) { return; }
    if(document.readyState === 'complete') { return handler(); }
    return once(document, 'DOMContentLoaded', () => handler());
  };
}



/**
 * Execute a given function once the document has finished loading
 * @function domReady
 * @param {Function} handler - Function to execute once the document has finished loading
 * @return {Function} The 'once' event handler (so it may be removed again)
 */
const domReady = domReadyBuilder();
export default domReady;
