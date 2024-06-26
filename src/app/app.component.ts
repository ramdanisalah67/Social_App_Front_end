import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './Services/auth.service';
import { CheckConnectivityService } from './Services/check-connectivity.service';
import { LoadingService } from './Services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  isConnected:boolean=false
  isLoading = true;

  constructor(public loadService:LoadingService,private router:Router){
  }
  ngOnInit(): void {

   
  }
  

  receiveData(data: any) {
    console.log(data);  // Outputs: 'Data from Child'
  }
}
