import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Post } from '../Models/Post';
import { ImageHandle } from '../Models/ImageHandle';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor(private sanitizer:DomSanitizer) { }

  public createImage(myPost:Post){
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
