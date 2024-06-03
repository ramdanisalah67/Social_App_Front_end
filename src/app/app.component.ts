import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './Services/auth.service';
import { CheckConnectivityService } from './Services/check-connectivity.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  isConnected:boolean=false
  isLoading = true;

  constructor(public checkService:CheckConnectivityService,private router:Router){
  }
  ngOnInit(): void {

    setTimeout(() => {
      this.isLoading = false;
    }, 3000); // Adjust the timeout duration as needed
  }
  

  receiveData(data: any) {
    console.log(data);  // Outputs: 'Data from Child'
  }
}
