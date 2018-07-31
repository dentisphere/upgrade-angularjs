import { Injectable, Inject } from '@angular/core';
import { Product } from './product.interface';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductService {
    constructor(private http: HttpClient) {}

    getProducts(): Promise<Product[]> {
        return this.http.get<Product[]>('/api/products').toPromise();
    }

    getProduct(id: number): Promise<Product> {
        return this.http.get<Product>(`/api/products/${id}`).toPromise();
    }

    postProduct(product: Product): Promise<Product> {
        return this.http.post<Product>('/api/products', product).toPromise();
    }
}
