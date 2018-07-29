describe('Customer Service', () => {
    let $httpMock, customerService;

    beforeEach(function() {
        angular.mock.module('app');

        $httpMock = sinon.stub({ get: angular.noop, post: angular.noop });

        angular.mock.module(function($provide) {
            $provide.value('$http', $httpMock);
        });

        angular.mock.inject(function($injector) {
            customerService = $injector.get('customerService');
        });
    });

    describe('getCustomers()', () => {
        it('gets /api/customers', () => {
            customerService.getCustomers();
            expect($httpMock.get).to.be.calledOnceWith('/api/customers');
        });
    });

    describe('getCustomer(id: number)', () => {
        it('gets /api/customers/id', () => {
            customerService.getCustomer(123);
            expect($httpMock.get).to.be.calledOnceWith('/api/customers/123');
        });
    });

    describe('postCustomer(customer)', () => {
        it('posts /api/customers', () => {
            const customer = {
                dummy: 'customer',
            };
            customerService.postCustomer(customer);
            expect($httpMock.post).to.be.calledOnceWith('/api/customers', customer);
        });
    });
});
