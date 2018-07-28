import * as _ from 'lodash';

export class CustomerService {
    public static $inject = ['$http'];

    constructor(private $http: ng.IHttpService) {}

    async getCustomers(): Promise<any> {
        const response = await this.$http.get<any>('/api/customers');
        return response.data;
    }

    async getCustomer(id: number): Promise<any> {
        const response = await this.$http.get<any>(`/api/customers/${id}`);
        return response.data;
    }

    async postCustomer(customer: any): Promise<any> {
        const response = await this.$http.post<any>('/api/customers', customer);
        return response.data;
    }
}
