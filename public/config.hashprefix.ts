hashPrefixConfig.$inject = ['$locationProvider'];
export function hashPrefixConfig($locationProvider: ng.ILocationProvider) {
    $locationProvider.hashPrefix('');
}
