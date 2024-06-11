import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistredUser } from '../Models/RegistredUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public session:boolean=false
  API="http://localhost:8090/api/identity-service/"
  media_api = "http://localhost:8090/api/media/"
  constructor(private http:HttpClient) { }


  login(userLogin:any):Observable<any>{
    return this.http.post(this.API+'auth',userLogin)
  }

  register(userRegister:RegistredUser):Observable<any>{
    console.log(userRegister)
    return this.http.post(this.API+'register',userRegister)
  }
  home():Observable<any>{
    return this.http.get(this.API+'home')
  }
  logout(token:string):Observable<any>{
    return this.http.get(this.API+'deconnect?token='+token)
  }

  addMedia(userRegister:FormData):Observable<any>{
    console.log(userRegister)
    return this.http.post(this.media_api+'save',userRegister)
  }
}
