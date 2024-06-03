import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { CheckConnectivityService } from 'src/app/Services/check-connectivity.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit{
  hide = true;
  myformbuilder:any
  messageError=""
  @Output() dataEmitter: EventEmitter<string> = new EventEmitter<string>();
  //constructor
  constructor(private fb:FormBuilder,private router:Router,private authService:AuthService,private checkService:CheckConnectivityService){
  
  this.myformbuilder = this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(6)]]
  })

}
  ngOnInit(): void {
    setTimeout(() => {
      localStorage.removeItem('loading')
    }, 3000); // Adjust the timeout duration as needed
  }
 




  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }
  userLogin = {email: '', password: ''}

  
  get email(){
    return this.myformbuilder.get('email')
  }
  get password(){
    return this.myformbuilder.get('password')
  }


  //login

  login(){
    console.log(this.myformbuilder.value)
    this.authService.login(this.myformbuilder.value).subscribe(
      (data)=>{
        console.log(data)
        localStorage.setItem('token',data.token)
        localStorage.setItem('fullName',data.fullName)
        localStorage.setItem('email',data.email)
        localStorage.setItem('loading','true')
        this.authService.session=true

        this.router.navigate(['home'])
      },
    (error)=>{
     console.log(error.error)
     if(error.error.status == '400'){
      this.messageError= "email or password wrong !"
      setTimeout(() => {
        this.messageError=""
      }, 3000); // Adjust the timeout duration as needed
     }
    }
  )

  }
}
