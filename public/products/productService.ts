export class ProductService {
    public static $inject = ['$http'];

    constructor(private $http: any) {}

    getProducts() {
        return products();
    }

    getProduct(id: number) {
        return products().filter(function(p) {
            return p.id === id;
        })[0];
    }

    postProduct(product: any) {
        return this.$http.post('/api/products', product).then(function(data: any) {
            return data;
        });
    }
}

//Sample data
function products() {
    return [
        {
            id: 1,
            name: 'Amazing Widget',
            color: 'Red',
            price: 2.5,
        },
        {
            id: 2,
            name: 'Incredible Widget',
            color: 'Blue',
            price: 2.5,
        },
        {
            id: 3,
            name: 'Fantastic Widget',
            color: 'Yellow',
            price: 2.5,
        },
        {
            id: 4,
            name: 'Collectible Widget Tote Bag',
            color: 'Sand',
            price: 10,
        },
    ];
}
