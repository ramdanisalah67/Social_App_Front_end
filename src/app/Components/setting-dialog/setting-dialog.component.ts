import { Component, ElementRef, EventEmitter, HostListener, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ImageProcessingService } from 'src/app/Services/image-processing.service';
import { ChangefullNameDialogComponent } from '../changefull-name-dialog/changefull-name-dialog.component';
import { AuthService } from 'src/app/Services/auth.service';
import { map } from 'rxjs';
import { ConnectUser } from 'src/app/Models/ConnectedUser';
import { ChangeEmailDialogComponent } from '../change-email-dialog/change-email-dialog.component';
import { ChangePasswordDialogComponent } from '../change-password-dialog/change-password-dialog.component';



@Component({
  selector: 'app-setting-dialog',
  templateUrl: './setting-dialog.component.html',
  styleUrls: ['./setting-dialog.component.scss'],
})
export class SettingDialogComponent  implements OnInit {
  user:any
 
  @Output() clickOutside = new EventEmitter<void>();

 
  constructor(private elementRef: ElementRef,private dialog:MatDialog,private authService:AuthService,private imageProcess:ImageProcessingService){}

    @HostListener('document:click', ['$event.target'])
    onClick(target: HTMLElement) {
      const clickedInside = this.elementRef.nativeElement.contains(target);
      if (!clickedInside) {
        this.clickOutside.emit();
      }
    }


  ngOnInit() {
  
    let email = localStorage.getItem("email") || ""
    this.authService.findUserByEmail(email).pipe(
      map((userFound: ConnectUser) => {
          // Process the image and return the modified user object
          userFound = this.imageProcess.createImageForUser(userFound);
          return userFound;
      })
  ).subscribe((data: ConnectUser) => {
      this.user = data;
      if(localStorage.getItem("setting-fullName") && this.user){
        console.log(this.user)
        this.goToFullNameDialog(this.user)
      }
      if(localStorage.getItem("setting-password") && this.user){
        console.log(this.user)
        this.goToPasswordDialog(this.user)
      }
      if(localStorage.getItem("setting-email") && this.user){
        console.log(this.user)
        this.goToEmailDialog(this.user)
      }
  });
  
}

  
 

  goToFullNameDialog(user:any){
    localStorage.setItem("setting-fullName","true");

    const dialogRef =  this.dialog.open(ChangefullNameDialogComponent,{
      width: '500px',
      height: '300px',  //kant 750px
      data:{
        user
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
      localStorage.removeItem("setting-fullName")
    });
  
  }
  goToEmailDialog(user:any){
    localStorage.setItem("setting-email","true");

    const dialogRef =  this.dialog.open(ChangeEmailDialogComponent,{
      width: '500px',
      height: '300px',  //kant 750px
      data:{
        user
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
      localStorage.removeItem("setting-email")
    });
  }
  goToPasswordDialog(user:any){
    localStorage.setItem("setting-password","true");

    const dialogRef =  this.dialog.open(ChangePasswordDialogComponent,{
      width: '500px',
      height: '300px',  //kant 750px
      data:{
        user
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
      localStorage.removeItem("setting-password")
      localStorage.removeItem("setting-email")
      localStorage.removeItem("setting-fullName")
      localStorage.removeItem("v-1")
      localStorage.removeItem("v-2")
      localStorage.removeItem("v-3")


    });
  }
 
}
