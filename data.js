import isDOMElement from './isDOMElement';
import attr from './attr';
import camelCase from './camelCase';
import dashed from './dashed';

/**
 * Get/set the value of a 'data-' attribute on a given HTML Element
 * @param  {HTMLElement} elm - The HTML Element to fetch the data from
 * @param  {String} dataName - Name of the 'data-' attribute to handle (eg. id -> data-id)
 * @param  {String|Number} [value] - Value to insert into the 'data-' attribute
 * @return {String|Boolean} - Data found in the 'data-' attribute - true if empty, false if undefined
 */
export default function data(elm, dataName, value) {
  if(!isDOMElement(elm) || !dataName) { return false; }

  if(value === true) { value = ''; }

  let oldVal;

  // Fallback to attr (dataset polyfill doesn't really work as intended)
  // - Use removeSttribute to delete the data attribute
  if(!elm.dataset || value === false) {
    // Make sure the names are dashed
    dataName = dashed(dataName);
    oldVal = attr(elm, `data-${dataName}`, value);
  } else {
    // Make sure the names are camel cased
    dataName = camelCase({ numbers: false })(dataName);
    oldVal = elm.dataset[dataName];
    if(typeof value !== 'undefined') { elm.dataset[dataName] = value; }
  }

  // Empty string = true all other falsy values = false
  // (normally no numbers or booleans are returned as all is stored as strings,
  // so this affect only null or undefined)
  return oldVal || oldVal === '';
}
