/**
 * Get/set the value of an attribute on a given DOM element
 *
 * @param elm - The DOM element to fetch/set the attribute from
 * @param attrName - Name of the attribute to handle
 * @param value - Value to insert into the attribute
 * @return Data found in the attribute (the old value if {value} is defined)
 *
 * @example
 *
 * ```ts
 * // Get the value of an attribute
 * attr(document.documentElement, 'lang');
 *
 * // Set the value of an attribute
 * attr(document.documentElement, 'lang', 'da-DK');
 * ```
 */
export default function attr(
  elm: Element,
  attrName: string,
  value?: string | number | boolean
): string | null {
  const currVal = elm.getAttribute(attrName);

  if (value === false) {
    elm.removeAttribute(attrName);
  } else if (value !== undefined) {
    if (value === true) { value = ''; }
    elm.setAttribute(attrName, String(value));
  }

  return currVal;
}
