import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageProcessingService } from 'src/app/Services/image-processing.service';
import { UserInfoService } from 'src/app/Services/user-info.service';
import { ProfileInfoDialogComponent } from '../profile-info-dialog/profile-info-dialog.component';

@Component({
  selector: 'app-userprofile-page-info',
  templateUrl: './userprofile-page-info.component.html',
  styleUrls: ['./userprofile-page-info.component.scss'],
})
export class UserprofilePageInfoComponent  implements OnInit {

  userInfo:any
  BasicInfo:boolean=true
  personalInfo:boolean=false
  professionalInfo:boolean=false

  constructor(
    public dialog: MatDialog,private userInfoService:UserInfoService,
    private imageProcess:ImageProcessingService) {
  }

  ngOnInit() {
    let target = localStorage.getItem("target")|| ''
    let email = localStorage.getItem("email") || ''
    let req = {
      'target' : target,
      'actioner' : email
    }
    console.log(email)
    console.log(target)
    this.userInfoService.getInfoAboutUser(req).subscribe(data=>
      {
        this.userInfo = data
      
      })
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


  handleContent(){
    if(!this.userInfo.fullName && !this.userInfo.pays && !this.userInfo.bio && !this.userInfo.email && !this.userInfo.phoneNumber){
      this.BasicInfo=false
    }
  }
}
