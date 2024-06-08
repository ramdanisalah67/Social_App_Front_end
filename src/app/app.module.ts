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
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { LoginregisterComponent } from './Components/loginregister/loginregister.component';
import { ProfileStateComponent } from './Components/profile-state/profile-state.component';
import {MatMenuModule} from '@angular/material/menu';
import { BordDetailsComponent } from './Components/bord-details/bord-details.component';
import { DragDirective } from './Directives/drag.directive';
import { LoadiconComponent } from './Components/loadicon/loadicon.component';
import { ShowPostDetailsDialogComponent } from './Components/show-post-details-dialog/show-post-details-dialog.component';
import { SendProductImageComponent } from './Test/send-product-image/send-product-image.component';
import { FriendsComponent } from './Components/friends/friends.component';
import { StopPropagationDirectiveDirective } from './Directives/stop-propagation-directive.directive';
import { authInterceptor } from './auth.interceptor';
import { ChangePositionDirective } from './Directives/change-position.directive';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TestDragElementComponent } from './Components/test-drag-element/test-drag-element.component';
import { ShowProfileComponent } from './Components/show-profile/show-profile.component';
import {MatTabsModule} from '@angular/material/tabs';
import { RequestComponent } from './Components/request/request.component';
import { NoFriendUserComponent } from './Components/no-friend-user/no-friend-user.component';
import { AllFriendsComponent } from './Components/all-friends/all-friends.component';
import { ConfirmationfriendRequestComponent } from './Components/confirmationfriend-request/confirmationfriend-request.component';
import { ConfirmRejectRequestFriendComponent } from './Components/confirm-reject-request-friend/confirm-reject-request-friend.component';
import { CongratFriendComponent } from './Components/congrat-friend/congrat-friend.component';
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
    SendProductImageComponent,
    FriendsComponent,
    StopPropagationDirectiveDirective,
    TestDragElementComponent,
    ShowProfileComponent,
    RequestComponent,
    NoFriendUserComponent,
    AllFriendsComponent,
    ConfirmationfriendRequestComponent,
    ConfirmRejectRequestFriendComponent,
    CongratFriendComponent
    
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
    MatMenuModule,
    ChangePositionDirective,
    DragDropModule,
    MatTabsModule,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: authInterceptor,
      multi: true
    }
  ],  bootstrap: [AppComponent]
})
export class AppModule { }
