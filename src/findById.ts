import isString from 'vanillajs-helpers/isString';



const byId = (id: string) => document.getElementById(id);



/**
 * Find a DOM element with the given ID
 *
 * @param ids - ID to find the element by
 * @return The found element
 */
 function findById(ids: string): HTMLElement | null

/**
 * Find a DOM elements from a list of IDs
 *
 * @param ids - ID to find the element by
 * @return The found elements
 */
function findById(ids: string[]): HTMLElement[]

function findById(ids: string | string[]): HTMLElement | HTMLElement[] | null {
  if (isString(ids)) { return byId(ids); }

  return ids.reduce((nodes, id) => {
    const node = byId(id);
    node && nodes.push(node);
    return nodes;
  }, [] as HTMLElement[]);
}

export default findById;
