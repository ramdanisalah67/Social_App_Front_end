import { Component, ElementRef, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ImageHandle } from 'src/app/Models/ImageHandle';
import { MessageSocketService } from 'src/app/Services/Websocket/message-socket.service';
import { ImageProcessingService } from 'src/app/Services/image-processing.service';
import { MessagingService } from 'src/app/Services/messaging.service';

@Component({
  selector: 'app-private-message-bar',
  templateUrl: './private-message-bar.component.html',
  styleUrls: ['./private-message-bar.component.scss'],
})
export class PrivateMessageBarComponent implements OnInit, AfterViewChecked {

  showEmojiPicker: boolean = false;
  boiteItemId: string = "";
  conversation: any = {};
  email: string = "";
  messageRef: any = {
    'itemId': '',
    'owner': '',
    'intro': false,
    'video': null,
    'images': [],
    'message': ''
  };
  selectedImage: any;

  @ViewChild('messageContainer') private messageContainer: ElementRef;

  constructor(
    private route: ActivatedRoute,
    public messageService: MessagingService,
    private sanitizer: DomSanitizer,
    private messageSocket: MessageSocketService,
    private imageProcess:ImageProcessingService
  ) { }

  ngOnInit() {
    this.email = localStorage.getItem("email") || "";
    this.messageRef.owner = this.email;
    if (localStorage.getItem('boiteItem')) {
      this.messageRef.itemId = localStorage.getItem("boiteItem") || "";
      this.messageService.getConversation(this.messageRef.itemId).subscribe(data => {
        console.log(data);
        data.messageRefs.forEach((message:any) => {
          if(message.images.length>0){
            this.imageProcess.createImage(message)
          }
          if(message.video){
            this.imageProcess.createVideo(message)
          }
        });
        this.conversation = data;
      });
    }
    console.log(this.messageRef);
    this.messageService.BoiteItem$.subscribe(data => {
      this.messageRef.itemId = data;
      this.messageService.getConversation(this.messageRef.itemId).subscribe(data => {
        console.log(data);
        this.conversation = data;
      });
      console.log("boite item received =>", data);
    });

    this.messageSocket.getMessages().subscribe(data => {
      console.log(this.messageRef.itemId);
      if (this.messageRef.itemId == data.boiteItem) {
        console.log("boite item activated");
        this.messageService.getNewMessageRef(data.messageRef).subscribe(data => {
          this.conversation.messageRefs.push(data);
        });
      }
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Scroll error:', err);
    }
  }

  addEmoji(event: any) {
    this.messageRef.message += event.emoji.native;
  }

  closewindow() {
    localStorage.removeItem("boiteItem");
  }

  prepareFormData(message: any): FormData {
    const formData = new FormData();
    formData.append('message', new Blob([JSON.stringify(message)], { type: 'application/json' }));

    for (let index = 0; index < this.messageRef.images.length; index++) {
      formData.append('images', this.messageRef.images[index].file, this.messageRef.images[index].file.name);
    }

    if (this.messageRef.video) {
      formData.append('video', this.messageRef.video.file, this.messageRef.video.file.name);
    }

    return formData;
  }

  onFileSelected(e: any) {
    this.messageRef.video = null;
    const fileChosen = e.target.files[0];
    const fileHandle: ImageHandle = {
      file: fileChosen,
      url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(fileChosen)) as SafeUrl,
    };
    this.selectedImage = fileHandle;
    console.log('Selected Image:', this.selectedImage);
    this.messageRef.images.push(fileHandle);
  }

  onVideoSelected(e: any) {
    this.messageRef.images = [];
    this.messageRef.video = null;

    const file = e.target.files[0];

    if (file) {
      const url: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
      this.messageRef.video = {
        file: file,
        url: url,
      };
      console.log('Selected Video:', this.messageRef.video);
    } else {
      this.messageRef.video = null;
    }
  }

  removeImage(i: number) {
    this.messageRef.images.splice(i, 1);
  }

  removeVideo() {
    this.messageRef.video.url = "";
  }

  fileDroped(fileHandle: any) {
    this.messageRef.images.push(fileHandle);
  }

  sendMessage() {
    console.log(this.messageRef);
    const formData = this.prepareFormData(this.messageRef);
    this.messageService.sendMessage(formData).subscribe(data => {
    console.log(data)
      this.messageRef.message=""
    });
  }
}
