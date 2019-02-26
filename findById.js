import isString from 'vanillajs-helpers/isString';
import isArray from 'vanillajs-helpers/isArray';



const byId = (id) => document.getElementById(id);



/**
 * Find a DOM element with the given ID
 * @function findById
 * @param {String|String[]} ids - ID to find the element by
 * @return {HTMLElement|HTMLElement[]} The found element
 */
export default function findById(ids) {
  if (isString(ids)) { return byId(ids); }
  if (!isArray(ids)) { return null; }

  return ids.reduce((nodes, id) => {
    const node = byId(id);
    if (node) { nodes.push(node); }
    return nodes;
  }, []);
}
