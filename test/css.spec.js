import { expect, helpers, describe, it, before, beforeEach, after } from './assets/init-test';

import css from '../css';



const testID = 'CSSTest';



describe('"css" >', () => {
  let testNode;

  before(() => {
    helpers.html(`
      <style id="style">
        #${testID} { overflow: hidden; font-size: 15px; }
        #${testID}:after { content: 'after'; }
      </style>
      <div id="${testID}"></div>
    `);

    testNode = helpers.id(testID);
  });

  beforeEach(() => testNode.removeAttribute('style'));

  after(() => {
    helpers.remove(testID);
    helpers.remove('style');
  });

  it('Should read the current style of a DOM element', () => {
    const styling = css(testNode);
    expect(styling.overflow).to.equal('hidden');
  });

  it('Should get the value of the given property from the style', () => {
    testNode.style.lineHeight = '15px';
    testNode.style.fontSize = '15px';

    expect(css(testNode, 'line-height')).to.equal('15px');
    expect(css(testNode, 'fontSize')).to.equal('15px');
    expect(css(testNode, 'overflow')).to.equal('hidden');
    expect(css(testNode, 'not-a-css-prop')).to.equal(null);
  });

  it('Should add style property on a DOM element', () => {
    css(testNode, { height: '45px' });
    expect(testNode.style.height).to.equal('45px');
  });

  it('Should add `px` to property number values', () => {
    css(testNode, { height: 45 });
    expect(testNode.style.height).to.equal('45px');
  });

  it('Should remove non string property values', () => {
    css(testNode, { height: { size: 20 }, opacity: true });
    expect(testNode.style.cssText).to.equal('');
  });

  it('Should remove falsy property values', () => {
    testNode.style.height = '15px';
    testNode.style.lineHeight = '15px';
    testNode.style.opacity = '0.5';

    css(testNode, { height: null, lineHeight: '', opacity: false });
    expect(testNode.style.cssText).to.equal('');
  });

  it('Should change the styling before returning the style', () => {
    testNode.style.height = '10px';
    const newstyling = css(testNode, { height: '45px' });
    expect(newstyling.height).to.equal('45px');
  });

  it('Should accept dashed and camelCase property names', () => {
    css(testNode, { 'line-height': '20px', fontSize: '20px' });
    expect(testNode.style.lineHeight).to.equal('20px');
    expect(testNode.style.fontSize).to.equal('20px');
  });

  it('Should return null on non DOM elements', () => {
    expect(css(null)).to.equal(null);
    expect(css({})).to.equal(null);
  });
});
