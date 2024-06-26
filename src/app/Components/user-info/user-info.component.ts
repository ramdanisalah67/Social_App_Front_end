import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageProcessingService } from 'src/app/Services/image-processing.service';
import { LoadingService } from 'src/app/Services/loading.service';
import { ProfileInfoDialogComponent } from '../profile-info-dialog/profile-info-dialog.component';
import { HandleTimeService } from 'src/app/Services/handle-time.service';
import { UserInfoService } from 'src/app/Services/user-info.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent  implements OnInit {

  userInfo:any
  constructor(
    public dialog: MatDialog,private userInfoService:UserInfoService,
    private imageProcess:ImageProcessingService) {
  }
  ngOnInit() {
    let email = localStorage.getItem("email") || "";

    if(email.length>0){
      this.userInfoService.getUSerInfoByEmail(email).subscribe(data=>{
        console.log(data)
        this.userInfo=data
      })

    }
  }


  openDialog(enterAnimationDuration: string, exitAnimationDuration: string,userInfo:any): void {
    this.dialog.open(ProfileInfoDialogComponent, {
      width: '750px',
      height: '735px',  //kant 750px
      data:{
        userInfo
      },
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  showInfos(){
    this.openDialog('0ms','0ms',this.userInfo)
  }
}
