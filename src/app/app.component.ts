import { Component } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { CryptoQuote, Quote } from './cryptoquote.service';

/* Inject the CryptoQuote service and subscribe to its list of quotes. */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ WebsocketService, CryptoQuote ]
})

export class AppComponent {

    public quotes: { [key: string] : Quote; } = {};
    public objectKeys = Object.keys;

    constructor(private cryptoQuote: CryptoQuote) {
        cryptoQuote.quotes.subscribe(quote => {
            if (quote.exchange) {
                let key = quote.exchange.name + quote.symbol;
                this.quotes[key] = quote;
            }
        });
    }
}
