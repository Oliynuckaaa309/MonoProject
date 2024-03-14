import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ilogin } from '../../shared/interfaces/account';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public isUserLogin = new Subject<boolean>();
 
  public api={
    category:'http://localhost:3000/category',
    actions:'http://localhost:3000/actions', 
    products:'http://localhost:3000/products', 
    users:'http://localhost:3000/users'
   }
  constructor(public http:HttpClient) { }
 login(credential:Ilogin):Observable<any>{
  return this.http.get<any>(`${this.api.users}`+ `?email=${credential.email}` );
   }
}
