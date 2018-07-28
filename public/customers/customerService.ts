import * as _ from 'lodash';

export class CustomerService {
    public static $inject = ['$http'];

    constructor(private $http: any) {}

    getCustomers(): Promise<any[]> {
        return this.$http.get('/api/customers').then((response: any) => response.data);
    }

    getCustomer(id: number): Promise<any> {
        return this.$http.get(`/api/customers/${id}`).then((response: any) => response.data);
    }

    postCustomer(customer: any): Promise<any> {
        return this.$http.post('/api/customers', customer).then((data: any) => {
            return data;
        });
    }
}
