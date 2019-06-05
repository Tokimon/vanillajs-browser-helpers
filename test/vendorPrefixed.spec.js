import { expect, describe, it } from './assets/init-test';

import vendorPrefixed from '../vendorPrefixed';



function expectArrayInput(arr, input) {
  expect(arr).to.be.a('array');
  expect(arr[0]).to.equal(`webkit${input}`);
  expect(arr[1]).to.equal(`moz${input}`);
  expect(arr[2]).to.equal(`ms${input}`);
  expect(arr[3]).to.equal(`o${input}`);
}



describe('"vendorPrefixed" >', () => {
  it('Should prefix a word with vendor prefixes', () => {
    expectArrayInput(vendorPrefixed('vendorPrefixed'), 'VendorPrefixed');
  });

  it('Should prefix a phrase with vendor prefixes and convert it into PascalCased word', () => {
    expectArrayInput(vendorPrefixed('prefix this phrase'), 'PrefixThisPhrase');
  });

  it('Should always return array with prefixes', () => {
    expectArrayInput(vendorPrefixed(9), '9');
    expectArrayInput(vendorPrefixed(null), 'Null');
    expectArrayInput(vendorPrefixed(), 'Undefined');
  });
});
