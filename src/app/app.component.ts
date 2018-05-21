import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { AuthService } from './auth/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

    constructor(public location: Location, public auth: AuthService) {
        auth.handleAuthentication();
    }

    ngOnInit() {
    }

    isMap(path) {
        const title = this.location.prepareExternalUrl(this.location.path()).slice(1);
        return path !== title;
    }
}
