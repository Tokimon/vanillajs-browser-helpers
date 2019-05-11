import { expect, helpers, describe, it } from './assets/init-test';

import toDOM from '../toDOM';



describe('"toDOM" >', () => {
  it.each(
    [
      undefined,
      null,
      123,
      {},
      [],
      helpers.create('p'),
      '<html />',
      '<head />',
      '<body />',
      '<frame />',
      '<frameset />'
    ],
    '%s should be returned as is',
    (val) => { expect(toDOM(val)).to.equal(val); }
  );

  it.each(
    [
      '<a />',
      '<abbr />',
      '<acronym />',
      '<address />',
      '<applet />',
      '<area />',
      '<article />',
      '<aside />',
      '<audio />',
      '<b />',
      '<base />',
      '<basefont />',
      '<bdo />',
      '<big />',
      '<blockquote />',
      '<br />',
      '<button />',
      '<canvas />',
      '<caption />',
      '<center />',
      '<cite />',
      '<code />',
      '<col />',
      '<colgroup />',
      '<datalist />',
      '<dd />',
      '<del />',
      '<dfn />',
      '<div />',
      '<dl />',
      '<dt />',
      '<em />',
      '<embed />',
      '<fieldset />',
      '<figcaption />',
      '<figure />',
      '<font />',
      '<footer />',
      '<form />',
      '<header />',
      '<h1 />',
      '<h2 />',
      '<h3 />',
      '<h4 />',
      '<h5 />',
      '<h6 />',
      '<hr />',
      '<i />',
      '<iframe />',
      '<img />',
      '<input />',
      '<ins />',
      '<kbd />',
      '<label />',
      '<legend />',
      '<li />',
      '<link />',
      '<main />',
      '<map />',
      '<mark />',
      '<meta />',
      '<meter />',
      '<nav />',
      '<noscript />',
      '<object />',
      '<ol />',
      '<optgroup />',
      '<option />',
      '<p />',
      '<param />',
      '<pre />',
      '<progress />',
      '<q />',
      '<s />',
      '<samp />',
      '<script />',
      '<section />',
      '<select />',
      '<small />',
      '<source />',
      '<span />',
      '<strike />',
      '<strong />',
      '<style />',
      '<sub />',
      '<sup />',
      '<table />',
      '<tbody />',
      '<td />',
      '<textarea />',
      '<tfoot />',
      '<th />',
      '<thead />',
      '<time />',
      '<title />',
      '<tr />',
      '<u />',
      '<ul />',
      '<var />',
      '<video />',
      '<wbr />'
    ],
    'Tag "%s" should be converted to a dom element',
    (tag) => {
      const tagName = tag.slice(1, tag.length - 3).toUpperCase();
      expect(toDOM(tag)[0].tagName).to.equal(tagName);
    }
  );

  it('Should return a HTMLCollection of all root elements converted', () => {
    const nodes = toDOM(`
      <div></div>
      <p></p>
      <a></a>
    `);

    expect(nodes instanceof HTMLCollection).to.equal(true);
    expect(nodes[0].tagName).to.equal('DIV');
    expect(nodes[1].tagName).to.equal('P');
    expect(nodes[2].tagName).to.equal('A');
  });
});
