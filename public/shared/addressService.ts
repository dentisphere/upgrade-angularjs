export class AddressService {
    getFullAddress(customer: any): string {
        return customer.address1 + ', ' + customer.city + ', ' + customer.state + ' ' + customer.zip;
    }
}
