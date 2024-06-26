import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../Models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  API="http://localhost:8090/api/product/"
  constructor(private http:HttpClient) { }


  public addProduct(product:FormData):Observable<any>{
    return this.http.post(this.API+'add',product,{
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  }

}
