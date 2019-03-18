import { expect, describe, it } from './assets/init-test';

import isBlob from '../isBlob';



describe('"isBlob"', () => {
  it('Should return true for Blob objects', () => {
    expect(isBlob(new Blob())).to.equal(true);
  });

  it('Should return false for non Blob objects', () => {
    expect(isBlob()).to.equal(false);
    expect(isBlob(null)).to.equal(false);
    expect(isBlob({})).to.equal(false);
    expect(isBlob(123)).to.equal(false);
    expect(isBlob('blob')).to.equal(false);
  });
});
