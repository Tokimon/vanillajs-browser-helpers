import isBoolean from './isBoolean';
import isString from './isString';
import isArray from './isArray';

export default function findByQuery(queries, elm = document, first = false) {
  // Correct variables if 'elm' is omitted but 'first' isn't
  if(isBoolean(elm)) { [elm, first] = [document, elm]; }
  // If we got an array, filter out bad queries and convert to a string
  if(isArray(queries)) { queries = queries.filter((query) => isString(query)).join(','); }
  // Query must be string at this point
  if(!isString(queries)) { return first ? null : []; }

  // 'elm' must be an object with the 'querySelector' implementation
  if(!elm || !elm.querySelector) { elm = document; }
  
  try {
    return first ? elm.querySelector(queries) : Array.from(elm.querySelectorAll(queries));
  } catch(ex) { return first ? null : []; }
}
