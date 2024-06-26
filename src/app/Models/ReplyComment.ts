import { ImageHandle } from "./ImageHandle"

export class ReplyComment {
    email:string 
    content:string
    postId:string
    responseTo:string
    media:ImageHandle= new ImageHandle()
}