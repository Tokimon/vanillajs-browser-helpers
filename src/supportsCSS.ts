import type { CSSStyleKey } from './shared/types';

import vendorPrefixed from './vendorPrefixed';



let div: HTMLDivElement;



interface PrefixedPropMatch {
  prop: string;
  value: string;
  prefix: string;
}



export function supportsProp(prop: CSSStyleKey, value: string): boolean {
  if (!div) { div = document.createElement('div'); }
  if (typeof div.style[prop] === 'undefined') { return false; }
  if (!value) { return true; }

  div.style[prop] = value;
  return div.style[prop] === value;
}



/**
 * Detect wether or not the given css property (and/or) value is supported by
 * the current browser
 *
 * @param prop    - Property to test
 * @param value   - Value to test with the property
 * @return Returns object if property is supported with prefix, otherwise a boolean is returned
 */
export default function supportsCSS(prop: CSSStyleKey, value: string): PrefixedPropMatch | boolean {
  // Property (+ value) is supported natively as is
  if (supportsProp(prop, value)) { return true; }

  // Testing prefixed values
  const props = vendorPrefixed(prop);
  const values = vendorPrefixed(value);

  for (let i = 0; i < props.length; i++) {
    const { prefix, js } = props[i];
    const prefixedProp = js as CSSStyleKey;
    const prefixedValue = values[i].css;

    // Prefixed prop
    if (supportsProp(prefixedProp, value)) {
      return { prop: prefixedProp, value, prefix };
    }

    // Prefixed value
    if (supportsProp(prop, prefixedValue)) {
      return { prop, value: prefixedValue, prefix };
    }

    // Prefixed prop and value
    if (supportsProp(prefixedProp, prefixedValue)) {
      return { prop: prefixedProp, value: prefixedValue, prefix };
    }
  }

  // No prefix support has been found
  return false;
}
