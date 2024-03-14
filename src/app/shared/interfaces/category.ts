export interface category{
   id?:string;
    title:string;
    img:string;
    path:string;
}
export interface categoryResponse extends category{
id:string;
}