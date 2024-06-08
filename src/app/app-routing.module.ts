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
import { FriendsComponent } from './Components/friends/friends.component';
import { TestDragElementComponent } from './Components/test-drag-element/test-drag-element.component';
import { ShowProfileComponent } from './Components/show-profile/show-profile.component';
import { RequestComponent } from './Components/request/request.component';
import { NoFriendUserComponent } from './Components/no-friend-user/no-friend-user.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'navbar',component:NavBarComponent},
  { path: 'home', component: HomeComponent},
    {path:'navguest',component:NavbarGuestComponent},
  {path:'dialog',component:CreatePostPageDialogComponent},
  {path:'login_register',component:LoginregisterComponent},
  {path:'',component:AppComponent,pathMatch:'full'},
  {path:'load',component:LoadiconComponent},
  {path:'addProduct',component:SendProductImageComponent},
  {path:'friends',component:FriendsComponent},
  {path:'testDrag',component:TestDragElementComponent},
  {path:'showProfile',component:ShowProfileComponent},
  {path:'noFriends',component:NoFriendUserComponent},
  {path:'request',component:RequestComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
