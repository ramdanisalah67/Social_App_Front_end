import { Component, OnInit } from '@angular/core';
import { FriendReqRes } from 'src/app/Models/FriendReqRes';
import { RegistredUser } from 'src/app/Models/RegistredUser';
import { Suggestion } from 'src/app/Models/Suggestion';
import { AuthService } from 'src/app/Services/auth.service';
import { FriendsService } from 'src/app/Services/friends.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent  implements OnInit {
suggestions:any[] =[]
message:string[]=[]
activeTab: string = 'suggestions';
constructor(private friendService:FriendsService,private authService:AuthService) { }
  ngOnInit() {
 
  }



}
