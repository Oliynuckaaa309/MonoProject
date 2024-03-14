import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Storage, getDownloadURL, percentage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { RouterLink, RouterLinkActive, RouterOutlet, RouterModule, Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { subscribe } from 'diagnostics_channel';
import { category } from '../../shared/interfaces/category';
import { IProduct } from '../../shared/interfaces/product';
import { OrderService } from '../../service/product-info/order.service';
import { Role } from '../../shared/constant/constant';
import { AccountService } from '../../service/account/account.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogAuthComponent } from '../dialog-auth/dialog-auth.component';
import { BasketComponent } from '../basketPage/basket/basket.component';
import { CallbackComponent } from '../callback/callback.component';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink, RouterLinkActive, RouterOutlet, RouterModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})


export class MainComponent {
  public useForm!: FormGroup;
  public percentage!: number;
  public uploadPercentage!: number;
  public isBurgerMenu: boolean = false;
  public categoryArray: category[] = [];
  public basket: Array<IProduct> = [];
  public total: any=0;
   public isLogin:boolean=false;
   public isAdmin: boolean=false;
   public isUser:boolean=false;
  constructor(private fb: FormBuilder,
     public data: ApiService, 
     public order: OrderService, 
     public account:AccountService,
     public router:Router,
     public dialog: MatDialog) {
    this.useForm = this.fb.group({
      name: ['hyhy', Validators.required],
      age: ['23', Validators.required],
      filePath: ['']
    })
  }

  ngOnInit(): void {
    this.getCategories();
    this.loadBasket();
    this.updateBasket();
    this.checkUserLogin();
    this.account.isUserLogin.subscribe((isLogin) => {
      this.checkUserLogin();
    });
  }
  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem("basket")) {
      this.basket = JSON.parse(localStorage.getItem("basket") as string)
    }
   this.total= this.getTotalPrice();
  }

  getTotalPrice(): number {
    return this.basket.reduce((total: number, prod: IProduct) => {
      return total + (prod.count * prod.price);
    }, 0);
  }
  
  getCategories() {
    this.data.getCategory().subscribe(category => {
      this.categoryArray = category;

    }
    )

  }

  onSubmit() {
    console.log(this.useForm.value)
  }
  add() {
    console.log(this.useForm.value)
  }

  openMenu(): void {
    this.isBurgerMenu = true;
  }
  closeMenu(): void {
    this.isBurgerMenu = false;
  }
  updateBasket() {
    this.order.changeBasket.subscribe(() => {
      this.loadBasket();
    })
  }
  
   checkUserLogin():void{
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    if(currentUser){
      this.isLogin=true;
      if (currentUser.role === Role.admin) {
               this.isAdmin = true;
        } 
    } else {
      this.isLogin = false;
      this.isAdmin = false;
    }
  }
  openUserWindow(){
    this.isUser=!this.isUser
  }
  userOut():void{
    this.router.navigate(['']);
    localStorage.removeItem('currentUser');
    this.account.isUserLogin.next(false);
    this.isUser=false;
  }
  openLoginDialog():void{
  this.dialog.open(DialogAuthComponent, { autoFocus: false })
  }
  openBasket(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.position = {
      top: '75px',    
      right:'0px'   
    };
    this.dialog.open(BasketComponent, dialogConfig)
    };
    showCallBackForm(){
      this.dialog.open(CallbackComponent);
    }
  }


