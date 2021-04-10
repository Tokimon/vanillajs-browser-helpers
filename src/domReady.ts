import once from './once';



export function docComplete() {
  const { readyState } = document;
  return readyState === 'interactive' || readyState === 'complete';
}



/**
 * Execute a given function once the document has finished loading
 * 
 * @param handler - Function to execute once the document has finished loading
 * 
 * @example
 * 
 * ```ts
 * domReady((e: Event) => { alert('DOM Ready') });
 * ```
 */
export default function domReady(handler: (...args: any[]) => void ): void {
  docComplete()
    ? handler()
    : once('readystatechange', handler, { when: docComplete });
}
