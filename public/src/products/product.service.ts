import { Injectable, Inject } from '@angular/core';
import { Product } from './product.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ProductService {
    constructor(private http: HttpClient) {}

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>('/api/products');
    }

    getProduct(id: number): Observable<Product> {
        return this.http.get<Product>(`/api/products/${id}`);
    }

    postProduct(product: Product): Observable<Product> {
        return this.http.post<Product>('/api/products', product);
    }
}
