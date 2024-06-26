import { ImageHandle } from "./ImageHandle"

export class AuthResponse {
    token:string
    fullName:string
    email:string
    status:string
    images:ImageHandle[]=[]
}