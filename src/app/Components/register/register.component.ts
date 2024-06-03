import { Component, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ImageHandle } from 'src/app/Models/ImageHandle';
import { RegistredUser } from 'src/app/Models/RegistredUser';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  Message = {message:'',code:''}
  hide = true;
  myformbuilder:any
  selectedImage:any
  formData :any
  registredUSer:RegistredUser = new RegistredUser()


  constructor(private fb:FormBuilder,private router:Router,private authService:AuthService,private sanitizer:DomSanitizer){
  
  this.myformbuilder = this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(6)]],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    fullName:['',[Validators.required,Validators.minLength(6)]]
  })

}
 




  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }



  
  get email(){
    return this.myformbuilder.get('email')
  }
  get password(){
    return this.myformbuilder.get('password')
  }
  get phoneNumber(){
    return this.myformbuilder.get('phoneNumber')
  }
  get fullName(){
    return this.myformbuilder.get('fullName')
  }


  onProfilePictureSelected(e:any){
    console.log(e)
    const fileChosed = e.target.files[0];
    const fileHandle: ImageHandle = {
      file: fileChosed,
      url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(fileChosed)) as SafeUrl
    };
    this.selectedImage = fileHandle
    console.log(this.selectedImage)
    this.registredUSer.images.push(fileHandle)
  }



  removeImage(i:number){
    this.registredUSer.images.splice(i,1)
  }


  fileDroped(fileHandle:any){
      this.registredUSer.images.push(fileHandle)
      console.log(fileHandle)
  }

  prepareFormData(user:RegistredUser):FormData{
    console.log(user.images)
    const formData = new FormData();
    formData.append(
      'user',
      new Blob([JSON.stringify(user)],{type:'application/json'})
    );

    for (let index = 0; index < user.images.length; index++) {
      
        formData.append(
          'images',
          user.images[index].file,
          user.images[index].file.name
        )
    }
    
    return formData;
  }




  register(){
    
    if(this.myformbuilder.valid){
          this.registredUSer.fullName= this.myformbuilder.value.fullName,
          this.registredUSer.email= this.myformbuilder.value.email,
          this.registredUSer.password= this.myformbuilder.value.password,
          this.registredUSer.phoneNumber= this.myformbuilder.value.phoneNumber,
          
      
      this.formData = this.prepareFormData(this.registredUSer)

       this.authService.register(this.registredUSer).subscribe(
      (data)=>{
        this.Message= data
      
        this.myformbuilder.reset()
      },
    (error)=>{console.log(error.error);this.Message = error.error}
  )
    }
    else {
      console.log("not valid")
    }
    
  }




}
