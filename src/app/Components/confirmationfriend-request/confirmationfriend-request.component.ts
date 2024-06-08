import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FriendReqRes } from 'src/app/Models/FriendReqRes';
import { AuthService } from 'src/app/Services/auth.service';
import { FriendsService } from 'src/app/Services/friends.service';
import { ConfirmRejectRequestFriendComponent } from '../confirm-reject-request-friend/confirm-reject-request-friend.component';
import { CongratFriendComponent } from '../congrat-friend/congrat-friend.component';

@Component({
  selector: 'app-confirmationfriend-request',
  templateUrl: './confirmationfriend-request.component.html',
  styleUrls: ['./confirmationfriend-request.component.scss'],
})
export class ConfirmationfriendRequestComponent   implements OnInit {
  confirmations:any[] =[]
  message:string[]=[]
  activeTab: string = 'suggestions';
  constructor(private friendService:FriendsService,private authService:AuthService,public dialog: MatDialog) { }
  ngOnInit() {
    let email = localStorage.getItem('email')
    if(email) {
      console.log(email)
      this.friendService.getConfirmations(email).subscribe(
        data=>{
          console.log(data)

          this.confirmations= data
          console.log(this.confirmations)
        
        })
    }
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string,i:number,email:string): void {
    const dialogRef = this.dialog.open(ConfirmRejectRequestFriendComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.handleDialogResponse(i,email);
      }
    });
  

  }  
  handleDialogResponse(i:number,email:string): void {
    this.confirmations.splice(i,1);
    let request:FriendReqRes= new FriendReqRes()
    request.sender =  email
    request.receiver = localStorage.getItem('email')|| "";
    this.friendService.rejectRequest(request).subscribe(data=>{
      console.log(data)
    })
  }
  


  confirmFriendRequest(enterAnimationDuration: string, exitAnimationDuration: string,i:number,user:any){
    
    let request:FriendReqRes = new FriendReqRes()
    request.sender = user.email 
    request.receiver = localStorage.getItem("email") || ""
    this.friendService.FriendResponse(request).subscribe(data=>{
      console.log(data)
      if(data.status == '200'){
        this.confirmations.splice(i,1);
        const dialogRef = this.dialog.open(CongratFriendComponent, {
          width: '350px',
          enterAnimationDuration,
          exitAnimationDuration,
          data : {
            user
          }
        });
      
      }
    })
 
  }

  }
