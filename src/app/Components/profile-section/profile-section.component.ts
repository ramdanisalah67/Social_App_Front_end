import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FriendsService } from 'src/app/Services/friends.service';
import { ImageProcessingService } from 'src/app/Services/image-processing.service';
import { ListfriendsDialogComponent } from '../listfriends-dialog/listfriends-dialog.component';
import { UpdateImageProfileDialogComponent } from '../update-image-profile-dialog/update-image-profile-dialog.component';

@Component({
  selector: 'app-profile-section',
  templateUrl: './profile-section.component.html',
  styleUrls: ['./profile-section.component.scss'],
})
export class ProfileSectionComponent  implements OnInit {
email= ""
userProfile:any
friends:any[]=[]
  constructor(private relationShipService:FriendsService,private imageProcess:ImageProcessingService, public dialog: MatDialog) { }

  ngOnInit() {
    this.email = localStorage.getItem("email") || ""
    this.relationShipService.getProfilInfoWithFriends(this.email,this.email).subscribe(data=>{
      console.log(data)
      this.userProfile = data.user
      this.friends = data.friends
      this.imageProcess.createImageForUser(this.userProfile)
    })
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string,friends:any): void {
    this.dialog.open(ListfriendsDialogComponent, {
      width: '750px',
      height: '735px',  //kant 750px
      data: {
       friends
      },
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }


  displayFriends(){
    this.openDialog('0ms','0ms',this.friends)
  }

  updateProfileImage(){

    

  }

showImageDialog(enterAnimationDuration: string, exitAnimationDuration: string,user:any): void {
  this.dialog.open(UpdateImageProfileDialogComponent, {
    width: '750px',
    height: '735px',  //kant 750px
    data: {
     
    },
    enterAnimationDuration,
    exitAnimationDuration,
  });
}

}