import { Component, OnInit } from '@angular/core';
import { FriendReqRes } from 'src/app/Models/FriendReqRes';
import { AuthService } from 'src/app/Services/auth.service';
import { FriendsService } from 'src/app/Services/friends.service';

@Component({
  selector: 'app-no-friend-user',
  templateUrl: './no-friend-user.component.html',
  styleUrls: ['./no-friend-user.component.scss'],
})
export class NoFriendUserComponent   implements OnInit {
  suggestions:any[] =[]
  message:string[]=[]
  activeTab: string = 'suggestions';
  constructor(private friendService:FriendsService,private authService:AuthService) { }
    ngOnInit() {
      let email = localStorage.getItem('email')
      if(email) {
        console.log(email)
        this.friendService.getUserHaveCommonFriends(email).subscribe(
          data=>{
  
            this.suggestions= data
            console.log(this.suggestions)
          
          })
      }
    }
  
  
    sendInvitation(emailDestination:string,i:number){
      
        console.log(i)
        let friendRequest:FriendReqRes = new FriendReqRes()
          friendRequest.sender = localStorage.getItem('email')|| ""
          friendRequest.receiver = emailDestination
        this.friendService.FriendRequest(friendRequest).subscribe(data=>{
          console.log(data)
          if(data.status == '200') this.message[i]= "invitation sent"
          
  
        })
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
  