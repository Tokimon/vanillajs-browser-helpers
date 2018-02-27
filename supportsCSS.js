import iterate from 'vanillajs-helpers/iterate';
import capitalize from 'vanillajs-helpers/capitalize';



function supported(div, prop, value) {
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
  const div = document.createElement('div');

  // Property (+ value) is supported natively as is
  if(supported(div, prop, value)) { return true; }

  // Testing prefixed values
  let prefixed = false;

  iterate(['Moz', 'Webkit', 'ms', 'Khtml', 'O'], (jsPrefix) => {
    const cssPrefix = `-${jsPrefix.toLowerCase()}-`;
    const p = jsPrefix + capitalize(prop);
    const v = cssPrefix + value;

    // Prefixed prop
    if(supported(div, p, value)) {
      prefixed = { prop: p, value, jsPrefix, cssPrefix: false };

    // Prefixed value
    } else if(supported(div, prop, v)) {
      prefixed = { prop, value: v, jsPrefix: false, cssPrefix };

    // Prefixed prop and value
    } else if(supported(div, p, v)) {
      prefixed = { prop: p, value: v, jsPrefix, cssPrefix };
    }

    // Stop iterating?
    return !prefixed;
  });

  return prefixed;
}
