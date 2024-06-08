import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FriendReqRes } from '../Models/FriendReqRes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  API= "http://localhost:8090/api/relations/"

  constructor(private http:HttpClient) { }


  public FriendRequest(request:FriendReqRes):Observable<any>{

    return this.http.post(this.API+'friend-request',request)
  } 

  public FriendResponse(request:FriendReqRes):Observable<any>{

    return this.http.post(this.API+'confirm-friend-request',request)
  }
  
  
  public rejectRequest(request:FriendReqRes):Observable<any>{

    return this.http.post(this.API+'reject-request',request)
  }
  
  
  public getUserHaveCommonFriends(email:string):Observable<any>{

    return this.http.get(this.API+'common-friend/'+email)
  } 

  
  public getFriends(email:string):Observable<any>{

    return this.http.get(this.API+'friends/'+email)
  }
  
  
  public getFriendsRequest(email:string):Observable<any>{

    return this.http.get(this.API+'request/'+email)
  } 
  public getConfirmations(email:string):Observable<any>{

    return this.http.get(this.API+'confirmations/'+email)
  } 

}
