import pascalCase from 'vanillajs-helpers/pascalCase';
import dashed from 'vanillajs-helpers/dashed';



interface VendorPrefixing {
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
  const dashedStr = dashed(str);

  return [
    { prefix: 'webkit', js: `webkit${pascalStr}`, css: `-webkit-${dashedStr}` },
    { prefix: 'moz', js: `moz${pascalStr}`, css: `-moz-${dashedStr}` },
    { prefix: 'ms', js: `ms${pascalStr}`, css: `-ms-${dashedStr}` },
    { prefix: 'o', js: `o${pascalStr}`, css: `-o-${dashedStr}` }
  ];
}
