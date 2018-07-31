import { Injectable, Inject } from '@angular/core';
import { Product } from './product.interface';

@Injectable()
export class ProductService {
    public static $inject = ['$http'];

    constructor(@Inject('$http') private $http: ng.IHttpService) {}

    async getProducts(): Promise<Product[]> {
        const response = await this.$http.get<Product[]>('/api/products');
        return response.data;
    }

    async getProduct(id: number): Promise<Product> {
        const response = await this.$http.get<Product>(`/api/products/${id}`);
        return response.data;
    }

    async postProduct(product: Product): Promise<Product> {
        const response = await this.$http.post<Product>('/api/products', product);
        return response.data;
    }
}
