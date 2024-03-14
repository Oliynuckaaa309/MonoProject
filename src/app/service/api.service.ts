
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { actions} from '../shared/interfaces/actions';
import { category } from '../shared/interfaces/category';
import { CategoryComponent } from '../admin/category/category.component';
import { IProduct, IProductResponse } from '../shared/interfaces/product';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
public api={
 category:'http://localhost:3000/category',
 actions:'http://localhost:3000/actions', 
 products:'http://localhost:3000/products', 
}
  constructor(private  http:HttpClient) { }
  getActions():Observable<actions[]>{
    return this.http.get<actions[]>(this.api.actions);
  }
  getProducts():Observable<IProduct[]>{
    return this.http.get<IProductResponse[]>(this.api.products);
  }
  getProductsByCategory(name:string):Observable<IProduct[]>{
    return this.http.get<IProductResponse[]>(`${this.api.products}?category=${name}`);
  }
  getOneProduct(id:number):Observable<IProduct>{
    return  this.http.get<IProduct>(`${this.api.products}/${id}`);
  }
  getOneProductByPath(path:string | null):Observable<IProduct[]>{
    return  this.http.get<IProduct[]>(`${this.api.products}?path=${path}`);
  }
  getOneActiontByPath(path:string):Observable<actions[]>{
    return  this.http.get<actions[]>(`${this.api.actions}?path=${path}`);
  }
  createProduct(product:IProduct):Observable<IProduct>{
    return this.http.post<IProduct>(this.api.products, product);
  }
  updateProduct(id:any, product:IProduct):Observable<IProductResponse> {
    return this.http.patch<IProductResponse>(`${this.api.products}/${id}`, product);
  }
  deleteProduct(id:any){
    return this.http.delete( `${this.api.products}/${id}` );
  }
  deleteAction(id:string):Observable<void>{
    return this.http.delete<void>(`${this.api.actions}/${id}`);
  
  }
  getCategory():Observable<category[]>{
    return this.http.get<category[]>(this.api.category);
  }
  deleteCategory(id:any):Observable<void>{
    return this.http.delete<void>(`${this.api.category}/${id}`);

}
createCategory(category:category):Observable<category>{
  return this.http.post<category>(this.api.category,category);
}

createActions(action:actions):Observable<actions>{
  return this.http.post<actions>(this.api.actions,action );
}
editCategory(id:any, category:category):Observable<category[]>{
  return this.http.patch<category[]>(`${this.api.category}/${id}`,category)
}
editAction(id:any, action:actions):Observable<actions[]>{
  return this.http.patch<actions[]>(`${this.api.actions}/${id}`,action)
}
 
}