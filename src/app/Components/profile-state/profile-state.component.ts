import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { ConnectUser } from 'src/app/Models/ConnectedUser';
import { AuthService } from 'src/app/Services/auth.service';
import { CheckConnectivityService } from 'src/app/Services/check-connectivity.service';
import { ImageProcessingService } from 'src/app/Services/image-processing.service';
import { LoadingService } from 'src/app/Services/loading.service';
import { SettingDialogComponent } from '../setting-dialog/setting-dialog.component';

@Component({
  selector: 'app-profile-state',
  templateUrl: './profile-state.component.html',
  styleUrls: ['./profile-state.component.scss'],
})
export class ProfileStateComponent  implements OnInit {

  user:ConnectUser= new ConnectUser()
 constructor(private dialog:MatDialog,private imageProcess:ImageProcessingService,public checkService:LoadingService,private router:Router,public authService:AuthService,public connectService:CheckConnectivityService){}


  ngOnInit() {
    console.log("profile")
    let email = localStorage.getItem("email") || "";
    if (email.length > 0) {
        this.authService.findUserByEmail(email).pipe(
            map((userFound: ConnectUser) => {
                // Process the image and return the modified user object
                userFound = this.imageProcess.createImageForUser(userFound);
                return userFound;
            })
        ).subscribe((data: ConnectUser) => {
            this.user = data;
        });
    }
    
  }




  logout(){
    localStorage.clear()
    this.checkService.start()

    this.router.navigate(['login'])

  }
  
  goToSetting(){
    this.router.navigate(['setting'])
  }
}
