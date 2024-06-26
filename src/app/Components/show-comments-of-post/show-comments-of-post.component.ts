import { Component, ElementRef, EventEmitter, HostListener, Inject, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Comment } from 'src/app/Models/Comment';
import { ImageHandle } from 'src/app/Models/ImageHandle';
import { LikeRequest } from 'src/app/Models/LikeRequest';
import { RegistredUser } from 'src/app/Models/RegistredUser';
import { ReplyComment } from 'src/app/Models/ReplyComment';
import { WebsocketPostService } from 'src/app/Services/Websocket/websocket-post.service';
import { CommentService } from 'src/app/Services/comment.service';
import { HandleTimeService } from 'src/app/Services/handle-time.service';
import { ImageProcessingService } from 'src/app/Services/image-processing.service';
import { PostService } from 'src/app/Services/post.service';

@Component({
  selector: 'app-show-comments-of-post',
  templateUrl: './show-comments-of-post.component.html',
  styleUrls: ['./show-comments-of-post.component.scss'],
})
export class ShowCommentsOfPostComponent  implements OnInit {
  post:any
  comment:Comment= new Comment()
  email =""
  commentOwner:any
  message: string = '';
  showEmojiPicker: boolean = false;
  visibility="none"
  selectedImage: any;
  imageReplyComment :string
  connectUser:any
  commentWithResponses:any[] = []
  mediavisibility:boolean=false
  @ViewChild('replyInput') replyInput: ElementRef;

  @Output() clickOutside = new EventEmitter<void>();

  constructor(private elementRef: ElementRef,private socketPost:WebsocketPostService,public dialogRef: MatDialogRef<ShowCommentsOfPostComponent>,private sanitizer: DomSanitizer,private postService:PostService,
    private imageProcess:ImageProcessingService, @Inject(MAT_DIALOG_DATA) public data:any,private commentService:CommentService,
  public handleTime:HandleTimeService) { }

  ngOnInit() {
    this.post = this.data.p;
    this.connectUser = this.data.connectUser
    console.log(this.post)
    this.email = localStorage.getItem("email") || ""
    this.comment.email=this.email
    this.comment.postId=this.post.id 
    this.commentService.getCommentWithResponses(this.post.id).subscribe(data=>{
      this.commentWithResponses =data
      console.log(this.commentWithResponses)
      this.commentWithResponses.forEach((c:any) => {
                  this.imageProcess.createImage(c.comment.owner)
                  if(c.comment.media) {
                    console.log("this is media")
                    this.imageProcess.createImageForComment(c.comment)
                  }
      });
    })

  


        //call postService
        this.socketPost.getMessages().subscribe(
          (actionUser: any) => {
           console.log("user did something to post")

           if(this.post.id == actionUser.postId){
            let index = this.post.nbr_liked.findIndex((liked:any)=>liked.email === actionUser.userKafka.email)
            
            if(index === -1){
              if(actionUser.action === 'Like') {
                console.log("user like this post")
                this.post.nbr_liked.push(actionUser.userKafka) 
              
              }
           }
           if(index != -1){
            if(actionUser.action === 'removeLike') {
              console.log("user remove like this post")
    
              this.post.nbr_liked.splice(index,1)
    
                                                 }
                           }
                                              }
        
                               }
        );
  }
  @HostListener('document:click', ['$event.target'])
    
  onClick(target: any) {
    const clickedInsideEmojiPicker = target.closest('div.emoji') !== null;
    if (!clickedInsideEmojiPicker) {
      this.showEmojiPicker = false;
    }
  }
  addEmoji(event: any) {
    // Append the selected emoji to the message
    console.log(event.emoji.native)
    this.comment.content+= event.emoji.native
  }


  saveComment(){
    console.log(this.comment)
    const formData = this.prepareFormData(this.comment)


      this.commentService.addComment(formData).subscribe(data=>{
        console.log(data)
        if(data.statusCode == "200"){
          this.imageReplyComment=""
          if(this.commentWithResponses.length<=0){
            this.imageProcess.createImage(data.comment.owner)
            if(data.comment.media) this.imageProcess.createImageForComment(data.comment)
              let obj = {
                'comment' : data.comment,
                'responses' : []
              }

            this.commentWithResponses.push(obj)

          } 
            else {
              this.imageProcess.createImage(data.comment.owner)
              if(data.comment.media){
                this.imageProcess.createImageForComment(data.comment)
              }
              let obj = {
                'comment' : data.comment,
                'responses' : []
              }
                this.commentWithResponses.unshift(obj)
              
            } 

          this.comment.content=""
        }
      })
  }

  hasLikedPost(): boolean {
    let index = this.post.nbr_liked.findIndex((user:any) => user.email === this.email);
    if(index ==-1) return false
    else return true  
}

  removeLike(){
    let userIndex = this.post.nbr_liked.findIndex((a: any) => a.email === this.email);
    
    if (userIndex !== -1) {
      this.post.nbr_liked.splice(userIndex, 1); // Use splice instead of slice to remove the item
  
      let request: LikeRequest = new LikeRequest();
      request.email = this.email;
      request.postId = this.post.id;
  
      this.postService.removeLike(request).subscribe(data => {
        console.log(data);
      });
    }
  }

  likePost() {
    let user:RegistredUser= new RegistredUser()
    user.email=this.email 
    this.post.nbr_liked.push(user)
    let request:LikeRequest= new LikeRequest()
    request.email=this.email
    request.postId= this.post.id
    console.log(request)
    this.postService.LikePost(request).subscribe(data=>{
      console.log(data)
    })
  }


  replyComment(selectedComment:any){
    this.replyInput.nativeElement.focus();
    this.comment.responseTo = selectedComment.id 
    this.imageReplyComment = selectedComment.owner.images[0].url 
  }


  change(){
    if(this.visibility=== 'none') this.visibility="block"
    else this.visibility="none"
    console.log(this.visibility)
  }

  onFileSelected(e: any) {
    const fileChosen = e.target.files[0];
    const fileHandle: ImageHandle = {
      file: fileChosen,
      url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(fileChosen)) as SafeUrl,
    };
    this.selectedImage = fileHandle;
    console.log('Selected Image:', this.selectedImage);
    this.comment.media = fileHandle;
  }

  removeImage(i: number) {
    this.comment.media = new ImageHandle()

}
prepareFormData(comment: any): FormData {
  const formData = new FormData();
  comment.email = localStorage.getItem('email') || '';
  formData.append('comment', new Blob([JSON.stringify(comment)], { type: 'application/json' }));

  if(comment.media){
    formData.append('media', comment.media.file, comment.media.file.name);
    comment.media = new ImageHandle()

  }
  return formData;
}



getResponsesBySelectedComment(commentId:string){
  console.log(commentId)
  this.commentService.getResponsesByComment(commentId).subscribe(data=>{
    console.log(data)
  })
}
}