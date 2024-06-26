  import { Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router';
  import { BoiteNotification } from 'src/app/Models/BoiteNotification';
  import { NotificationItem } from 'src/app/Models/NotificationItem';
  import { RegistredUser } from 'src/app/Models/RegistredUser';
  import { WebSocketNotificationService } from 'src/app/Services/Websocket/web-socket-notification.service';
  import { AuthService } from 'src/app/Services/auth.service';
  import { CheckConnectivityService } from 'src/app/Services/check-connectivity.service';
import { HandleTimeService } from 'src/app/Services/handle-time.service';
  import { LoadingService } from 'src/app/Services/loading.service';
  import { NotifService } from 'src/app/Services/notif.service';
import { TimePipe } from 'src/app/time.pipe';
import { SettingDialogComponent } from '../setting-dialog/setting-dialog.component';
import { MatDialog } from '@angular/material/dialog';

  @Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
  })
  export class NavBarComponent implements OnInit{
    isConnected:boolean=false
    user:RegistredUser = new RegistredUser()
    boiteNotif:BoiteNotification= new BoiteNotification()
    notificationsNumber = 0
    i=-1
    constructor(public handleTime:HandleTimeService, private notificationService:NotifService,private websocketService:WebSocketNotificationService,public checkService:LoadingService,private router:Router,public authService:AuthService,public connectService:CheckConnectivityService){}
    ngOnInit(): void {
        if(localStorage.getItem('token')){
          this.isConnected=true
          this.user.email = localStorage.getItem('email') || ""
          this.user.fullName = localStorage.getItem('fullName') || ""

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
