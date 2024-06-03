import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './Components/register/register.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { HomeComponent } from './Components/home/home.component';
import { NavbarGuestComponent } from './Components/navbar-guest/navbar-guest.component';
import { LoginComponent } from './Components/login/login.component';
import { CreatePostPageDialogComponent } from './Components/create-post-page-dialog/create-post-page-dialog.component';
import { LoginregisterComponent } from './Components/loginregister/loginregister.component';
import { AppComponent } from './app.component';
import { ProfileStateComponent } from './Components/profile-state/profile-state.component';
import { LoadiconComponent } from './Components/loadicon/loadicon.component';
import { SendProductImageComponent } from './Test/send-product-image/send-product-image.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'navbar',component:NavBarComponent},
  { path: 'home', component: HomeComponent},
    {path:'navguest',component:NavbarGuestComponent},
  {path:'dialog',component:CreatePostPageDialogComponent},
  {path:'login_register',component:LoginregisterComponent},
  {path:'',component:AppComponent,pathMatch:'full'},
  {path:'profile',component:ProfileStateComponent},
  {path:'load',component:LoadiconComponent},
  {path:'addProduct',component:SendProductImageComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
