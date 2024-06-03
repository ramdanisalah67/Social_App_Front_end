import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Post } from 'src/app/Models/Post';
import { PostService } from 'src/app/Services/post.service';

@Component({
  selector: 'app-show-post-details-dialog',
  templateUrl: './show-post-details-dialog.component.html',
  styleUrls: ['./show-post-details-dialog.component.scss'],
})
export class ShowPostDetailsDialogComponent  implements OnInit {
  post:Post= new Post()
  constructor(public dialogRef: MatDialogRef<ShowPostDetailsDialogComponent>,private sanitizer: DomSanitizer,private postService:PostService,
    @Inject(MAT_DIALOG_DATA) public data:any

  ) 
  {

  }

  ngOnInit() {
    this.post = this.data.post
  }


  receiveData(){
    console.log(this.data)
  }


}
