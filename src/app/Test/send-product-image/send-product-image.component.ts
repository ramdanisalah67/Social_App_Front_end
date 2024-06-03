import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageHandle } from 'src/app/Models/ImageHandle';
import { Product } from 'src/app/Models/Product';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-send-product-image',
  templateUrl: './send-product-image.component.html',
  styleUrls: ['./send-product-image.component.scss'],
})
export class SendProductImageComponent  implements OnInit {
  p:Product= new Product()
  selectedImage:any
  constructor(private productService:ProductService,private sanitizer: DomSanitizer) { }
  
  ngOnInit() {}




  addProduct(){
    console.log(this.p)
    const postFormData = this.prepareFormData(this.p)
    console.log(postFormData)
    this.productService.addProduct(postFormData).subscribe(data=>{
      console.log(data)
    })

    console.log(this.p)
  }

  prepareFormData(product:Product):FormData{
    const formData = new FormData();
    formData.append(
      'product',
      new Blob([JSON.stringify(product)])
    );

    for (let index = 0; index < product.images.length; index++) {
        formData.append(
          'images',
         product.images[index].file,
         product.images[index].file.name
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
    this.p.images.push(fileHandle)
  }


  print(){
    console.log(this.p)
  }

 

}
