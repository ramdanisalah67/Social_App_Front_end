import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Post } from 'src/app/Models/Post';
import { ImageProcessingService } from 'src/app/Services/image-processing.service';
import { PostService } from 'src/app/Services/post.service';
import { ShowCommentsOfPostComponent } from '../show-comments-of-post/show-comments-of-post.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-post-section-profil',
  templateUrl: './post-section-profil.component.html',
  styleUrls: ['./post-section-profil.component.scss'],
})
export class PostSectionProfilComponent  implements OnInit {
  email=""
posts:any[]=[]
  constructor( public dialog: MatDialog,private postService:PostService,private imageProcess:ImageProcessingService) { }

  ngOnInit() {
     this.email = localStorage.getItem("email") || "";
    if(this.email.length>0){
      this.postService.allPostByEmail(this.email).pipe(map((x:Post[],i)=>x.map((post:Post)=>this.imageProcess.createImage(post))))
      .subscribe(
        (data)=>{
          this.posts=data
          console.log(data)
        },
  
      (error)=>{console.log(error.error)})
  }

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
