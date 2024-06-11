import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stomp, StompSubscription } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Subject, Observable } from 'rxjs';
import { NotificationItem } from 'src/app/Models/NotificationItem';
@Injectable({
  providedIn: 'root'
})
export class WebSocketNotificationService {

  public stompClient: any;
  private messageSubject: Subject<NotificationItem> = new Subject<NotificationItem>();


  constructor(private http: HttpClient) { 
    }

  initConnectionSocket():Boolean {
    let authToken = localStorage.getItem("token")
    let connectionSuccess:boolean = false
    const socket = new SockJS('http://localhost:8090/mySocket?token='+authToken);
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect({}, () => {
      console.log('Connected to WebSocket');
      this.subscribeToMessages()
      connectionSuccess = true 
      console.log(connectionSuccess)
    });
    return connectionSuccess
  }


 
  public subscribeToMessages() {
    this.stompClient.subscribe('/user/queue/messages', (message: any) => {
      console.log('Received message:', message);
      const notification: NotificationItem = JSON.parse(message.body);
      this.messageSubject.next(notification);
     
    });
  }

  public getMessages(): Observable<NotificationItem> {
    return this.messageSubject
  }

}