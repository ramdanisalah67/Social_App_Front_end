import { Component, OnInit } from '@angular/core';
import { FriendReqRes } from 'src/app/Models/FriendReqRes';
import { AuthService } from 'src/app/Services/auth.service';
import { FriendsService } from 'src/app/Services/friends.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class RequestComponent   implements OnInit {
  requests:any[] =[]
  message:string[]=[]
  activeTab: string = 'request';
  constructor(private friendService:FriendsService,private authService:AuthService) { }
    ngOnInit() {
      let email = localStorage.getItem('email')
      if(email) {
        console.log(email)
        this.friendService.getFriendsRequest(email).subscribe(
          data=>{
            console.log(data)
  
            this.requests= data
            console.log(this.requests)
          
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
          if(data.status == '200'){
            this.requests.splice(i,1)
          }
          console.log(data)})
    }

  }