import isDOMElement from './isDOMElement';

/**
 * Get/set the value of an attribute on a given HTML Element
 * @param  {HTMLElement} elm - The HTML Element to fetch the attribute from
 * @param  {String} attrName - Name of the attribute to handle
 * @param  {String|Number} [value] - Value to insert into the attribute
 * @return {String} - Data found in the attribute (the old value if {value} is defined)
 */
export default function attr(elm, attrName, value) {
  if(!isDOMElement(elm) || !attrName) { return false; }

  const oldVal = elm.getAttribute(attrName);
  if(value === true) { value = ''; }
  if(value === false) { elm.removeAttribute(attrName); }
  else if(typeof value !== 'undefined') { elm.setAttribute(attrName, value); }

  return oldVal;
}
