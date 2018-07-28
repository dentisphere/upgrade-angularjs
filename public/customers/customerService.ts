import * as _ from 'lodash';

export class CustomerService {
    public static $inject = ['$http'];

    constructor(private $http: ng.IHttpService) {}

    getCustomers(): ng.IPromise<any> {
        return this.$http.get<any>('/api/customers').then(response => response.data);
    }

    getCustomer(id: number): ng.IPromise<any> {
        return this.$http.get<any>(`/api/customers/${id}`).then(response => response.data);
    }

    postCustomer(customer: any): ng.IPromise<any> {
        return this.$http.post<any>('/api/customers', customer).then(data => {
            return data;
        });
    }
}
