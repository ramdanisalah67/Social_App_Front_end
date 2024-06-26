import { Component, OnInit } from '@angular/core';
import { UserInfoService } from 'src/app/Services/user-info.service';

@Component({
  selector: 'app-userprofile-page',
  templateUrl: './userprofile-page.component.html',
  styleUrls: ['./userprofile-page.component.scss'],
})
export class UserprofilePageComponent  implements OnInit {

  constructor(private userInfoService:UserInfoService) { }

  ngOnInit() {
  
  }

}
