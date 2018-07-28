export class ProductService {
    public static $inject = ['$http'];

    constructor(private $http: ng.IHttpService) {}

    getProducts(): ng.IPromise<any[]> {
        return this.$http.get('/api/products').then((response: any) => response.data);
    }

    getProduct(id: number): ng.IPromise<any> {
        return this.$http.get(`/api/products/${id}`).then((response: any) => response.data);
    }

    postProduct(product: any): ng.IPromise<any> {
        return this.$http.post('/api/products', product).then(function(data: any) {
            return data;
        });
    }
}
