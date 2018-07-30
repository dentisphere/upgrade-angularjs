describe('stubbing a class', () => {
    class Foo {
        constructor() {
            this.title = 'the title';
        }
        bar() {
            return 'hello';
        }
        throwingErrorMethod() {
            throw 'boom!';
        }
        generateRandomValue() {
            return Math.floor(Math.random() * 1000);
        }
        methodOne() {}
        methodTwo() {}
    }

    // dummy initialization to get vsc autocompletion.
    let stub = sinon.createStubInstance(Foo);

    describe('using createStubInstance', () => {
        beforeEach(() => {
            stub = sinon.createStubInstance(Foo);
        });

        it('stub has same method as original class', () => {
            expect(stub).respondsTo('bar');
        });

        it('stubbed method returns undefined by default', () => {
            expect(stub.bar()).to.be.undefined;
        });

        it('method are stubs that can be asserted with sinon expectation', () => {
            stub.bar();
            expect(stub.bar).to.have.been.calledOnce;
        });

        it('property added in constructor does not exist', () => {
            expect(stub.title).to.be.undefined;
        });

        it('stubbed method does nothing', () => {
            expect(() => stub.throwingErrorMethod()).to.not.throw();
        });
    });

    describe('using an existing object', () => {
        let instanceOfFoo;
        beforeEach(() => {
            instanceOfFoo = new Foo();
            stub = sinon.stub(instanceOfFoo);
        });

        it('inital object and stubbed object are the same', () => {
            expect(stub).to.be.equal(instanceOfFoo);

            instanceOfFoo.methodOne();
            expect(stub.methodOne).to.have.been.called;

            stub.methodTwo();
            expect(instanceOfFoo.methodTwo).to.have.been.called;
        });

        it('property added in constructor is defined', () => {
            expect(stub.title).to.equal('the title');
        });

        it('stubbed method does nothing', () => {
            expect(() => stub.throwingErrorMethod()).to.not.throw();
        });
    });

    describe('makes stub method returning value', () => {
        beforeEach(() => {
            stub = sinon.createStubInstance(Foo);
        });

        it('returning always same value', () => {
            stub.generateRandomValue.returns(123);
            expect(stub.generateRandomValue()).to.equal(123);
            expect(stub.generateRandomValue()).to.equal(123);
            expect(stub.generateRandomValue()).to.equal(123);
        });

        it('returning specific values at each call (no default)', () => {
            stub.generateRandomValue.onCall(0).returns(123);
            stub.generateRandomValue.onCall(1).returns(456);
            stub.generateRandomValue.onCall(2).returns(789);

            expect(stub.generateRandomValue()).to.equal(123);
            expect(stub.generateRandomValue()).to.equal(456);
            expect(stub.generateRandomValue()).to.equal(789);
            expect(stub.generateRandomValue()).to.be.undefined;
        });

        it('returning specific values at each call (with default)', () => {
            stub.generateRandomValue.returns(-1);
            stub.generateRandomValue.onCall(2).returns(789);

            expect(stub.generateRandomValue()).to.equal(-1);
            expect(stub.generateRandomValue()).to.equal(-1);
            expect(stub.generateRandomValue()).to.equal(789);
            expect(stub.generateRandomValue()).to.equal(-1);
        });

        it('return value computed with passed arguments', () => {
            stub.methodOne.callsFake(a => a * 2);

            expect(stub.methodOne(25)).to.equal(50);
            expect(stub.methodOne(111)).to.equal(222);
        });

        it.skip('return promise', async () => {
            stub.methodOne.resolves(456);
            const val = await stub.methodOne();
            expect(val).to.equal(456);
        });
    });
});
