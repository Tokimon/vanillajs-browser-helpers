import pascalCase from 'vanillajs-helpers/pascalCase';


// TODO: Add destinction between JS and CSS vendor perfixes

/**
 * Add vendor prefixes to a string
 * @function vendorPrefixed
 * @param {String} str - String to add vendor prefixes to
 * @return {String[]} Array of the various vendor vendorPrefixed versions of the string
 */
export default function vendorPrefixed(str) {
  str = pascalCase(str);
  return [`webkit${str}`, `moz${str}`, `ms${str}`, `o${str}`];
}
