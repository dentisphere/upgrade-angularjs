import { Injectable } from '@angular/core';

//We don't need or use this authentication service,
//it's just here to illustrate shared services.

@Injectable()
export class AuthenticationService {
    authenticate(): boolean {
        return true;
    }
}
