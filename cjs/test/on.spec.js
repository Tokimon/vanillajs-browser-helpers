var _on = require('../on');

var _on2 = _interopRequireDefault(_on);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        expect((0, _on2.default)(null, 'evt', () => {})).to.be.null;
        expect((0, _on2.default)(undefined, 'evt', () => {})).to.be.null;
        expect((0, _on2.default)('', 'evt', () => {})).to.be.null;
    });

    it('Should always return the element if it is defined', () => {
        expect((0, _on2.default)({}, 'evt', () => {})).to.be.an('object');
        expect((0, _on2.default)(document.body, 'evt', () => {})).to.be.equal(document.body);
        expect((0, _on2.default)(123, 'evt', () => {})).to.be.a('number');
    });

    it('Should not add event if handler is not defined', () => {
        onCb.reset();

        $.trigger('on', document.body);
        expect(onCb).not.to.have.been.called;

        (0, _on2.default)(document.body, 'on');

        onCb.reset();

        $.trigger('on', document.body);
        expect(onCb).not.to.have.been.called;
    });

    it('Should add an given event handler to an object', () => {
        onCb.reset();

        $.trigger('on', document.body);
        expect(onCb).not.to.have.been.called;

        onCb.reset();

        (0, _on2.default)(document.body, 'on', onCb);

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

        (0, _on2.default)(document.body, 'click custom', strCb);
        (0, _on2.default)(document.body, ['click', 'custom'], arrCb);

        strCb.reset();
        arrCb.reset();

        $.trigger('click', document.body);
        $.trigger('custom', document.body);

        expect(strCb).to.have.been.calledTwice;
        expect(arrCb).to.have.been.calledTwice;
    });
}); /* eslint-env node, mocha, browser */
/* global expect, $, sinon */