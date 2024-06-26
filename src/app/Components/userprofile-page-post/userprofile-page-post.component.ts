import { Component, OnInit } from '@angular/core';
import { ShowCommentsOfPostComponent } from '../show-comments-of-post/show-comments-of-post.component';
import { MatDialog } from '@angular/material/dialog';
import { PostService } from 'src/app/Services/post.service';
import { ImageProcessingService } from 'src/app/Services/image-processing.service';

@Component({
  selector: 'app-userprofile-page-post',
  templateUrl: './userprofile-page-post.component.html',
  styleUrls: ['./userprofile-page-post.component.scss'],
})
export class UserprofilePagePostComponent  implements OnInit {
  email=""
posts:any[]=[]
constructor( public dialog: MatDialog,private postService:PostService,private imageProcess:ImageProcessingService) { }

  ngOnInit() {
    
  }


  showCommentsDialog(p:any){
   
    this.dialog.open(ShowCommentsOfPostComponent,{
      width: '800px',
      height: '1035px',  //kant 750px
      data:{
          p
      }
    })
  }
  
  hasLikedPost(post: any): boolean {
    let index = post.nbr_liked.findIndex((user:any) => user.email === this.email);
    if(index ==-1) return false
    else return true  
  }
  
}
