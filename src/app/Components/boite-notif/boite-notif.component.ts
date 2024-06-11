import { Component, OnInit } from '@angular/core';
import { BoiteNotification } from 'src/app/Models/BoiteNotification';
import { NotificationItem } from 'src/app/Models/NotificationItem';
import { WebSocketNotificationService } from 'src/app/Services/Websocket/web-socket-notification.service';
import { NotifService } from 'src/app/Services/notif.service';

@Component({
  selector: 'app-boite-notif',
  templateUrl: './boite-notif.component.html',
  styleUrls: ['./boite-notif.component.scss'],
})
export class BoiteNotifComponent  implements OnInit {

  boiteNotif:BoiteNotification= new BoiteNotification()
  constructor(private notificationService:NotifService,private websocketService:WebSocketNotificationService) { }

  ngOnInit() {
    let email = localStorage.getItem("email") || ""
    this.notificationService.allNotifications(email).subscribe(data=>{
      console.log(data)
    })
  }

}
