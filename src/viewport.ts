import isDOMDocument from './isDOMDocument';
import isWindow from './isWindow';



const scrollingElementFallback = (doc: Document) =>
  doc.compatMode === 'BackCompat'
    ? doc.body
    : doc.documentElement;



/**
 * Get the current viewport element (scrolling element) of the current document, from a given element
 *
 * @param doc - Element to find the viewport element from
 * @return The viewport element
 *
 * @example
 *
 * ```ts
 * // Get the viewport of the current document
 * viewport();
 *
 * // Get the viewport of the current window
 * viewport(window);
 *
 * // Get the viewport of a given element
 * viewport(someElementInSomeDocument);
 * ```
 */
export default function viewport(elm?: Element | Document | Window): HTMLElement {
  if (isWindow(elm)) {
    elm = elm.document;
  }

  if (!isDOMDocument(elm)) {
    elm = elm
      ? elm.ownerDocument
      : document;
  }

  return elm.scrollingElement as HTMLElement || scrollingElementFallback(elm);
}
