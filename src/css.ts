import isNumber from 'vanillajs-helpers/isNumber';
import isString from 'vanillajs-helpers/isString';
import camelCase from 'vanillajs-helpers/camelCase';

import type { CSSStyleKey } from './shared/types';



type CSSStylePropertyMap = Record<CSSStyleKey, string | number | null>




const setValue = (
  elm: HTMLElement,
  property: string,
  value: string | number | null
): void => {
  let important;

  if (isNumber(value)) {
    const units = property !== 'lineHeight' ? 'px' : ''
    value = value + units;
  } else if (value && value.includes('!')) {
    const m = value.match(/^(.+)(?:\s+[!](important))?$/);
    if (m) { [value, important] = m; }
  }
  
  elm.style.setProperty(property, value, important);
}

/**
 * Get a given style property.
 * if value is set (not undefined), it will be set before returning
 */
const handleSingleValue = (
  elm: HTMLElement,
  property: string,
  value?: string | number | null
) => {
  if (value !== undefined) {
    setValue(elm, property, value);
  }

  // Get all computed styles as that gives a more correct value
  const val = window.getComputedStyle(elm)
    .getPropertyValue(camelCase(property))

  if (!val) { return null; }
  if (val.includes('px')) { return parseInt(val, 10); }
  
  return !Number.isNaN(val) ? Number(val) : val;
}

/**
 * Traverse the `propertyMap` and set style on element accordingly
 */
const handleMultipleValues = (
  elm: HTMLElement,
  propertyMap: CSSStylePropertyMap
): CSSStyleDeclaration => {
  (Object.keys(propertyMap) as CSSStyleKey[])
    .forEach((key) => setValue(elm, camelCase(key), propertyMap[key]));

  return window.getComputedStyle(elm);
}


/**
 * Set multiple inline styling properties on a DOM element.
 * 
 * NOTE:
 * - `null` as value, removes the given property
 * - `!important` in the value will be parsed and set correctly
 * 
 * @param elm - DOM element to set the style on
 * @param style - Styling to set on the element
 * @return All styling on the element
 */
function css(elm: HTMLElement, style: CSSStylePropertyMap): CSSStyleDeclaration;

/**
 * Get or set an inline style property on a DOM element. 
 * 
 * NOTE:
 * - `null` removes the given property
 * - `!important` added to the value, it will be parsed and set correctly
 * - Values that are pure numbers or pixel values will be converted to number before returned
 * 
 * @param elm - DOM element to get/set the style on
 * @param style - Style property name
 * @param value - The new value
 * @return The value of the property
 */
function css(elm: HTMLElement, property: string, value?: string | number): string | number | null;

function css(
  elm: HTMLElement,
  property: string | CSSStylePropertyMap,
  value?: string | number | null
): CSSStyleDeclaration | string | number | null {
  return isString(property)
    ? handleSingleValue(elm, property, value)
    : handleMultipleValues(elm, property);
}

export default css;
