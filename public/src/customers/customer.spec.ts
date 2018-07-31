import * as angular from 'angular';
import 'angular-mocks';
import * as chai from 'chai'; // Using Expect style
import { expect } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { CustomerService } from './customer.service';
import { customersComponent } from './customers';

chai.use(sinonChai);

describe('Customers component', () => {
    let $componentController: angular.IComponentControllerService;
    let $rootScope: angular.IRootScopeService;

    let customerServiceStub: sinon.SinonStubbedInstance<CustomerService>;
    let componentController: any;
    let scope: angular.IScope;

    beforeEach(() => {
        angular.mock.module('app');

        angular.mock.module(function($provide: any) {
            customerServiceStub = sinon.createStubInstance(CustomerService);
            $provide.value('customerService', customerServiceStub);
        });

        angular.mock.inject((_$componentController_, _$rootScope_) => {
            $componentController = _$componentController_;
            $rootScope = _$rootScope_;
        });
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('controller only', () => {
        let $q: ng.IQService;
        beforeEach(inject(_$q_ => {
            $q = _$q_;
        }));

        beforeEach(() => {
            let scope = $rootScope.$new();
            let bindings = {};
            componentController = $componentController('customers', null, bindings);
        });

        it('title is customers', () => {
            expect(componentController.title).to.equal('Customers');
        });

        it.skip('loads all customers from customer service', async () => {
            customerServiceStub.getCustomers.resolves([{ fullName: 'Sergio' }, { fullName: 'Isabelle' }]);
            // // NOTE: $onInit is not triggered automatically
            await componentController.$onInit();
            expect(customerServiceStub.getCustomers).to.have.been.called;
            expect(componentController.customers)
                .to.be.an('array')
                .of.length(2);
        });
    });

    describe('compiled component', () => {
        let $compile: angular.ICompileService, $rootScope: angular.IRootScopeService;
        let $flushPendingTasks: any;
        let $q: angular.IQService;

        let $scope: angular.IScope;
        beforeEach(() => {
            angular.mock.inject((_$compile_, _$rootScope_, $componentController, _$q_) => {
                $compile = _$compile_;
                $rootScope = _$rootScope_;
                $q = _$q_;
            });
        });

        it('should have one data row per customer', () => {
            customerServiceStub.getCustomers.resolves([{ fullName: 'Sergio' }, { fullname: 'Isabelle' }]);

            var element: any = $compile('<customers></customers>')($rootScope);
            $rootScope.$apply();

            expect(customerServiceStub.getCustomers).to.have.been.called;
            expect(element.find('tbody').find('tr')).has.length(2);
        });
    });
});
