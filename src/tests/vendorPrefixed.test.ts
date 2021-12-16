import vendorPrefixed, { VendorPrefixing } from '../vendorPrefixed';



const result = (prefix: 'webkit' | 'moz' | 'ms' | 'o', js: string, css: string): VendorPrefixing => ({
  css: `-${prefix}-${css}`,
  js: `${prefix}${js}`,
  prefix
});

const resultArray = (js: string, css: string): VendorPrefixing[] => [
  result('webkit', js, css),
  result('moz', js, css),
  result('ms', js, css),
  result('o', js, css)
];



describe('"vendorPrefixed"', () => {
  it('Prefixes a word with vendor prefixes', () => {
    expect(vendorPrefixed('vendorPrefixed'))
      .toEqual(resultArray('VendorPrefixed', 'vendor-prefixed'));
  });

  it('Prefixes a phrase with vendor prefixes and converts it into PascalCased word', () => {
    expect(vendorPrefixed('prefix this phrase'))
      .toEqual(resultArray('PrefixThisPhrase', 'prefix-this-phrase'));
  });
});
