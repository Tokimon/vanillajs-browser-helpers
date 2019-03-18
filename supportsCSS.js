const div = document.createElement('div');



export function supportsProp(prop, value) {
  if(typeof div.style[prop] === 'undefined') { return false; }
  if(!value) { return true; }

  div.style[prop] = value;
  return div.style[prop] === value;
}



/**
 * Detect wether or not the given css property (and/or) value is supported by
 * the current browser
 * @param  {String} prop    - Property to test
 * @param  {String} value   - Value to test with the property
 * @return {Boolean|Object} - Returns object if property is supported with prefix,
 *                            otherwise a boolean is returned
 */
export default function supportsCSS(prop, value) {
  // Property (+ value) is supported natively as is
  if(supportsProp(prop, value)) { return true; }

  // Testing prefixed values
  let prefixed = false;

  ['-moz-', '-webkit-', '-ms-', '-khtml-', '-o-']
    .some((prefix) => {
      const prefixedProp = prefix + prop;
      const prefixedValue = prefix + value;

      // Prefixed prop
      if(supportsProp(prefixedProp, value)) {
        prefixed = { prop: prefixedProp, value, prefix };

        // Prefixed value
      } else if(supportsProp(prop, prefixedValue)) {
        prefixed = { prop, value: prefixedValue, prefix };

        // Prefixed prop and value
      } else if(supportsProp(prefixedProp, prefixedValue)) {
        prefixed = { prop: prefixedProp, value: prefixedValue, prefix };
      }

      // Stop iterating?
      return !!prefixed;
    });

  return prefixed;
}
