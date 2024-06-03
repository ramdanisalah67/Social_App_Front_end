import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageHandle } from 'src/app/Models/ImageHandle';
import { Post } from 'src/app/Models/Post';
import { PostService } from 'src/app/Services/post.service';

@Component({
  selector: 'app-create-post-page-dialog',
  templateUrl: './create-post-page-dialog.component.html',
  styleUrls: ['./create-post-page-dialog.component.scss'],

})
export class CreatePostPageDialogComponent  implements OnInit {

  newPost:Post= new Post()
  selectedImage:any
  constructor(public dialogRef: MatDialogRef<CreatePostPageDialogComponent>,private sanitizer: DomSanitizer,private postService:PostService) {}

  ngOnInit() {
    
  }



  createPost(){
    const postFormData = this.prepareFormData(this.newPost)
    console.log(postFormData)
    this.postService.addPost(postFormData).subscribe(data=>{
      console.log(data)
    })

    console.log(this.newPost)
  }

  prepareFormData(post:Post):FormData{
    const formData = new FormData();
    formData.append(
      'post',
      new Blob([JSON.stringify(post)],{type:'application/json'})
    );

    for (let index = 0; index < post.images.length; index++) {
      
        formData.append(
          'imageFile',
          post.images[index].file,
          post.images[index].file.name
          
        )
    }

    return formData;
  }

  onFileSelected(e: any) {
    const fileChosed = e.target.files[0];
    const fileHandle: ImageHandle = {
      file: fileChosed,
      url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(fileChosed)) as SafeUrl
    };
    this.selectedImage = fileHandle
    console.log(this.selectedImage)
    this.newPost.images.push(fileHandle)
  }



  removeImage(i:number){
    this.newPost.images.splice(i,1)
  }


  fileDroped(fileHandle:any){
      this.newPost.images.push(fileHandle)
  }

}
