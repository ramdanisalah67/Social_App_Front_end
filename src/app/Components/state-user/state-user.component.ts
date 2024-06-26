import { Component, OnInit } from '@angular/core';
import { State } from '../../Models/State';
import { StateService } from 'src/app/Services/Websocket/state.service';
import { WebSocketNotificationService } from 'src/app/Services/Websocket/web-socket-notification.service';
import { UserstateService } from 'src/app/Services/userstate.service';

@Component({
  selector: 'app-state-user',
  templateUrl: './state-user.component.html',
  styleUrls: ['./state-user.component.css']
})
export class StateUserComponent implements OnInit {
 
 friends:any[]=[]
 
  constructor(private webSocketService:StateService,private stateService:UserstateService){

  }
 
  ngOnInit(): void {
    let email = localStorage.getItem("email") || ""
        this.stateService.friendsOnline(email).subscribe(data=>{
          this.friends = data
          console.log("try to find friend state ")
          console.log(data)
        })

        this.webSocketService.getMessages().subscribe(
          (state: any) => {

             let index = this.friends.findIndex(u=>u.email == state.email)
             if(state.state == 'online'){
                  if(index == -1){
                    this.friends.unshift(state)
                }
                else {
                  this.friends[index].state="online"
             }
             }
             if(state.state == 'offline'){
              if(index != -1){
                this.friends[index].state="offline"
              }
             }
            
          }
        );
  }





}
