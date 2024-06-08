import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stomp, StompSubscription } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotificationItem } from 'src/app/Models/NotificationItem';

@Injectable({
  providedIn: 'root'
})
export class WebSocketNotificationService {

  public stompClient: any;
  private messageSubject: BehaviorSubject<NotificationItem[]> = new BehaviorSubject<NotificationItem[]>([]);



  constructor(private http: HttpClient) {   }

  initConnectionSocket() {
    let authToken = localStorage.getItem("token")
    const socket = new SockJS('http://localhost:8090/mySocket?token='+authToken);
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect({}, () => {
      console.log('Connected to WebSocket');
      this.subscribeToMessages()
    });
  }


 
  subscribeToMessages() {
    this.stompClient.subscribe('/user/queue/messages', (message: any) => {
      console.log('Received message:', message);

   //   const messageDto: MessageDto = JSON.parse(message.body);
    //  this.messageSubject.next([...this.messageSubject.getValue(), messageDto]);
    });
  }



}