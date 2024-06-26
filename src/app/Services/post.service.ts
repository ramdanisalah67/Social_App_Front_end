import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { LikeRequest } from '../Models/LikeRequest';

@Injectable({
  providedIn: 'root'
})
export  class PostService {
  private postCreatedSource = new Subject<any>(); // Subject to emit new posts
  postCreated$ = this.postCreatedSource.asObservable();
  API="http://localhost:8090/api/post/"
  
  constructor(private http:HttpClient) { }

  notifyPostCreated(post: any) {
    console.log("notify start execute ...")
    this.postCreatedSource.next(post); // Emit the new post
  }
  public addPost(post:FormData):Observable<any>{
    return this.http.post(this.API+'add',post,{reportProgress:true,responseType:'json'})
  }

  public allPostByEmail(email:string):Observable<any>{
    return this.http.get(this.API+'allPosts/'+email)
  }
  public allPost():Observable<any>{
    return this.http.get(this.API+'allPosts')
  }
  public allFriendPost(email:string):Observable<any>{
    return this.http.get(this.API+'allFriendsPost/'+email)
  }
  public LikePost(request:LikeRequest):Observable<any>{
    return this.http.post(this.API+'Like',request)
  }
  public removeLike(request:LikeRequest):Observable<any>{
    return this.http.post(this.API+'removeLike',request)
  }
  public postByPermission(email:string,page:number,size:number):Observable<any>{
    return this.http.get(this.API+'postByPermissions?email='+email+'&page='+page+'&size='+size)
  }

  public getUserReact(email:string):Observable<any>{
    return this.http.get(this.API+'getUserReact/'+email);
  }

  public updatePost(updatedPost:FormData):Observable<any>{
    return this.http.post(this.API+'update',updatedPost);
  }
}
