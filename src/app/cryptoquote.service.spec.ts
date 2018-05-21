import { TestBed, inject } from '@angular/core/testing';

import { CryptoQuote } from './cryptoquote.service';
import {WebsocketService} from './websocket.service';

describe('CryptoQuote', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [CryptoQuote, WebsocketService]
		});
	});

	it('should be created', inject([CryptoQuote], (service: CryptoQuote) => {
		expect(service).toBeTruthy();
	}));
});
