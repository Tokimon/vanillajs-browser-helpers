import pascalCase from 'vanillajs-helpers/pascalCase';
import kebabCase from 'vanillajs-helpers/kebabCase';



export interface VendorPrefixing {
  prefix: 'webkit' | 'moz' | 'ms' | 'o'
  js: string;
  css: string;
}



/**
 * Add vendor prefixes to a string
 *
 * @param str - String to add vendor prefixes to
 * @return Array of the various vendor vendorPrefixed versions of the string
 */
export default function vendorPrefixed(str: string): VendorPrefixing[] {
  const pascalStr = pascalCase(`${str}`);
  const kebabCaseStr = kebabCase(str);

  return [
    { prefix: 'webkit', js: `webkit${pascalStr}`, css: `-webkit-${kebabCaseStr}` },
    { prefix: 'moz', js: `moz${pascalStr}`, css: `-moz-${kebabCaseStr}` },
    { prefix: 'ms', js: `ms${pascalStr}`, css: `-ms-${kebabCaseStr}` },
    { prefix: 'o', js: `o${pascalStr}`, css: `-o-${kebabCaseStr}` }
  ];
}
