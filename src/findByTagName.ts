import isString from 'vanillajs-helpers/isString';

import findUniqueNodeCollection from './findUniqueNodeCollection';



const byTag = (elm: Document | Element) => (tag: string) => elm.getElementsByTagName(tag);



/**
 * Find elements by given tag name
 *
 * @param elm - The DOM element to start the search from
 * @param tagNames - Tag name to find the elements by
 * @return List of found DOM elements
 */
function findByTagName(
  tagNames: string | string[]
): Element[]

/**
 * Find elements by given tag name
 *
 * @param elm - The DOM element to start the search from
 * @param tagNames - Tag name to find the elements by
 * @return List of found DOM elements
 */
function findByTagName(
  elm: Document | Element,
  tagNames?: string | string[]
): Element[]



function findByTagName(
  elm: Document | Element | string | string[],
  tagNames?: string | string[]
): Element[] {
  if (isString(elm) || Array.isArray(elm)) {
    [elm, tagNames] = [document, elm];
  }

  return findUniqueNodeCollection(
    tagNames as string | string[],
    byTag(elm)
  );
}

export default findByTagName;
