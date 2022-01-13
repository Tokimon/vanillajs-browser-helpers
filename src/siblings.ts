import isDOMElement from './isDOMElement';
import isDOMChildNode from './isDOMChildNode';



const getSiblings = (type: 'prev' | 'next' | 'all') => (elm: Node | null): Element[] => {
  if (!isDOMElement(elm) || !isDOMChildNode(elm)) { return []; }

  const siblings = [];
  const next = type === 'next';
  const all = type === 'all';

  let sibling: Element | null = next
    ? elm.nextElementSibling
    : elm.parentElement.firstElementChild;

  while (sibling) {
    if (next || sibling !== elm) {
      siblings.push(sibling);
    } else if (!all) {
      break;
    }

    sibling = sibling.nextElementSibling;
  }

  return siblings;
};



/**
 * Get all sibling elements before a given DOM element in the structure
 *
 * @param elm - DOM element to find siblings of
 * @return Collection of sibling elements
 *
 * @example
 *
 * ```ts
 * previousSiblings(someElement);
 * ```
 */
export const previousSiblings = getSiblings('prev');

/**
 * Get all sibling elements after a given DOM element in the structure
 *
 * @param elm - DOM element to find siblings of
 * @return Collection of sibling elements
 *
 * @example
 *
 * ```ts
 * nextSiblings(someElement);
 * ```
 */
export const nextSiblings = getSiblings('next');

/**
 * Get all sibling elements of a given DOM element
 *
 * @param elm - DOM element to find siblings of
 * @return Collection of sibling elements
 *
 * @example
 *
 * ```ts
 * siblings(someElement);
 * ```
 */
export default getSiblings('all');
