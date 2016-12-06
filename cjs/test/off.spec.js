var _off = require('../off');

var _off2 = _interopRequireDefault(_off);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        expect((0, _off2.default)(null, 'evt', () => {})).to.be.null;
        expect((0, _off2.default)(undefined, 'evt', () => {})).to.be.null;
        expect((0, _off2.default)('', 'evt', () => {})).to.be.null;
    });

    it('Should always return the element if it is defined', () => {
        expect((0, _off2.default)({}, 'evt', () => {})).to.be.an('object');
        expect((0, _off2.default)(document.body, 'evt', () => {})).to.be.equal(document.body);
        expect((0, _off2.default)(123, 'evt', () => {})).to.be.a('number');
    });

    it('Should not remove event if handler is not defined', () => {
        onCb.reset();

        $.trigger('on', document.body);
        expect(onCb).to.have.been.calledThrice;

        (0, _off2.default)(document.body, 'on');

        onCb.reset();

        $.trigger('on', document.body);
        expect(onCb).to.have.been.calledThrice;
    });

    it('Should remove an given event handler from an object', () => {
        onCb.reset();

        $.trigger('on', document.body);
        expect(onCb).to.have.been.calledThrice;

        onCb.reset();

        (0, _off2.default)(window, 'on', onCb);
        $.trigger('on', document.body);
        expect(onCb).to.have.been.calledTwice;

        onCb.reset();

        (0, _off2.default)(document, 'on', onCb);
        $.trigger('on', document.body);
        expect(onCb).to.have.been.calledOnce;

        onCb.reset();

        (0, _off2.default)(document.body, 'on', onCb);
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

        (0, _off2.default)(document.body, 'click custom notattached', strCb);
        (0, _off2.default)(document.body, ['click', 'custom', 'notattached'], arrCb);

        strCb.reset();
        arrCb.reset();

        $.trigger('click', document.body);
        $.trigger('custom', document.body);

        expect(strCb).to.not.have.been.called;
        expect(arrCb).to.not.have.been.called;
    });
}); /* eslint-env node, mocha, browser */
/* global expect, $, sinon */