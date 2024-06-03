import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { CheckConnectivityService } from 'src/app/Services/check-connectivity.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{
  isConnected:boolean=false
  constructor(public checkService:CheckConnectivityService){}
  ngOnInit(): void {
      if(localStorage.getItem('token')){
        this.isConnected=true
        console.log("connected")
      }
      else {
        console.log("not  connected")

      }
  }

}
