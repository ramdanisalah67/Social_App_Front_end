import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotifService {
  API="http://localhost:8090/api/boite/"
  constructor(private http:HttpClient) { }


 

  public allNotifications(email:string):Observable<any>{
    return this.http.get(this.API+'notifications/'+email)
  }

  public readNotifications(boiteId:string):Observable<any>{
    return this.http.get(this.API+ 'read-notifications/'+boiteId)
  }

}
