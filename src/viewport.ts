import type { GeneralWindow } from './shared/types';

import getCurrentDocument from './getCurrentDocument';



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
export default function viewport(elm?: Element | Document | GeneralWindow): Element | HTMLElement | null {
  const doc = getCurrentDocument(elm || document);
  return doc && (doc.scrollingElement || doc.documentElement);
}
