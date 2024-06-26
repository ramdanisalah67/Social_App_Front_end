import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HandleTimeService } from 'src/app/Services/handle-time.service';
import { ImageProcessingService } from 'src/app/Services/image-processing.service';
import { LoadingService } from 'src/app/Services/loading.service';
import { ProfileInfoDialogComponent } from '../profile-info-dialog/profile-info-dialog.component';

@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.scss'],
})
export class ShowProfileComponent  implements OnInit {
userInfo:any
  constructor(
    public dialog: MatDialog,private checkService:LoadingService,
    private imageProcess:ImageProcessingService,public handleTime:HandleTimeService) {
  }
  ngOnInit() {
   
  }


  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ProfileInfoDialogComponent, {
      width: '750px',
      height: '735px',  //kant 750px
   
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }


}
