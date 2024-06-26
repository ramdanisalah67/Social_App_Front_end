import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmojiData } from '@ctrl/ngx-emoji-mart/ngx-emoji';

@Component({
  selector: 'app-test-drag-element',
  templateUrl: './test-drag-element.component.html',
  styleUrls: ['./test-drag-element.component.scss'],
})
export class TestDragElementComponent   {
  

    message: string = '';
    showEmojiPicker: boolean = false;
  
    addEmoji(event: any) {
      // Append the selected emoji to the message
      console.log(event.emoji.native)
      this.message += event.emoji.native;
    }
}
