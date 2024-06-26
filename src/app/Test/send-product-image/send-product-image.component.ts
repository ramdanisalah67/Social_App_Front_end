import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageHandle } from 'src/app/Models/ImageHandle';
import { Post } from 'src/app/Models/Post';
import { PostService } from 'src/app/Services/post.service';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { ImageProcessingService } from 'src/app/Services/image-processing.service';

@Component({
  selector: 'app-send-product-image',
  templateUrl: './send-product-image.component.html',
  styleUrls: ['./send-product-image.component.scss'],
})
export class SendProductImageComponent implements OnInit {
  newPost: any = new Post();
  selectedImage: any;
  selectedVideo: any;
  uploadProgress: number = 0;
  responseMessage: string = '';
  posts:any[]=[]
  constructor(private postService: PostService, private sanitizer: DomSanitizer, private http: HttpClient,private imageProcess:ImageProcessingService) {}

  ngOnInit() {
    let email = localStorage.getItem("email") || ""
    this.postService.allPostByEmail(email).subscribe(data=>{
      this.posts = data
      console.log(data)
      this.posts.forEach(e=>{
        if(e.images!=null) this.imageProcess.createImage(e)
        if(e.video!=null) this.imageProcess.createVideo(e)
        
        })
    })
  }

  addPost() {
    console.log('Adding post:', this.newPost);

    const postFormData = this.prepareFormData(this.newPost);
    console.log('Post FormData:', postFormData);

    this.postService.addPost(postFormData).subscribe(
      event=>{
        console.log(event)
      })
    }





  prepareFormData(post: any): FormData {
    const formData = new FormData();
    post.email = localStorage.getItem('email') || '';
    formData.append('post', new Blob([JSON.stringify(post)], { type: 'application/json' }));

    for (let index = 0; index < post.images.length; index++) {
      formData.append('imageFile', post.images[index].file, post.images[index].file.name);
    }

    if (post.video && post.video.file) {
      formData.append('video', post.video.file, post.video.file.name);
    }

    return formData;
  }

  onFileSelected(e: any) {
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

  clearForm() {
    this.newPost = new Post();
    this.selectedImage = null;
    this.selectedVideo = null;
    this.uploadProgress = 0;
    this.responseMessage = '';
  }
}
