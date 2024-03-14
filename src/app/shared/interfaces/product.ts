import { category } from "./category";

export interface IProduct{
    id?:string;
    category:category;
    name:string;
    path:string;
    description?:string;
    weight:string;
    price:number;
    imagePath:string;
    img?:string;
    count:number;
}
export interface IProductResponse extends  IProduct {
id:string;
 }