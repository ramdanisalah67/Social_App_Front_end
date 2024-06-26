import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostPageDialogComponent } from '../create-post-page-dialog/create-post-page-dialog.component';
import { CheckConnectivityService } from 'src/app/Services/check-connectivity.service';
import { PostService } from 'src/app/Services/post.service';
import { Post } from 'src/app/Models/Post';
import { ShowPostDetailsDialogComponent } from '../show-post-details-dialog/show-post-details-dialog.component';
import { Subscription, map } from 'rxjs';
import { ImageProcessingService } from 'src/app/Services/image-processing.service';
import { LoadingService } from 'src/app/Services/loading.service';
import { WebSocketNotificationService } from 'src/app/Services/Websocket/web-socket-notification.service';
import { ShowCommentsOfPostComponent } from '../show-comments-of-post/show-comments-of-post.component';
import { LikeRequest } from 'src/app/Models/LikeRequest';
import { RegistredUser } from 'src/app/Models/RegistredUser';
import { HandleTimeService } from 'src/app/Services/handle-time.service';
import { WebsocketPostService } from 'src/app/Services/Websocket/websocket-post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { duration } from 'moment';
import { ConnectUser } from 'src/app/Models/ConnectedUser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit{

  posts:any[]=[]
  email =""
  page: number = 0;
  size: number = 3;
  loading: boolean = false;
  hasMore: boolean = true;
  url = ""
  message = ""
  connecteUser:any
  @ViewChild('postContainer') postContainer!: ElementRef;

  onScroll(event: any) {
    console.log("hello scroll")
    const container = this.postContainer.nativeElement;
    console.log(container)
    const atBottom = container.scrollHeight - container.scrollTop === container.clientHeight;
    console.log(atBottom)
    console.log(this.loading)
    console.log(this.hasMore)

    if (atBottom ) {
      console.log("atbottom true")
      this.loading=true
      this.fetchPosts();
    }
  }
  
  constructor(
    public dialog: MatDialog,private checkService:LoadingService,private postService:PostService,
    private imageProcess:ImageProcessingService,public handleTime:HandleTimeService,private socketPost:WebsocketPostService,private _snackBar: MatSnackBar) {
  }
  




  ngOnInit(): void {
   // localStorage.setItem('loading','true')
    this.getMessage()
     this.email = localStorage.getItem('email')|| ""
    this.postService.getUserReact(this.email).subscribe(data=>{
      console.log(data)
      this.connecteUser=data
      this.imageProcess.createImage(this.connecteUser)
    })
    this.fetchPosts()

        this.checkService.hidelogin()
      }


      getMessage() {
           //call postService
    this.socketPost.getMessages().subscribe(
      (actionUser: any) => {
        let userReact;
        
       console.log("user did something to post")
       let postIndex = this.posts.findIndex(a=>a.id == actionUser.postId)
       console.log("postIndex",postIndex)
       let index = this.posts[postIndex].nbr_liked.findIndex((liked:any)=>liked.email === actionUser.email)
        
       if(index === -1){
          if(actionUser.action === 'Like') {
            console.log("user like this post")
            this.postService.getUserReact(actionUser.email).subscribe(data=>{
              this.posts[postIndex].nbr_liked.push(data) 
              console.log(this.posts[postIndex])
            })
          
          }
       }
       if(index != -1){
        if(actionUser.action === 'removeLike') {
          console.log("user remove like this post")

          this.posts[postIndex].nbr_liked.splice(index,1)
          console.log(this.posts)

        }
     }
      
      }
    );
      }
  
      fetchPosts() {
        console.log("Fetching posts...");
        if ( !this.hasMore) {
          this.loading=false
          console.log("No more data to load.");
          return;
        }
        this.loading = true;
    
        this.postService.postByPermission(this.email, this.page, this.size)
          .subscribe(
            (data) => {
              console.log("Fetched posts:", data);
              if (data.length === 0) {
                console.log("No more posts available.");
                this.hasMore = false;
                this.loading=false
              } else {
                  
                
                this.page += 1;
    
                data.forEach((post:any) => {
                  this.imageProcess.createImage(post.owner)
                  if (post.images.length >0) {
                   this.posts.push(this.imageProcess.createImage(post));
                   console.log("this is image")

                  }
                 else if (post.video ) {
                    this.posts.push(this.imageProcess.createVideo(post));
                    console.log("this is video")
    
                  }
                  else {
                    this.posts.push(post)
                    console.log("other condidtion")
                  }
                });
              
              }
            },
            (error) => {
              console.error("Error fetching posts:", error);
              this.loading = false; // Ensure loading flag is reset on error
            }
          );
      }




  openDialog(enterAnimationDuration: string, exitAnimationDuration: string,p:any): void {
   const dialogRef = this.dialog.open(CreatePostPageDialogComponent, {
      width: '750px',
      height: '735px',  //kant 750px
      data: {
        p
      },
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
       this.page=0
       this.size=3
       this.posts=[]
       this.fetchPosts()
       this._snackBar.open('Post created successfully', 'close', {
        duration: 3000
      });
    
      }
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

  showCommentsDialog(p:any,connectUser:any){
   
    this.dialog.open(ShowCommentsOfPostComponent,{
      width: '800px',
      height: '1035px',  //kant 750px
      data:{
          p,
          connectUser

      }
    })
  }

  hasLikedPost(post: any): boolean {
      let index = post.nbr_liked.findIndex((user:any) => user.email === this.email);
      if(index ==-1) return false
      else return true  
  }



  likePost(p:any) {
    let user:RegistredUser= new RegistredUser()
    user.email=this.email 
    p.nbr_liked.push(user)
    let request:LikeRequest= new LikeRequest()
    request.email=this.email
    request.postId= p.id
    console.log(request)
    this.postService.LikePost(request).subscribe(data=>{
      console.log(data)
    })
  }
  removeLike(p: any) {
    let userIndex = p.nbr_liked.findIndex((a: any) => a.email === this.email);
    
    if (userIndex !== -1) {
      p.nbr_liked.splice(userIndex, 1); // Use splice instead of slice to remove the item
  
      let request: LikeRequest = new LikeRequest();
      request.email = this.email;
      request.postId = p.id;
  
      this.postService.removeLike(request).subscribe(data => {
        console.log(data);
      });
    }
  }
  share(){
    console.log(this.loading)
  }


  editPost(p:any){
    this.openDialog('0ms','0ms',p)
  }
}
