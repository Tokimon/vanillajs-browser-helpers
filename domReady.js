import _once from './once';
import isFunction from './isFunction';




/**
 * Build a method that executes a given function once the document has finished loading
 * @param  {Function} once - The 'once' (single trigger event) method to use
 * @return {Function} - The 'domReady' method using the given once method
 */
export function domReadyBuilder(once = _once) {
  if(!isFunction(once)) { return null; }

  return (cb) => {
    if(!isFunction(cb)) { return; }
    if(document.readyState === 'complete') { return cb(); }
    once(document, 'DOMContentLoaded', () => cb());
  }
}




/**
 * Execute a given function once the document has finished loading
 * @param  {Function} cb - Function to execute once the document has finished loading
 */
const domReady = domReadyBuilder();
export default domReady;
