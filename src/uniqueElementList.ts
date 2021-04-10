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
 * uniqueElementList('my-elements', byClassName);
 * 
 * // Using multiple selectors
 * uniqueElementList(['my-elements', 'sone-other-elements'], byClassName);
 * ```
 */
export default function uniqueElementList(
  selector: string | string[],
  findElements: (name: string) => HTMLCollectionOf<Element> | NodeListOf<HTMLElement>
): Element[] {
  const selectors = isString(selector) ? [selector] : selector;

  const nodes = selectors.reduce((set, selector) => {
    const nodes: any = findElements(selector);
    for (const node of nodes) { set.add(node as Element); }
    return set;
  }, new Set<Element>());

  return Array.from(nodes);
}