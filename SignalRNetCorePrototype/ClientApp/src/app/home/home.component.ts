import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
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

    constructor(@Inject('BASE_URL') private _baseUrl: string) {

    }

    private receivedFromHub = (data: any) => {
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
            .withUrl(this._baseUrl + '/basichub')
            .configureLogging(signalR.LogLevel.Information)
            .build();

        this._hubConnection.start().catch(err => console.error(err.toString()));

        this._hubConnection.on('Send', this.receivedFromHub);
    }

    ngOnDestroy(): void {
        this._hubConnection.off('Send', this.receivedFromHub);
    }
}
