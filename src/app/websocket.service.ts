import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';

/* We’ll need to import * from the rxjs library at the top of our new service. 
This will allow us to create the subject that will both observe and be 
observable. This essentially means our subject will watch our websocket for 
any incoming messages and will broadcast these messages to any components 
that happen to be subscribing to this service. */


@Injectable()
export class WebsocketService {
    constructor() { }

    private subject: Rx.Subject<MessageEvent>;

    public connect(url): Rx.Subject<MessageEvent> {
        if (!this.subject) {
            this.subject = this.create(url);
            console.log("Successfully connected: " + url);
        } 
        return this.subject;
    }

    private create(url): Rx.Subject<MessageEvent> {
        let ws = new WebSocket(url);
        let observable = Rx.Observable.create(
            (obs: Rx.Observer<MessageEvent>) => {
                ws.onmessage = obs.next.bind(obs);
                ws.onerror = obs.error.bind(obs);
                ws.onclose = obs.complete.bind(obs);
                return ws.close.bind(ws);
            })
        let observer = {
            next: (data: Object) => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify(data));
                }
            }
        }
        return Rx.Subject.create(observer, observable);
    }
}