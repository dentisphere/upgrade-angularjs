hashPrefixConfig.$inject = ['$locationProvider'];
export function hashPrefixConfig($locationProvider: any) {
    $locationProvider.hashPrefix('');
}
