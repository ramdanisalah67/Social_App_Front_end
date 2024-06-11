import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserstateService {
  API="http://localhost:8090/api/user-state/"
  constructor(private http:HttpClient) { }


 

  public friendsOnline(email:string):Observable<any>{
    return this.http.get(this.API+'freinds-online?email='+email)
  }
}
