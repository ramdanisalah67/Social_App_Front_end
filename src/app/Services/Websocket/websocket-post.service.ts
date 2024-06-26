

  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Stomp, StompSubscription } from '@stomp/stompjs';
  import * as SockJS from 'sockjs-client';
  import { Subject, Observable } from 'rxjs';
  import { NotificationItem } from 'src/app/Models/NotificationItem';
  import { State } from 'src/app/Models/State';
  @Injectable({
    providedIn: 'root'
  })
  export class WebsocketPostService {
  
  
    public stompClient: any;
    private messageSubject: Subject<any> = new Subject<any>();
  
  
    constructor(private http: HttpClient) { 
      this.initConnectionSocket()
      }
  
    initConnectionSocket():Boolean {
      let authToken = localStorage.getItem("token")
      let connectionSuccess:boolean = false
      const socket = new SockJS('http://localhost:8090/posts?token='+authToken);
      this.stompClient = Stomp.over(socket);
  
      this.stompClient.connect({}, () => {
        console.log('Connected to postttttttttttttttttttttttttttttt-service websocket !!');
        this.subscribeToMessages()
        connectionSuccess = true 
        console.log(connectionSuccess)
      });
      return connectionSuccess
    }
  
  
   
    public subscribeToMessages() {
      this.stompClient.subscribe('/user/queue/posts', (message: any) => {
        console.log('Received message from post-service:', message);
        const notification: State = JSON.parse(message.body);
        this.messageSubject.next(notification);
       
      });
    }
  
    public getMessages(): Observable<State> {
      return this.messageSubject
    }
  }
  