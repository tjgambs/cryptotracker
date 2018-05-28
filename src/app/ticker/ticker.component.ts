import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'ticker',
    templateUrl: './ticker.component.html'
})

export class TickerComponent implements OnInit {

    @Input()
    public exchange: string;

    @Input()
    public currency: string;

    @Input()
    public quotes: any;

    constructor() {

    }

    ngOnInit() {}
}
