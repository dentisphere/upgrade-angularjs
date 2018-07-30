import * as angular from 'angular';
import 'angular-mocks';
import * as chai from 'chai'; // Using Expect style
import { expect } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { CustomerService } from './customerService';

chai.use(sinonChai);

describe('Customer Service (TS version)', () => {
    let $httpMock: any, customerService: CustomerService;
    const noop = () => {};

    beforeEach(function() {
        angular.mock.module('app');

        angular.mock.module(function($provide: any) {
            $httpMock = sinon.stub({ get: noop, post: noop });
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
