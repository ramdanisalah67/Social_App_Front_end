import { Component, OnInit } from '@angular/core';
import { FriendReqRes } from 'src/app/Models/FriendReqRes';
import { AuthService } from 'src/app/Services/auth.service';
import { FriendsService } from 'src/app/Services/friends.service';

@Component({
  selector: 'app-all-friends',
  templateUrl: './all-friends.component.html',
  styleUrls: ['./all-friends.component.scss'],
})
export class AllFriendsComponent   implements OnInit {
  friends:any[] =[]
  message:string[]=[]
  activeTab: string = 'suggestions';
  constructor(private friendService:FriendsService,private authService:AuthService) { }
    ngOnInit() {
      let email = localStorage.getItem('email')
      if(email) {
        console.log(email)
        this.friendService.getFriends(email).subscribe(
          data=>{
            console.log(data)
  
            this.friends= data
            console.log(this.friends)
          
          })
      }
    }
  
  
 
  
    rejectInvitation(email_suggestion:string,i:number){
      let friendRequest:FriendReqRes = new FriendReqRes()
      friendRequest.sender = localStorage.getItem('email')|| ""
      friendRequest.receiver = email_suggestion
  
      this.friendService.rejectRequest(friendRequest).subscribe(
        data=>{
          if(data.status == '200') this.message[i]=""
          console.log(data)})
    }
  }
  