import { ImageHandle } from "./ImageHandle";

export class Product {
    id:number
    name: string;
    description:string;
    images:ImageHandle[]=[];
}