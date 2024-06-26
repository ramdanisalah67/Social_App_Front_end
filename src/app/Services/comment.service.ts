import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../Models/Comment';
import { ReplyComment } from '../Models/ReplyComment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  API ="http://localhost:8090/api/comment/"
  constructor(private http:HttpClient) { }


  public addComment(comment:FormData):Observable<any>{
      return this.http.post(this.API+'add',comment)
  }
  public addCommentAsResponse(comment:ReplyComment):Observable<any>{
    return this.http.post(this.API+'reply',comment)
}
  
public getCommentWithResponses(postId:string):Observable<any>{
  return this.http.get(this.API+'commentsWithReponse/'+postId)
}

public getResponsesByComment(commentId:string):Observable<any>{
  return this.http.get(this.API+'getResponsesByComment/'+commentId)
}
}
