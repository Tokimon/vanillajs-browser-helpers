import isString from 'vanillajs-helpers/isString';


/**
 * Make a unique list of Elements from a list of selectors and and function to use that selector.
 *
 * @param selector - The selector(s) to use with the given `findElements` function
 * @param findElements - The function to find elements
 * @returns The unique list of found elements
 *
 * @example
 *
 * ```ts
 * const byClassName = (selector) => document.getElementsByClassName(selector)
 *
 * // Using a single selector
 * findUniqueNodeCollection('my-elements', byClassName);
 *
 * // Using multiple selectors
 * findUniqueNodeCollection(['my-elements', 'sone-other-elements'], byClassName);
 * ```
 */
export default function findUniqueNodeCollection(
  selector: string | string[],
  findElements: (name: string) => HTMLCollectionOf<Element> | NodeListOf<HTMLElement>
): Element[] {
  const selectors = isString(selector) ? [selector] : selector;
  const nodes = selectors.flatMap((s: string) => Array.from(findElements(s)));
  return Array.from(new Set(nodes));
}
