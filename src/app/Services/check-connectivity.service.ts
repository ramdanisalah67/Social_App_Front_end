import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckConnectivityService {

  constructor() { }


public  userConnected():boolean{
  
    if(localStorage.getItem('token')){
      return true
    }
    else return false
  }


  public userEmail():string
      {
        if(localStorage.getItem("email")){
          return localStorage.getItem("email")|| ""
        }
        return "unkown"
      }
      

      public userfullName():string
      {
        if(localStorage.getItem("fullName")){
          return localStorage.getItem("fullName")|| ""
        }
        return "unkown"
      }
}
