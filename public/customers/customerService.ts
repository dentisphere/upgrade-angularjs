import * as _ from 'lodash';

export class CustomerService {
    public static $inject = ['$http'];

    constructor(private $http: ng.IHttpService) {}

    getCustomers(): ng.IPromise<any[]> {
        return this.$http.get('/api/customers').then((response: any) => response.data);
    }

    getCustomer(id: number): ng.IPromise<any> {
        return this.$http.get(`/api/customers/${id}`).then((response: any) => response.data);
    }

    postCustomer(customer: any): ng.IPromise<any> {
        return this.$http.post('/api/customers', customer).then((data: any) => {
            return data;
        });
    }
}
