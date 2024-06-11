import { ImageHandle } from "./ImageHandle";

export class RegistredUser {
    fullName:string
    email:string
    phoneNumber:string 
    password:string
    images:ImageHandle[]=[];
    
}