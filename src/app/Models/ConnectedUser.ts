import { ImageHandle } from "./ImageHandle"

export class ConnectUser {
    fullName:string
    email:string
    password:string
    status:string
    images:ImageHandle[]=[]
}