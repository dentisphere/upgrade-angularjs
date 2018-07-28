export class ProductService {
    public static $inject = ['$http'];

    constructor(private $http: ng.IHttpService) {}

    getProducts(): ng.IPromise<any[]> {
        return this.$http.get<any[]>('/api/products').then(response => response.data);
    }

    getProduct(id: number): ng.IPromise<any> {
        return this.$http.get<any>(`/api/products/${id}`).then(response => response.data);
    }

    postProduct(product: any): ng.IPromise<any> {
        return this.$http.post<any>('/api/products', product).then(function(data) {
            return data;
        });
    }
}
