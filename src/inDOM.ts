/**
 * Is the given DOM node inserted into the DOM
 *
 * @param elm - The element to check
 * @return Is it a DOM node in the DOM or not
 */
export default function inDOM(elm: Node): boolean {
  return document.contains(elm);
}
