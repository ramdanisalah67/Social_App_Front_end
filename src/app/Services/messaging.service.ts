import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {


  private dataSubject = new Subject<any>();

  BoiteItem$ = this.dataSubject.asObservable();


  API="http://localhost:8090/api/message/"
  constructor(private http:HttpClient) { }


  sednBoiteItem(data: any) {
    this.dataSubject.next(data);
  } 

  chargeAllBoiteItems(email:string):Observable<any>{
    return this.http.get(this.API+'charge/'+email)
  }

  getNewMessage(req:any):Observable<any>{
    return this.http.post(this.API+'newMessage',req)
  }
 
  getConversation(boiteItemId:string):Observable<any>{
    return this.http.get(this.API+'conversation/'+boiteItemId)
  }
  getNewMessageRef(messageRefId:string):Observable<any>{
    return this.http.get(this.API+'get-new-message/'+messageRefId)
  }
  sendMessage(messageRef:FormData):Observable<any>{
    return this.http.post(this.API+'send-message',messageRef)
  }
  viewMessages(boiteItem:string):Observable<any>{
    return this.http.get(this.API+'view-messages/'+boiteItem)
  }

  public isOpened():boolean {

    if(localStorage.getItem("boiteItem")){
      return true
    }
    return false
  }
}
