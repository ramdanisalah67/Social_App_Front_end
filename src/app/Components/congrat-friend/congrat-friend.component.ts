import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationfriendRequestComponent } from '../confirmationfriend-request/confirmationfriend-request.component';

@Component({
  selector: 'app-congrat-friend',
  templateUrl: './congrat-friend.component.html',
  styleUrls: ['./congrat-friend.component.scss'],
})
export class CongratFriendComponent  implements OnInit {
  
  constructor(public dialogRef: MatDialogRef<ConfirmationfriendRequestComponent>, @Inject(MAT_DIALOG_DATA) public data:any  ) 
      {   }

  ngOnInit() {
    console.log(this.data)
  }

}
