import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostPageDialogComponent } from '../create-post-page-dialog/create-post-page-dialog.component';
import { CheckConnectivityService } from 'src/app/Services/check-connectivity.service';
import { PostService } from 'src/app/Services/post.service';
import { Post } from 'src/app/Models/Post';
import { ShowPostDetailsDialogComponent } from '../show-post-details-dialog/show-post-details-dialog.component';
import { map } from 'rxjs';
import { ImageProcessingService } from 'src/app/Services/image-processing.service';
import { LoadingService } from 'src/app/Services/loading.service';
import { WebSocketNotificationService } from 'src/app/Services/Websocket/web-socket-notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit{

  posts:Post[]=[]

  constructor(private mySocket:WebSocketNotificationService,public dialog: MatDialog,private checkService:LoadingService,private postService:PostService,private imageProcess:ImageProcessingService) {
    mySocket.initConnectionSocket()
  }
  
  ngOnInit(): void {
    this.checkService.hidelogin()
    this.postService.allPost()
    .pipe(map((x:Post[],i)=>x.map((post:Post)=>this.imageProcess.createImage(post))))
    .subscribe(
      (data)=>{
        console.log(data)
        this.posts=data
      },

    (error)=>{console.log(error.error)})
    //this.openDialog('0ms', '0ms')
  //  this.showPostDetails(new Post())
      }
  



  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(CreatePostPageDialogComponent, {
      width: '750px',
      height: '735px',  //kant 750px
      data: {
        name:'salah-eddine'
      },
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }


  showPostDetails(p:Post){
    console.log(p)
    this.dialog.open(ShowPostDetailsDialogComponent,{
      width: '3000px',
      height: '735px',  //kant 750px
      data: {
        post:p
      },
  
    })
  }


}
