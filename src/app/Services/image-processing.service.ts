import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Post } from '../Models/Post';
import { ImageHandle } from '../Models/ImageHandle';
import { RegistredUser } from '../Models/RegistredUser';
import { ConnectUser } from '../Models/ConnectedUser';
import { Comment } from '../Models/Comment';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor(private sanitizer:DomSanitizer) { }

  public createImage(myPost:any){
    const postImages: any[] = myPost.images ;
    const postImagesToFileHandle :ImageHandle[]=[]

    for (let i = 0; i < postImages.length; i++) {
      const imageFileData = postImages[i];
      const imageBlob =  this.dataURItoBlob(imageFileData.picByte,imageFileData.type)
      const imageFile = new File([imageBlob],imageFileData.name,{type:imageFileData.type})
      const finalFileHandle :ImageHandle={
      file:imageFile,
      
      url:this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
    }
        postImagesToFileHandle.push(finalFileHandle)
    }
          myPost.images = postImagesToFileHandle;
       return myPost ;
    }


    
    public createVideo(myPost:any){
      const postImages =myPost.video

      let postImagesToFileHandle :ImageHandle= new ImageHandle()
  
       
        const imageFileData = postImages;
        const imageBlob =  this.dataURItoBlob(imageFileData.picByte,imageFileData.type)
        const imageFile = new File([imageBlob],imageFileData.name,{type:imageFileData.type})
        const finalFileHandle :ImageHandle={
        file:imageFile,
        
        url:this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      }
          postImagesToFileHandle= finalFileHandle
      
            myPost.video = postImagesToFileHandle;
         return myPost ;
      }
    public createImageForUser(myPost:ConnectUser){
      const postImages: any[] = myPost.images ;
      const postImagesToFileHandle :ImageHandle[]=[]
  
      for (let i = 0; i < postImages.length; i++) {
        const imageFileData = postImages[i];
        const imageBlob =  this.dataURItoBlob(imageFileData.picByte,imageFileData.type)
        const imageFile = new File([imageBlob],imageFileData.name,{type:imageFileData.type})
        const finalFileHandle :ImageHandle={
        file:imageFile,
        
        url:this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      }
          postImagesToFileHandle.push(finalFileHandle)
      }
            myPost.images = postImagesToFileHandle;
         return myPost ;
      }

      public createImageForComment(comment:any){
        const postImages: any[] = [] ;
        postImages.push(comment.media)
        const postImagesToFileHandle :ImageHandle[]=[]
    
        for (let i = 0; i < postImages.length; i++) {
          const imageFileData = postImages[i];
          const imageBlob =  this.dataURItoBlob(imageFileData.picByte,imageFileData.type)
          const imageFile = new File([imageBlob],imageFileData.name,{type:imageFileData.type})
          const finalFileHandle :ImageHandle={
          file:imageFile,
          
          url:this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
        }
            postImagesToFileHandle.push(finalFileHandle)
        }
              comment.media = postImagesToFileHandle[0];
           return comment ;
        }



    public dataURItoBlob(picBytes:any,imageType:any){
      const byteString = window.atob(picBytes)
      const arrayBuffer = new ArrayBuffer(byteString.length)
      const int8Array = new Uint8Array(arrayBuffer)
      for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i)
        
      } 

      const blob = new Blob([int8Array],{type:imageType})
      return blob
    }


}
