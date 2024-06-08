import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-reject-request-friend',
  templateUrl: './confirm-reject-request-friend.component.html',
  styleUrls: ['./confirm-reject-request-friend.component.scss'],
})
export class ConfirmRejectRequestFriendComponent  implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmRejectRequestFriendComponent>) { }

  ngOnInit() {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

}
