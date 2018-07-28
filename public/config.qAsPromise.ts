// interesting trick found here : https://debuggerdotbreak.judahgabriel.com/2017/04/24/making-typescript-asyncawait-play-nice-with-angularjs-1-x/
// 'This kills two birds with one stone: we now have a Promise polyfill, and when these promises resolve, the scope will automatically be applied.'

qAsPromise.$inject = ['$q'];
export function qAsPromise($q: ng.IQService) {
    // Use Angular's Q object as Promise. This is needed to make async/await work properly with the UI.
    // See http://stackoverflow.com/a/41825004/536
    window['Promise'] = $q;
}
