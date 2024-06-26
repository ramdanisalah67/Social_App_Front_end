import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserInfoService } from 'src/app/Services/user-info.service';

@Component({
  selector: 'app-profile-info-dialog',
  templateUrl: './profile-info-dialog.component.html',
  styleUrls: ['./profile-info-dialog.component.scss'],
})
export class ProfileInfoDialogComponent  implements OnInit {
  userInfo:any
  message=""
  constructor(public dialogRef: MatDialogRef<ProfileInfoDialogComponent>,@Inject(MAT_DIALOG_DATA) public data:any,private userInfoService:UserInfoService) {
    this.userInfo = data.userInfo
    console.log("info details")
    console.log(this.userInfo)
  }

  ngOnInit() {
    if(!this.userInfo.languages){
      this.userInfo.languages="no data"
    }
    if(!this.userInfo.phoneNumber){
      this.userInfo.phoneNumber="no data"
    }
    console.log("dialog hhhh")
  }
  formatDate(date: string): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }


  updateUserInfo(){
        
      this.userInfoService.update(this.userInfo).subscribe(data=>{
        console.log(data)
        this.message="updated !"
      })
  }
}
