/* eslint-env node, mocha, browser */
/* global expect, $, sinon */

import on from '../on';

describe('"on"', () => {
  const onCb = sinon.spy();
  const strCb = sinon.spy();
  const arrCb = sinon.spy();

  after(() => {
    $.off(document.body, 'on', onCb);

    $.off(document.body, 'click', strCb);
    $.off(document.body, 'custom', strCb);

    $.off(document.body, 'click', arrCb);
    $.off(document.body, 'custom', arrCb);
  });

  it('Should return null if the element is empty or not defined', () => {
    expect(on(null, 'evt', () => {})).to.be.null;
    expect(on(undefined, 'evt', () => {})).to.be.null;
    expect(on('', 'evt', () => {})).to.be.null;
  });

  it('Should always return the element if it is defined', () => {
    expect(on({}, 'evt', () => {})).to.be.an('object');
    expect(on(document.body, 'evt', () => {})).to.be.equal(document.body);
    expect(on(123, 'evt', () => {})).to.be.a('number');
  });

  it('Should not add event if handler is not defined', () => {
    onCb.reset();

    $.trigger('on', document.body);
    expect(onCb).not.to.have.been.called;

    on(document.body, 'on');

    onCb.reset();

    $.trigger('on', document.body);
    expect(onCb).not.to.have.been.called;
  });

  it('Should add an given event handler to an object', () => {
    onCb.reset();

    $.trigger('on', document.body);
    expect(onCb).not.to.have.been.called;

    onCb.reset();

    on(document.body, 'on', onCb);

    $.trigger('on', document.body);
    expect(onCb).to.have.been.calledOnce;
  });

  it('Should add multiple event handlers to an object', () => {
    strCb.reset();
    arrCb.reset();

    $.trigger('click', document.body);
    $.trigger('custom', document.body);

    expect(strCb).not.to.have.been.called;
    expect(arrCb).not.to.have.been.called;

    on(document.body, 'click custom', strCb);
    on(document.body, ['click', 'custom'], arrCb);

    strCb.reset();
    arrCb.reset();

    $.trigger('click', document.body);
    $.trigger('custom', document.body);

    expect(strCb).to.have.been.calledTwice;
    expect(arrCb).to.have.been.calledTwice;
  });
});
