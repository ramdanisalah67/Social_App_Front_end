import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TestDragElementComponent } from '../test-drag-element/test-drag-element.component';
import { HandleTimeService } from 'src/app/Services/handle-time.service';
import { NotifService } from 'src/app/Services/notif.service';
import { WebSocketNotificationService } from 'src/app/Services/Websocket/web-socket-notification.service';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { CheckConnectivityService } from 'src/app/Services/check-connectivity.service';
import { LoadingService } from 'src/app/Services/loading.service';
import { BoiteNotification } from 'src/app/Models/BoiteNotification';
import { RegistredUser } from 'src/app/Models/RegistredUser';
import { NotificationItem } from 'src/app/Models/NotificationItem';

@Component({
  selector: 'app-notif-icon',
  templateUrl: './notif-icon.component.html',
  styleUrls: ['./notif-icon.component.scss'],
})
export class NotifIconComponent  {
  isConnected:boolean=false
  user:RegistredUser = new RegistredUser()
  boiteNotif:BoiteNotification= new BoiteNotification()
  notificationsNumber = 0
  i=-1
  constructor( public handleTime:HandleTimeService, private notificationService:NotifService,private websocketService:WebSocketNotificationService,
    public checkService:LoadingService,private router:Router,public authService:AuthService,public connectService:CheckConnectivityService){}
  ngOnInit(): void {
    console.log("notiffffffffffffffffffffffffffffffffffffffffff")
      if(localStorage.getItem('token')){
        this.isConnected=true
        this.user.email = localStorage.getItem('email') || ""
        this.user.fullName = localStorage.getItem('fullName') || ""

       this.notificationService.allNotifications(this.user.email).subscribe(data=>{
          this.boiteNotif = data
          console.log("try get boite norif ...")
          console.log(this.boiteNotif)
          this.notificationsNumber =   this.boiteNotif.notificationItems.filter(n=>n.state == 'waiting').length
            console.log(this.notificationsNumber)
            this.i=0
            this.websocketService.getMessages().subscribe(
              (newNotification: NotificationItem) => {
                console.log("checking ..")
              let index = this.boiteNotif.notificationItems.findIndex(e=>e.id==newNotification.id)
              if(index!= -1 && this.notificationsNumber>0){
                  this.boiteNotif.notificationItems.splice(index,1)
                  this.boiteNotif.notificationItems.unshift(newNotification);
              }
              if(index!= -1 && this.notificationsNumber==0){
                this.boiteNotif.notificationItems.splice(index,1)
                this.boiteNotif.notificationItems.unshift(newNotification);

                console.log("is equal")
                this.notificationsNumber++
            }
            if(index == -1){
              this.boiteNotif.notificationItems.unshift(newNotification);
              this.notificationsNumber++
              console.log(this.notificationsNumber)
            }
              
              }
            );
          
        })
      }
      else {
        console.log("not  connected")

      }
      
         
           
          
          
            
          
        
        
          

  }



  logout(){
    localStorage.clear()
    this.checkService.start()

    this.router.navigate(['login'])

  }



  print(){
    console.log('hello')
  }


  onMenuClosed(){
    console.log("notification list closed",this.notificationsNumber)
    this.notificationService.readNotifications(this.boiteNotif.boiteId).subscribe(data=>{console.log(data)})
    this.boiteNotif.notificationItems.map(e=>e.state="viewed")
    console.log(this.boiteNotif.notificationItems)

  }

  onMenuOpened(){
    console.log("menu opened")
    this.notificationsNumber = 0
  }

}
