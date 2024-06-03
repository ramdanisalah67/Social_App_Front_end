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

  constructor(private http:HttpClient) { }


  login(userLogin:any):Observable<any>{
    return this.http.post(this.API+'auth',userLogin)
  }

  register(userRegister:RegistredUser):Observable<any>{
    console.log(userRegister)
    return this.http.post(this.API+'register',userRegister)
  }

}
