import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';

const CRYPTO_URL = 'wss://feed.cryptoquote.io/v1/firehose/f4a7f5f0-4011-11e8-8b4d-a9b47e52a224';

export interface Exchange {
	name: string,
	market: string
}

export interface Message {
	symbol: string,
	updated: number,
	exchange: Exchange,
	lastUpdateType: string,
	lastTickerTime: number,
	bid: string,
	bidSize: string,
	ask: string,
	askSize: string,
	lastTradeTime: number,
	lastTradePrice: string,
	lastTradeSize: string,
	lastTradeSide: string,
	updateType: string
}

@Injectable()
export class CryptoQuote {
	public messages: Subject<Message>;

	constructor(wsService: WebsocketService) {
		this.messages = <Subject<Message>>wsService
			.connect(CRYPTO_URL)
			.map((response: MessageEvent): Message => {
				let data = JSON.parse(response.data);
				return data;
			});
	}
}
