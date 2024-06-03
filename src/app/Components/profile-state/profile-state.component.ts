import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-state',
  templateUrl: './profile-state.component.html',
  styleUrls: ['./profile-state.component.scss'],
})
export class ProfileStateComponent  implements OnInit {
  username=""
  constructor(private router:Router) { }

  ngOnInit() {
    if(localStorage.getItem('fullName')){
      this.username = localStorage.getItem('fullName')|| ""
    }
  }



  logout(){
    localStorage.removeItem('token')
    localStorage.setItem('loading','true')
    this.router.navigate(['login'])
  }

 
}
