import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FriendReqRes } from 'src/app/Models/FriendReqRes';
import { AuthService } from 'src/app/Services/auth.service';
import { FriendsService } from 'src/app/Services/friends.service';
import { ImageProcessingService } from 'src/app/Services/image-processing.service';

@Component({
  selector: 'app-all-friends',
  templateUrl: './all-friends.component.html',
  styleUrls: ['./all-friends.component.scss'],
})
export class AllFriendsComponent   implements OnInit {
  friends:any[] =[]
  message:string[]=[]
  activeTab: string = 'suggestions';
  constructor(private friendService:FriendsService,private authService:AuthService,private router:Router,private imageProcess:ImageProcessingService) { }
    ngOnInit() {
      let email = localStorage.getItem('email')
      if(email) {
        console.log(email)
        this.friendService.getFriends(email).subscribe(
          data=>{
            console.log(data)
  
            this.friends= data
            for (let index = 0; index < this.friends.length; index++) {
              this.imageProcess.createImage(this.friends[index].user)
              
            }
            console.log(this.friends)
          
          })
      }
    }
  
    showProfile(email:string){
      console.log(email)
      localStorage.setItem("target",email)
      this.router.navigate(['userProfile'])
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
  