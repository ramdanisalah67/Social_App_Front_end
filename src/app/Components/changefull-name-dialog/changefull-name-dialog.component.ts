import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserInfoService } from 'src/app/Services/user-info.service';

@Component({
  selector: 'app-changefull-name-dialog',
  templateUrl: './changefull-name-dialog.component.html',
  styleUrls: ['./changefull-name-dialog.component.scss'],
})
export class ChangefullNameDialogComponent  implements OnInit {
user:any
message=""
error=""
email=""
req= {
  'email':'',
  'newFullName':''
}
  constructor(public dialogRef:MatDialogRef<ChangefullNameDialogComponent>, @Inject(MAT_DIALOG_DATA) public data:any,private userInfoService:UserInfoService){
      this.user= data.user
      console.log(this.user)
  }

  ngOnInit() {
    this.email = localStorage.getItem("email")|| ""
    this.req.email=this.email
  }

  setFullNAme(){
    
    this.req.newFullName = this.user.fullName 
    this.userInfoService.setFullName(this.req).subscribe(data=>{
      console.log(data)
      if(data.status=='200'){
        this.message= "fullName updated"
        this.error =""

      }
      if(data.status == '401'){
        this.error = "fullName must be contains at least 8 caracteres"
        this.message=""
      }
    })
  }




}
