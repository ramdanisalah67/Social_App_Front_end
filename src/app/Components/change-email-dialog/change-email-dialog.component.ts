import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserInfoService } from 'src/app/Services/user-info.service';

@Component({
  selector: 'app-change-email-dialog',
  templateUrl: './change-email-dialog.component.html',
  styleUrls: ['./change-email-dialog.component.scss'],
})
export class ChangeEmailDialogComponent  implements OnInit {

  user:any
  email=""
  message=""
  error=""
  code=""
  req1 = {
    'emailEntred':'',
    'actualEmail':''
  }
  newEmail=""
  visibility1="none"
  visibility2="none"
  visibility3="none"

  constructor(public dialogRef:MatDialogRef<ChangeEmailDialogComponent>, @Inject(MAT_DIALOG_DATA) public data:any,private userInfo:UserInfoService){
  this.user= data.user
  console.log(this.user)
  }
    ngOnInit() {
      if(localStorage.getItem("v-1")){
        this.visibility1='block'
      }
    else  if(localStorage.getItem("v-2")){
        this.visibility2='block'
      }
     else if(localStorage.getItem("v-3")){
        this.visibility3='block'
      }
      else {
        this.visibility1='block'

      }
      this.email = localStorage.getItem("email") || ""
      this.req1.actualEmail=this.email
 

    }
 
    
    sendCodeEmail(){
      console.log(this.req1)
      this.message=""
      this.error=""
      this.userInfo.sendCodeEmail(this.req1).subscribe(data=>{
        console.log(data)
        if(data.status == '200'){
          this.message= "Please Check your email we sent you a code "
          this.error=""
          this.visibility1="none"
          this.visibility2="block"
          this.visibility3="none"
          localStorage.setItem("v-2","v-2")
        }
        if(data.status == '401'){
          this.error= "Email not found or not yours "
          this.message=""
        }
      })
    }


    verifyCode(){
      let req = {
        'email': this.email,
        'code':this.code
      }
        this.userInfo.verifyCode(req).subscribe(data=>{
          console.log(data)
          if(data.status=="200"){
            this.message=""
            this.error=""
            this.visibility1="none"
            this.visibility2="none"
            this.visibility3="block"
            localStorage.removeItem("v-2")
            localStorage.setItem("v-3","v-3")
          }
        })
    }

    changeEmail() {
      let req = {
        'oldEmail':this.email,
        'newEmail':this.newEmail
      }
      console.log(req)
      this.userInfo.changeEmail(req).subscribe(data=>{
        console.log(data)
        if(data.status == '200'){
          this.message="Email updated"
          this.error=""
          localStorage.setItem("email",this.newEmail)
          localStorage.removeItem("v-3")

        }
        if(data.status == '401'){
          this.error="Email Already Exist"
          this.message=""
        }

      })
    }



}
