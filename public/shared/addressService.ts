export class AddressService {
    getFullAddress(customer: any) {
        return customer.address1 + ', ' + customer.city + ', ' + customer.state + ' ' + customer.zip;
    }
}
