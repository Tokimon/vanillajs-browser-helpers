import pascalCase from 'vanillajs-helpers/pascalCase';

/**
 * Add vendor prefixes to a string
 * @function prefixed
 * @param {String} str - String to add vendor prefixes to
 * @return {String[]} Array of the various vendor prefixed versions of the string
 */
export default function prefixed(str) {
  str = pascalCase(str);
  return [`webkit${str}`, `moz${str}`, `ms${str}`, `o${str}`];
}
