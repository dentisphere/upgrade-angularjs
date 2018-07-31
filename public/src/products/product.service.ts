import { Injectable, Inject } from '@angular/core';

@Injectable()
export class ProductService {
    public static $inject = ['$http'];

    constructor(@Inject('$http') private $http: ng.IHttpService) {}

    async getProducts(): Promise<any[]> {
        const response = await this.$http.get<any[]>('/api/products');
        return response.data;
    }

    async getProduct(id: number): Promise<any> {
        const response = await this.$http.get<any>(`/api/products/${id}`);
        return response.data;
    }

    async postProduct(product: any): Promise<any> {
        const response = await this.$http.post<any>('/api/products', product);
        return response.data;
    }
}
