
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { actions} from '../shared/interfaces/actions';
import {category, categoryResponse} from '../shared/interfaces/category';
import { IProduct, IProductResponse } from '../shared/interfaces/product';
import {
  query,
  where,
  addDoc,
  collectionData,
  Firestore,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from "@angular/fire/firestore";
import {AngularFirestore, CollectionReference} from "@angular/fire/compat/firestore";
 import { DocumentData, collection, DocumentReference} from "@firebase/firestore";
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private categoryCollection!: CollectionReference<DocumentData>;
  private actionsCollection!: CollectionReference<DocumentData>;
  private productsCollection!: CollectionReference<DocumentData>;
  private oneCollection!: CollectionReference<DocumentData>;
  constructor(private  http:HttpClient,
              private afs:Firestore) {

    // @ts-ignore
    this.categoryCollection=collection(this.afs, 'categories') ;
    // @ts-ignore
    this.actionsCollection=collection(this.afs, 'action');
    // @ts-ignore
    this.productsCollection=collection(this.afs, 'products');
    // @ts-ignore

  }

  getActions(){
    // @ts-ignore
    return collectionData(this.actionsCollection, {idField:'id'})
  }
  getOneActiontByPath(path:string){
    const q = query(this.actionsCollection, where("path", "==", path));
    return getDocs(q);
  }

  createActions(action:actions){
    return addDoc(this.actionsCollection, action)
  }

  editAction(id:any, action:actions){
    // return this.http.patch<actions[]>(`${this.api.actions}/${id}`,action)
    const actionReferences= doc(this.afs,`action/${id}` );
    return updateDoc(actionReferences, {...action});
  }
  deleteAction(id:string){
    const actionReferences= doc(this.afs,`action/${id}` );
    return deleteDoc(actionReferences);

  }
  getProducts(){
    // @ts-ignore
    return collectionData(this.productsCollection, {idField:'id'})

  }
  getProductsByCategory(name:string){
    const q = query(this.productsCollection, where("category", "==", name));
    return getDocs(q);
  }

  getOneProductByPath(path:string | null){
    const q = query(this.productsCollection, where("path", "==", path));
    return getDocs(q);  }

  createProduct(product:IProduct){
    return addDoc(this.productsCollection, product)
  }
  updateProduct(id:any, product:IProduct) {
    const productsReferences= doc(this.afs,`products/${id}` );
    return updateDoc(productsReferences, {...product});
  }
  deleteProduct(id:any){
    const productsReferences= doc(this.afs,`products/${id}` );
    return deleteDoc( productsReferences);

  }


  deleteCategory(id:any){
    const categoryReferences= doc(this.afs,`categories/${id}` );
    return deleteDoc(categoryReferences, );


}
  editCategory(id:any, category:category){
    const categoryReferences= doc(this.afs,`categories/${id}` );
    return updateDoc(categoryReferences, {...category});
  }
  createFireBaseCategory(category:category){
    return addDoc(this.categoryCollection, category)
  }
getFireBaseCategory(){
    // @ts-ignore
  return collectionData(this.categoryCollection, {idField:'id'})
}
}
