import { Provider } from '@angular/compiler/src/core';

export function httpServiceFactory(i: any) {
    return i.get('$http');
}

export const httpServiceProvider = {
    provide: '$http',
    useFactory: httpServiceFactory,
    deps: ['$injector'],
};
