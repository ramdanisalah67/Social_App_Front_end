import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageSocketService } from 'src/app/Services/Websocket/message-socket.service';
import { HandleTimeService } from 'src/app/Services/handle-time.service';
import { ImageProcessingService } from 'src/app/Services/image-processing.service';
import { MessagingService } from 'src/app/Services/messaging.service';

@Component({
  selector: 'app-message-icon',
  templateUrl: './message-icon.component.html',
  styleUrls: ['./message-icon.component.scss'],
})
export class MessageIconComponent  implements OnInit {
email =""
messageItems:any[]=[]
numberWaitingMessage=0
numberNotifPerItems=0
  constructor(private router:Router,private messageSocket:MessageSocketService,private messageService:MessagingService,private imageProcess:ImageProcessingService,public handleTime:HandleTimeService) { }

  ngOnInit() {
    this.email = localStorage.getItem("email") || ""
    this.messageService.chargeAllBoiteItems(this.email).subscribe(data=>{
      this.messageItems = data
      console.log(this.messageItems)
      this.numberNotifPerItems = this.getnumberMessageNotif()
      console.log(this.numberNotifPerItems)
    })

    this.messageSocket.getMessages().subscribe(data=>{
      this.messageService.getNewMessage(data).subscribe(data=>{
        let index = this.messageItems.findIndex(b=>b.boiteItemId== data.boiteItemId)
        console.log(data)

        console.log("index value found",this.messageItems[index])
        
        if(index == -1){
          this.messageItems.unshift(data)
          this.numberNotifPerItems++
          console.log(this.numberNotifPerItems)
        }
        else  {
          if(this.messageItems[index].messageWaiting ==0 && data.messageWaiting==0){
            this.messageItems.splice(index,1)
            this.messageItems.unshift(data)
            console.log("condition 1")
          }
          else if(this.messageItems[index].messageWaiting ==0 && data.messageWaiting>0){
            this.numberNotifPerItems++
            this.messageItems.splice(index,1)
            this.messageItems.unshift(data)
            console.log("condition 2")

          }
          else{
            this.messageItems.splice(index,1)
            this.messageItems.unshift(data)
            console.log("condition 3")

          }
         
        }
      })
    })
  }


  getBoiteItem(boiteItemId:any,index:number){
    console.log(this.messageItems[index])
    if(this.messageItems[index].messageWaiting>0){
      this.messageService.viewMessages(boiteItemId).subscribe(data=>{
        console.log(data)
        if(data.status == '200'){
          this.messageItems[index].messageWaiting = 0
          this.numberNotifPerItems = this.getnumberMessageNotif()
        }
      })
    }
   
    localStorage.setItem("boiteItem",boiteItemId)
    this.messageService.sednBoiteItem(boiteItemId)
    console.log("boite item id selected => ",boiteItemId)

    
  }

  getnumberMessageNotif():number {
    let n =0
    this.messageItems.forEach(e=>{
      if(e.messageWaiting>0){
        n++
      }
    })
    return n
  }

}
