import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';

/* Meant to interface with our websockets and will act as a type of adapter
which will adapt the output from our websocket into a form that we can easily
work with in the frontend. */

const CRYPTO_URL = 'wss://feed.cryptoquote.io/v1/firehose/f4a7f5f0-4011-11e8-8b4d-a9b47e52a224';

export interface Exchange {
  name: string;
  market: string;
}

export interface Quote {
  symbol: string;
  updated: number;
  exchange: Exchange;
  lastUpdateType: string;
  lastTickerTime: number;
  bid: string;
  bidSize: string;
  ask: string;
  askSize: string;
  lastTradeTime: number;
  lastTradePrice: string;
  lastTradeSize: string;
  lastTradeSide: string;
  updateType: string;
}

@Injectable()
export class CryptoQuote {

    public quotes: Subject<Quote>;

    constructor(wsService: WebsocketService) {
        this.quotes = <Subject<Quote>>wsService
            .connect(CRYPTO_URL)
            .map((response: MessageEvent): Quote => {
                const data = JSON.parse(response.data);
                return data;
            });
    }
}

