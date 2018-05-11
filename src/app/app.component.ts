import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

    constructor(public location: Location) {}

    ngOnInit(){
    }

    isMap(path){
        var titlee = this.location.prepareExternalUrl(this.location.path()).slice(1);
        return path != titlee;
    }
}
