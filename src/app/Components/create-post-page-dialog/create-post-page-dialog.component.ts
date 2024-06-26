  import { Component, ElementRef, EventEmitter, HostListener, Inject, OnInit, Output } from '@angular/core';
  import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
  import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
  import { ImageHandle } from 'src/app/Models/ImageHandle';
  import { Post } from 'src/app/Models/Post';
  import { PostService } from 'src/app/Services/post.service';

  @Component({
    selector: 'app-create-post-page-dialog',
    templateUrl: './create-post-page-dialog.component.html',
    styleUrls: ['./create-post-page-dialog.component.scss'],

  })
  export class CreatePostPageDialogComponent  implements OnInit {

    message: string = '';
    showEmojiPicker: boolean = false;
    visibility="none"
    selectedImage: any;
    selectedVideo: any;
    spinner='none'
    newPost:any= new Post()
    @Output() clickOutside = new EventEmitter<void>();
    isAddPost:boolean=true
    constructor(private elementRef: ElementRef,@Inject(MAT_DIALOG_DATA) public data:any,private router:Router,public dialogRef: MatDialogRef<CreatePostPageDialogComponent>,private sanitizer: DomSanitizer,private postService:PostService) {}

    ngOnInit() {
        if(this.data.p) {
          this.isAddPost=false
          this.newPost = this.data.p
        }

    
    }


    createPost(){
      const postFormData = this.prepareFormData(this.newPost)
      
      console.log(postFormData)
      this.postService.addPost(postFormData).subscribe(data=>{
        if(data.statusCode == '200'){
          console.log(data)
          this.spinner="block"

          setTimeout(()=>{  
            this.spinner="none"
            this.dialogRef.close(true);

          },1000)
        }
        
      })
      
    }
    updatePost(){
      const postFormData = this.prepareFormData(this.newPost)
      
      console.log(postFormData)
      this.postService.updatePost(postFormData).subscribe(data=>{
        if(data.statusCode == '200'){
          this.spinner="block"
          console.log(data)
          this.postService.notifyPostCreated(data); // Notify about the new post

          setTimeout(()=>{
            localStorage.setItem("postUpdated","true")
            this.spinner="none"
            
          },2000)
        }
        
      })
      
    }




    @HostListener('document:click', ['$event.target'])
    
  onClick(target: any) {
    const clickedInsideEmojiPicker = target.closest('div.icons-text') !== null;
    if (!clickedInsideEmojiPicker) {
      this.showEmojiPicker = false;
    }
  }



  
  addEmoji(event: any) {
    // Append the selected emoji to the message
    console.log(event.emoji.native)
    this.newPost.text += event.emoji.native;
  }




  
    onCancel(): void {
      this.dialogRef.close(false);
    }
  
    onConfirm(): void {
      this.dialogRef.close(true);
    }
    
    prepareFormData(post: any): FormData {
      const formData = new FormData();
      post.email = localStorage.getItem('email') || '';
      formData.append('post', new Blob([JSON.stringify(post)], { type: 'application/json' }));
  
      for (let index = 0; index < post.images.length; index++) {
        formData.append('images', post.images[index].file, post.images[index].file.name);
      }
  
      if (post.video && post.video.file) {
        formData.append('video', post.video.file, post.video.file.name);
      }
  
      return formData;
    }

    onFileSelected(e: any) {
      this.newPost.video = null
      const fileChosen = e.target.files[0];
      const fileHandle: ImageHandle = {
        file: fileChosen,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(fileChosen)) as SafeUrl,
      };
      this.selectedImage = fileHandle;
      console.log('Selected Image:', this.selectedImage);
      this.newPost.images.push(fileHandle);
    }
  
    onVideoSelected(e: any) {
      this.newPost.images=[]
      this.newPost.video = null

      this.visibility="none"
      const file = e.target.files[0];
  
      if (file) {
        const url: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
        this.newPost.video = {
          file: file,
          url: url,
        };
        console.log('Selected Video:', this.newPost.video);
      } else {
        this.newPost.video = null;
      }
    }
  
    removeImage(i: number) {
      this.newPost.images.splice(i, 1);
    }


     // Highlighted Changes
  removeVideo() {
    this.newPost.video = null;
  }
  // End of Highlighted Changes




    fileDroped(fileHandle:any){
        this.newPost.images.push(fileHandle)
    }

  
  }
