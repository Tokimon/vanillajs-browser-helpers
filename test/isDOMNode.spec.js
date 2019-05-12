import { expect, helpers, describe, it } from './assets/init-test';

import isDOMNode from '../isDOMNode';



describe('"isDOMNode" >', () => {
  it('Should only return true for a HTML nodes', () => {
    expect(isDOMNode(document.documentElement), 'HTML').to.equal(true);
    expect(isDOMNode(document.body), 'BODY').to.equal(true);
    expect(isDOMNode(helpers.create('p')), 'P').to.equal(true);
    expect(isDOMNode(document.createTextNode('')), 'TEXT').to.equal(true);
    expect(isDOMNode(document.createComment('')), 'COMMENT').to.equal(true);
    expect(isDOMNode({ nodeType: 1 }), 'CUSTOM').to.equal(true);
  });

  it('Should return false for non HTML nodes', () => {
    expect(isDOMNode(window), 'WINDOW').to.equal(false);
    expect(isDOMNode(document), 'DOCUMENT').to.equal(false);
    expect(isDOMNode(document.createDocumentFragment()), 'FRAGMENT').to.equal(false);
  });

  it('Should return false for non HTML objects', () => {
    expect(isDOMNode()).to.equal(false);
    expect(isDOMNode(null)).to.equal(false);
    expect(isDOMNode({})).to.equal(false);
  });
});
