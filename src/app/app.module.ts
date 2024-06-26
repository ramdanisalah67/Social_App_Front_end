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
import { BoiteNotifComponent } from './Components/boite-notif/boite-notif.component';
import { TimePipe } from './time.pipe';
import {MatBadgeModule} from '@angular/material/badge';
import { PrivateMessageBarComponent } from './Components/private-message-bar/private-message-bar.component';
import { ShowCommentsOfPostComponent } from './Components/show-comments-of-post/show-comments-of-post.component';
import { NotifIconComponent } from './Components/notif-icon/notif-icon.component';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { MessageIconComponent } from './Components/message-icon/message-icon.component';
import { FriendIconComponent } from './Components/friend-icon/friend-icon.component';
import { HomeIconComponent } from './Components/home-icon/home-icon.component';
import { GroupsIconComponent } from './Components/groups-icon/groups-icon.component';
import { ProfileStateComponent } from './Components/profile-state/profile-state.component';
import { ImagedragDirective } from './imagedrag.directive';
import { ProfileInfoDialogComponent } from './Components/profile-info-dialog/profile-info-dialog.component';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { UserInfoComponent } from './Components/user-info/user-info.component';
import { PostSectionProfilComponent } from './Components/post-section-profil/post-section-profil.component';
import { ProfileSectionComponent } from './Components/profile-section/profile-section.component';
import { ListfriendsDialogComponent } from './Components/listfriends-dialog/listfriends-dialog.component';
import { SettingDialogComponent } from './Components/setting-dialog/setting-dialog.component';
import { SettingAccountComponent } from './Components/setting-account/setting-account.component';
import { ChangefullNameDialogComponent } from './Components/changefull-name-dialog/changefull-name-dialog.component';
import { ChangeEmailDialogComponent } from './Components/change-email-dialog/change-email-dialog.component';
import { ChangePasswordDialogComponent } from './Components/change-password-dialog/change-password-dialog.component';
import {MatTableModule} from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { PermissionsPersonalInfoComponent } from './Components/permissions-personal-info/permissions-personal-info.component';
import { PermissionsPostComponent } from './Components/permissions-post/permissions-post.component';
import { UserprofilePageComponent } from './Components/userprofile-page/userprofile-page.component';
import { UserprofilePageInfoComponent } from './Components/userprofile-page-info/userprofile-page-info.component';
import { UserprofilePagePostComponent } from './Components/userprofile-page-post/userprofile-page-post.component';
import { UserprofilePageProfileComponent } from './Components/userprofile-page-profile/userprofile-page-profile.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import { RegistrationSuccessComponent } from './Components/registration-success/registration-success.component';
import { UpdateImageProfileDialogComponent } from './Components/update-image-profile-dialog/update-image-profile-dialog.component';
import { ShowImageProfileDialogComponent } from './Components/show-image-profile-dialog/show-image-profile-dialog.component';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
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
    CongratFriendComponent,
    BoiteNotifComponent,
    TimePipe,
    PrivateMessageBarComponent,
    ShowCommentsOfPostComponent,
    NotifIconComponent,
    TestDragElementComponent,
    MessageIconComponent,
    FriendIconComponent,
    HomeIconComponent,
    GroupsIconComponent,
    ProfileStateComponent,
    ImagedragDirective,
    ProfileInfoDialogComponent,
    UserInfoComponent,
    PostSectionProfilComponent,
    ProfileSectionComponent,
    ListfriendsDialogComponent,
    SettingDialogComponent,
    SettingAccountComponent,
    ChangefullNameDialogComponent,
    ChangeEmailDialogComponent,
    ChangePasswordDialogComponent,
    PermissionsPersonalInfoComponent,
    PermissionsPostComponent,
    UserprofilePageComponent,
    UserprofilePageInfoComponent,
    UserprofilePagePostComponent,
    UserprofilePageProfileComponent,
    RegistrationSuccessComponent,
    UpdateImageProfileDialogComponent,
    ShowImageProfileDialogComponent,
    
    
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
    MatBadgeModule,
    PickerComponent,
    MatChipsModule,
    MatAutocompleteModule,
    MatTableModule,
    MatRadioModule,
    InfiniteScrollModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
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
