var _trigger = require('../trigger');

var _trigger2 = _interopRequireDefault(_trigger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('"Trigger"', () => {
    it('Should return null if the element is empty or not defined', () => {
        expect((0, _trigger2.default)(null, 'evt')).to.be.null;
        expect((0, _trigger2.default)(undefined, 'evt')).to.be.null;
        expect((0, _trigger2.default)('', 'evt')).to.be.null;
    });

    it('Should always return the element if it is defined', () => {
        expect((0, _trigger2.default)({}, 'evt')).to.be.an('object');
        expect((0, _trigger2.default)(document.body, 'evt')).to.be.equal(document.body);
        expect((0, _trigger2.default)(123, 'evt')).to.be.a('number');
    });

    it('Should not trigger event if neither element nor event is given', () => {
        const cb = sinon.spy();
        const b = document.body;

        b.addEventListener('test', cb, false);

        (0, _trigger2.default)(b);
        (0, _trigger2.default)(null, 'test');

        expect(cb).to.not.have.been.called;

        b.removeEventListener('test', cb, false);
    });

    it('Should trigger given event', () => {
        const cb = sinon.spy();
        const b = document.body;

        b.addEventListener('test', cb, false);

        (0, _trigger2.default)(b, 'test');
        expect(cb).to.have.been.called;

        b.removeEventListener('test', cb, false);
    });

    it('Should trigger multiple event', () => {
        const cb = sinon.spy();
        const cb2 = sinon.spy();
        const b = document.body;

        b.addEventListener('test', cb, false);
        b.addEventListener('test2', cb2, false);

        (0, _trigger2.default)(b, 'test test2');
        (0, _trigger2.default)(b, ['test', 'test2']);

        expect(cb).to.have.been.calledTwice;
        expect(cb2).to.have.been.calledTwice;

        b.removeEventListener('test', cb, false);
        b.removeEventListener('test2', cb2, false);
    });

    it('Should trigger given event with extra data', () => {
        const cb = sinon.spy();
        const b = document.body;

        b.addEventListener('test', cb, false);

        (0, _trigger2.default)(b, 'test', { extra: 'test' });
        expect(cb).to.have.been.calledWith(sinon.match.has('detail', { extra: 'test' }));

        b.removeEventListener('test', cb, false);
    });
}); /* eslint-env node, mocha, browser */
/* global expect, sinon */