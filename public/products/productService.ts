export class ProductService {
    public static $inject = ['$http'];

    constructor(private $http: any) {}

    getProducts(): Promise<any[]> {
        return this.$http.get('/api/products').then((response: any) => response.data);
    }

    getProduct(id: number): Promise<any> {
        return this.$http.get(`/api/products/${id}`).then((response: any) => response.data);
    }

    postProduct(product: any): Promise<any> {
        return this.$http.post('/api/products', product).then(function(data: any) {
            return data;
        });
    }
}
