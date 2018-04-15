import { Component } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { CryptoQuote } from './cryptoquote.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ WebsocketService, CryptoQuote ]
})
export class AppComponent {

	constructor(private chatService: CryptoQuote) {
		chatService.messages.subscribe(msg => {

      		console.log("Response from websocket: " + msg.symbol);

		});
	}
}