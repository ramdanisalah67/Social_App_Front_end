import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FriendsService } from 'src/app/Services/friends.service';
import { ImageProcessingService } from 'src/app/Services/image-processing.service';
import { ListfriendsDialogComponent } from '../listfriends-dialog/listfriends-dialog.component';

@Component({
  selector: 'app-userprofile-page-profile',
  templateUrl: './userprofile-page-profile.component.html',
  styleUrls: ['./userprofile-page-profile.component.scss'],
})
export class UserprofilePageProfileComponent  implements OnInit {
  email= ""
  target=""
  userProfile:any
  friends:any[]=[]
  constructor(private relationShipService:FriendsService,private imageProcess:ImageProcessingService, public dialog: MatDialog) { }

  ngOnInit() {
    this.email = localStorage.getItem("email") || ""
    this.target = localStorage.getItem("target") || ""
    console.log("helloooooooooooooooooooooooooooooooooooooooooooo")
    this.relationShipService.getProfilInfoWithFriends(this.target,this.email).subscribe(data=>{
      console.log(data)
   
    
        this.userProfile = data.user
        this.friends = data.friends
        console.log(this.userProfile)
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

  
}
