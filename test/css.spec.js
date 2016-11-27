/* eslint-env node, mocha, browser */
/* global expect, $ */

import css from '../css';

const testID = 'TestNode';

describe('"css"', () => {
  before(() => $.html(`
    <style id="style">#${testID} { overflow: hidden; font-size: 15px; } #${testID}:after { content: 'after'; }</style>
    <div id="${testID}"></div>
  `));

  beforeEach(() => $.id(testID).removeAttribute('style'));

  after(() => {
    $.remove(testID);
    $.remove('style');
  });

  it('Should read the current style of a DOM element', () => {
    const node = $.id(testID);
    const styling = css(node);
    expect(styling).to.not.be.null;
    expect(styling.overflow).to.equal('hidden');
  });

  it('Should change the styling of a DOM element', () => {
    const node = $.id(testID);
    const newstyling = css(node, { height: '45px' });
    expect(newstyling).to.not.be.null;
    expect(newstyling.height).to.equal('45px');
  });

  it('Should accept dashed and camelCase property names', () => {
    const node = $.id(testID);
    const newstyling = css(node, { 'line-height': '15px', fontSize: '15px' });
    expect(newstyling).to.not.be.null;
    expect(newstyling.lineHeight).to.equal('15px');
    expect(newstyling.fontSize).to.equal('15px');
  });

  it('Should get the styling of a pseudo element', () => {
    const node = $.id(testID);
    const pseudo = css(node, 'after');
    expect(pseudo).to.exist;
    expect(pseudo.content).to.equal('"after"');
  });

  // it('Should return null if there is no pseudo element', () => {
  //   const node = $.id(testID);
  //   const pseudo = css(node, 'before');
  //   expect(pseudo).to.be.null;
  // });

  it('Should return null on non DOM elements', () => {
    expect(css(null)).to.be.null;
  });
});