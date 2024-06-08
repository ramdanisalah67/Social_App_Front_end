import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }


  public loaded():boolean{
    if(localStorage.getItem('loading')){
      return true
    }
    else return false
  }

  public start(){
    localStorage.setItem('loading','true')
  
  }
  public stop(){
    localStorage.removeItem('loading')
  
  }

  hidelogin(){
    setTimeout(() => {
      localStorage.removeItem('loading')
    }, 3000); // Adjust the timeout duration as needed
  }
}
