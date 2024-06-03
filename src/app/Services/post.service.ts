import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export  class PostService {

  API="http://localhost:8084/api/post/"
  constructor(private http:HttpClient) { }


  public addPost(post:FormData):Observable<any>{
    return this.http.post(this.API+'add',post)
  }

  public allPost():Observable<any>{
    return this.http.get(this.API+'allPosts')
  }

  
}
