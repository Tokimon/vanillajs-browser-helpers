import isFunction from 'vanillajs-helpers/isFunction';
import once from './once';



function docComplete() {
  const { readyState } = document;
  return readyState === 'interactive' || readyState === 'complete';
}



/**
 * Execute a given function once the document has finished loading
 * @function domReady
 * @param {Function} handler - Function to execute once the document has finished loading
 * @return {Function} The 'once' event handler (so it may be removed again)
 */
export default function domReady(handler) {
  if (!isFunction(handler)) { return; }
  if (docComplete()) { return handler(); }
  return once('readystatechange', handler, { when: docComplete });
}
