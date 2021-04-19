import isString from 'vanillajs-helpers/isString';



/**
 * Find an element by given CSS selector
 *
 * @param queries - CSS selector to find elements by
 * @param first - Return only the first found element
 * @return List of found DOM elements
 */
 function findByQuery(
  queries: string | string[],
  first: true
): Element | null


/**
 * Find an element by a given CSS selector from within a given element
 *
 * @param elm - The DOM element to start the search from
 * @param queries - CSS selector to find elements by
 * @param first - Return only the first found element
 * @return List of found DOM elements
 */
 function findByQuery(
  elm: Document | Element,
  queries: string | string[],
  first: true
): Element | null

/**
 * Find all elements matching a given CSS selector
 *
 * @param queries - CSS selector to find elements by
 * @param first - Return only the first found element
 * @return List of found DOM elements
 */
 function findByQuery(
  queries: string | string[],
  first?: false
): Element[]

/**
 * Find all elements matching a given CSS selector from within a given element
 *
 * @param elm - The DOM element to start the search from
 * @param queries - CSS selector to find elements by
 * @param first - Return only the first found element
 * @return List of found DOM elements
 */
function findByQuery(
  elm: Document | Element,
  queries: string | string[],
  first?: false
): Element[]



function findByQuery(
  elm: Document | Element | string | string[],
  queries?: string | string[] | boolean,
  first?: boolean
): Element | Element[] | null {
  if (isString(elm) || Array.isArray(elm)) {
    first = queries as boolean;
    queries = elm as string | string[];
    elm = document;
  }

  if (Array.isArray(queries)) {
    queries = queries.join(',');
  }

  const q = queries as string;

  return first
    ? elm.querySelector(q)
    : Array.from(elm.querySelectorAll(q));
}

export default findByQuery;
