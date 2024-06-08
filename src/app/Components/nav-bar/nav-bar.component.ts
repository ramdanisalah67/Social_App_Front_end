import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistredUser } from 'src/app/Models/RegistredUser';
import { AuthService } from 'src/app/Services/auth.service';
import { CheckConnectivityService } from 'src/app/Services/check-connectivity.service';
import { LoadingService } from 'src/app/Services/loading.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{
  isConnected:boolean=false
  user:RegistredUser = new RegistredUser()
  constructor(public checkService:LoadingService,private router:Router,public authService:AuthService,public connectService:CheckConnectivityService){}
  ngOnInit(): void {
      if(localStorage.getItem('token')){
        this.isConnected=true
        this.user.email = localStorage.getItem('email') || ""
        this.user.fullName = localStorage.getItem('fullName') || ""

        console.log(this.user)
      }
      else {
        console.log("not  connected")

      }
  }



  logout(){
    this.checkService.start()
    localStorage.clear()
    this.router.navigate(['login'])
  }



  print(){
    console.log('hello')
  }
}
