import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StateUserComponent } from './Components/state-user/state-user.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { MessagingComponent } from './Components/messaging/messaging.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { NavbarGuestComponent } from './Components/navbar-guest/navbar-guest.component';
import { HomeComponent } from './Components/home/home.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreatePostPageDialogComponent } from './Components/create-post-page-dialog/create-post-page-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {HttpClientModule} from '@angular/common/http'
import { LoginregisterComponent } from './Components/loginregister/loginregister.component';
import { ProfileStateComponent } from './Components/profile-state/profile-state.component';
import {MatMenuModule} from '@angular/material/menu';
import { BordDetailsComponent } from './Components/bord-details/bord-details.component';
import { DragDirective } from './drag.directive';
import { LoadiconComponent } from './Components/loadicon/loadicon.component';
import { ShowPostDetailsDialogComponent } from './Components/show-post-details-dialog/show-post-details-dialog.component';
import { SendProductImageComponent } from './Test/send-product-image/send-product-image.component';
@NgModule({
  declarations: [
    AppComponent,
    StateUserComponent,
    NavBarComponent,
    MessagingComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarGuestComponent,
    CreatePostPageDialogComponent,
    LoginregisterComponent,
    ProfileStateComponent,
    StateUserComponent,
    BordDetailsComponent,
    DragDirective,
    LoadiconComponent,
    ShowPostDetailsDialogComponent,
    SendProductImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot({}),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    HttpClientModule,
    MatGridListModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
