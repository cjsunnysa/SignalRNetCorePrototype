import { Component, OnInit, OnDestroy } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
    private _hubConnection: HubConnection | undefined;
    public async: any;
    message = '';
    messages: string[] = [];

    constructor() {

    }

    private receiveLoopyHub = (data: any) => {
        const received = `Received ${data}`;
        this.messages.push(received);
    }

    public sendMessage(): void {
        const data = `Sent: ${this.message}`;

        if (this._hubConnection) {
            this._hubConnection.invoke("Send", data);
        }

        this.messages.push(data);
    }

    ngOnInit(): void {
        this._hubConnection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:44339/basichub')
            .configureLogging(signalR.LogLevel.Information)
            .build();

        this._hubConnection.start().catch(err => console.error(err.toString()));

        this._hubConnection.on('Send', this.receiveLoopyHub);
    }

    ngOnDestroy(): void {
        this._hubConnection.off('Send', this.receiveLoopyHub);
    }
}
