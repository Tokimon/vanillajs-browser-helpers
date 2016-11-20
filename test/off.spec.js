/* eslint-env node, mocha, browser */
/* global expect, $ */

import off from '../off';

describe('"off"', () => {
  const onCb = sinon.spy();
  const strCb = sinon.spy();
  const arrCb = sinon.spy();

  before(() => {
    $.on(window, 'on', onCb);
    $.on(document, 'on', onCb);
    $.on(document.body, 'on', onCb);

    $.on(document.body, 'click', strCb);
    $.on(document.body, 'custom', strCb);

    $.on(document.body, 'click', arrCb);
    $.on(document.body, 'custom', arrCb);
  });

  it('Should return null if the element is empty or not defined', () => {
    expect(off(null, 'evt', () => {})).to.be.null;
    expect(off(undefined, 'evt', () => {})).to.be.null;
    expect(off('', 'evt', () => {})).to.be.null;
  });

  it('Should always return the element if it is defined', () => {
    expect(off({}, 'evt', () => {})).to.be.an('object');
    expect(off(document.body, 'evt', () => {})).to.be.equal(document.body);
    expect(off(123, 'evt', () => {})).to.be.a('number');
  });

  it('Should not remove event if handler is not defined', () => {
    onCb.reset();

    $.trigger('on', document.body);
    expect(onCb).to.have.been.calledThrice;

    off(document.body, 'on');

    onCb.reset();

    $.trigger('on', document.body);
    expect(onCb).to.have.been.calledThrice;
  });

  it('Should remove an given event handler from an object', () => {
    onCb.reset();

    $.trigger('on', document.body);
    expect(onCb).to.have.been.calledThrice;

    onCb.reset();

    off(window, 'on', onCb);
    $.trigger('on', document.body);
    expect(onCb).to.have.been.calledTwice;

    onCb.reset();

    off(document, 'on', onCb);
    $.trigger('on', document.body);
    expect(onCb).to.have.been.calledOnce;

    onCb.reset();

    off(document.body, 'on', onCb);
    $.trigger('on', document.body);
    expect(onCb).not.to.have.been.called;
  });

  it('Should remove multiple event handlers from an object', () => {
    strCb.reset();
    arrCb.reset();

    $.trigger('click', document.body);
    $.trigger('custom', document.body);

    expect(strCb).to.have.been.calledTwice;
    expect(arrCb).to.have.been.calledTwice;

    off(document.body, 'click custom notattached', strCb);
    off(document.body, ['click', 'custom', 'notattached'], arrCb);

    strCb.reset();
    arrCb.reset();

    $.trigger('click', document.body);
    $.trigger('custom', document.body);

    expect(strCb).to.not.have.been.called;
    expect(arrCb).to.not.have.been.called;
  });
});
