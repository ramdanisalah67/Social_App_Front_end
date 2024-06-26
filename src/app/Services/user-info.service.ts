import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  API="http://localhost:8090/api/profile/"
  API_account="http://localhost:8090/api/account/"

  constructor(private http:HttpClient) { }


 

  public update(userInfo:any):Observable<any>{
    return this.http.post(this.API+'update',userInfo)
  }

  public getUSerInfoByEmail(email:string):Observable<any>{
    return this.http.get(this.API+email)
  }

  public setPassword(req:any):Observable<any>{
    return this.http.post(this.API_account+'setPassword',req)
  }
  public setFullName(req:any):Observable<any>{
    return this.http.post(this.API_account+'setFullName',req)
  }
  public sendCodeEmail(req:any):Observable<any>{
    return this.http.post(this.API_account+'setEmail',req)
  }
  public verifyCode(req:any):Observable<any>{
    return this.http.post(this.API_account+'verify-code',req)
  }
  public changeEmail(req:any):Observable<any>{
    return this.http.post(this.API_account+'changeEmail',req)
  }
  public getPermissions(email:string):Observable<any>{
    return this.http.get(this.API+'getPermissions/'+email)
  }
  public setPermissions(req:any,email:string):Observable<any>{
    return this.http.post(this.API+'user-info-permissions/'+email,req)
  }
  public getInfoAboutUser(req:any):Observable<any>{
    return this.http.post(this.API+'getSpecificUserInfo',req)
  }
}
