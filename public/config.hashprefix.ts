hashPrefixConfig.$inject = ['$locationProvider'];
export function hashPrefixConfig($locationProvider: ng.ILocationProvider): void {
    $locationProvider.hashPrefix('');
}
