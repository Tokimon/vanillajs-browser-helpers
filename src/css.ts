import type { CSSStyleKey, CSSStyleProperties } from './shared/types';

import isString from 'vanillajs-helpers/isString';
import kebabCase from 'vanillajs-helpers/kebabCase';



const applyValue = (
  elm: HTMLElement,
  property: CSSStyleKey,
  value: string | number | null,
  important: boolean
) => {
  const val = value != null ? String(value) : '';

  if (important) {
    const imp = important ? 'important' : undefined;
    elm.style.setProperty(kebabCase(property), val, imp);
  } else {
    elm.style[property] = val;
  }

  // This part here is for when the value is a number,
  // but the property can't accept just a numeric value,
  // so "px" has to be added
  if (!Number.isNaN(Number(val)) && elm.style[property] !== val) {
    applyValue(elm, property, value + 'px', important);
  }
};

const setValue = (
  elm: HTMLElement,
  property: CSSStyleKey,
  value: string | number | null
): void => {
  let important = false;

  if (isString(value) && value.includes('!important')) {
    value = value.split(' ')[0];
    important = true;
  }

  applyValue(elm, property, value, important);
};

/**
 * Get a given style property.
 * if value is set (not undefined), it will be set before returning
 */
const handleSingleValue = (
  elm: HTMLElement,
  property: CSSStyleKey,
  value?: string | number | null
) => {
  if (value !== undefined) {
    setValue(elm, property, value);
  }

  // Get all computed styles as that gives a more correct value
  const val = window.getComputedStyle(elm)
    .getPropertyValue(kebabCase(property));

  if (val.includes('px')) { return parseFloat(val); }

  const numeric = Number(val);
  return !Number.isNaN(numeric) ? numeric : val;
};

/**
 * Traverse the `propertyMap` and set style on element accordingly
 */
const handleMultipleValues = (
  elm: HTMLElement,
  properties?: CSSStyleProperties
): CSSStyleDeclaration => {
  if (properties) {
    (Object.entries(properties) as [CSSStyleKey, typeof properties[CSSStyleKey]][])
      .forEach(([key, value]) => {
        value && setValue(elm, key, value);
      });
  }

  return window.getComputedStyle(elm);
};


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
function css(elm: HTMLElement, style?: CSSStyleProperties): CSSStyleDeclaration;

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
function css(elm: HTMLElement, property: CSSStyleKey, value?: string | number): string | number | null;

function css(
  elm: HTMLElement,
  property?: CSSStyleKey | CSSStyleProperties,
  value?: string | number | null
): CSSStyleDeclaration | string | number | null {
  return isString(property)
    ? handleSingleValue(elm, property, value)
    : handleMultipleValues(elm, property);
}

export default css;
