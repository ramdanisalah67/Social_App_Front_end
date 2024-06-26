import { Component, OnInit } from '@angular/core';
import { UserInfoService } from 'src/app/Services/user-info.service';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss'],
})
export class ChangePasswordDialogComponent  implements OnInit {
email =""
error=""
message=""
  req = {
    'email':'',
    'oldPassword':'',
    'newPassword':''
  }
  constructor(private userinfoService:UserInfoService) { }

  ngOnInit() {
    this.email= localStorage.getItem("email") || ""
    this.req.email=this.email
  }




  setPassword(){
    this.message= ""
    this.error= ""

    console.log(this.req)
    this.userinfoService.setPassword(this.req).subscribe(data=>{
      console.log(data)
      if(data.status == '200'){
        this.message= "passwoed updated success !!"
        this.req.newPassword=""
        this.req.oldPassword=""
        this.error=""
      }
      if(data.status == '400'){
        this.error= "passwoed wrong"
 
        this.message=""
      }
    })
  }
}
