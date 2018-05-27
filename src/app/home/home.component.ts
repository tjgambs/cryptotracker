import {Component, NgModule, OnInit} from '@angular/core';
import { WebsocketService } from '../websocket.service';
import { CryptoQuote, Quote } from '../cryptoquote.service';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    providers: [ WebsocketService, CryptoQuote ]
})

export class HomeComponent implements OnInit {

    public quotes: { [key: string]: Quote; } = {};

    public selectedCurrency: string = 'BTCUSD';
    public currencies: string[] = ['BTCUSD', 'LTCUSD', 'ETHUSD'];

    constructor(private cryptoQuote: CryptoQuote) {

    }

    ngOnInit() {
        const t = this;
        this.cryptoQuote.quotes.subscribe(quote => {
            if (quote.exchange) {
                const key = quote.exchange.name + quote.symbol;
                t.quotes[key] = quote;
            }
        });
    }
}
