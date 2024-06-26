import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ImageProcessingService } from 'src/app/Services/image-processing.service';

@Component({
  selector: 'app-listfriends-dialog',
  templateUrl: './listfriends-dialog.component.html',
  styleUrls: ['./listfriends-dialog.component.scss'],
})
export class ListfriendsDialogComponent  implements OnInit {
friends:any[]=[]
  constructor(public dialogRef:MatDialogRef<ListfriendsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data:any,private imageProcess:ImageProcessingService) {
    this.friends= data.friends
   }

  ngOnInit() {
    this.friends.map(a=>this.imageProcess.createImageForUser(a.user))
  }

}
