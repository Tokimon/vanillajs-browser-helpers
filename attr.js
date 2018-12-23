import isDOMElement from './isDOMElement';



/**
 * Get/set the value of an attribute on a given DOM element
 * @function attr
 * @param {HTMLElement} elm - The DOM element to fetch the attribute from
 * @param {String} attrName - Name of the attribute to handle
 * @param {String|Number} [value] - Value to insert into the attribute
 * @return {String} Data found in the attribute (the old value if {value} is defined)
 */
export default function attr(elm, attrName, value) {
  if (!isDOMElement(elm) || !attrName) { return; }

  const oldVal = elm.getAttribute(attrName);

  if (value === false) {
    elm.removeAttribute(attrName);
  } else if (typeof value !== 'undefined') {
    elm.setAttribute(attrName, value === true ? '' : value);
  }

  return oldVal;
}
