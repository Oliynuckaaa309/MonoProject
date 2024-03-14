import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet, RouterModule } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Storage, getDownloadURL, percentage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { ApiService } from '../../service/api.service';
import { IProduct } from '../../shared/interfaces/product';
import { category } from '../../shared/interfaces/category';
import {ImageService} from '../../service/image/image.service'

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule,CommonModule, RouterLink, RouterLinkActive, RouterOutlet, RouterModule, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.sass'
})
export class ProductsComponent {
  public addProduct:boolean=false;
  public isEdit:boolean=false;
  public productForm:FormGroup;
  public isUploaded:boolean=false;
  public  adminProducts:IProduct[]=[];
  public adminCategory:category[]=[];
  private currentCategoryId!:any;
  private currentId!:any;
  public fileData: File | null = null;


  constructor(private fb:FormBuilder, private data:ApiService, private storage:Storage, private imageService:ImageService) {
    this.productForm = this.fb.group({
      category: ['', Validators.required],
      name: ['', Validators.required],
      path: ['', Validators.required], 
      description: ['',], 
      weight: ['', Validators.required], 
      price: ['', Validators.required], 
      imagePath:['', Validators.required], 
      count:[1]
  
    })
  }
  addProducts(){
    this.addProduct = !this.addProduct;
  }
  ngOnInit(){
    this.loadCategories();
    this.loadProducts();
  }
  createProduct(){
    if(this.fileData===null){
      this.data.createProduct(this.productForm.value).subscribe((data)=>{
    this.loadProducts();
    this.productForm.reset();
    this.fileData=null;
      })
    }
    else {
      this.imageService.uploadFile('images', this.fileData.name, this.fileData).then((data => {
        let product = this.productForm.value;
        product.img = data;
        this.data.createProduct(product).subscribe((data)=>{
          this.loadProducts();
          this.productForm.reset();
          this.fileData = null;
          this.addProduct=false;
        });
      })
      ).catch((error) => { console.log(error) })
    }
   

  }
  loadCategories(){
    this.data.getCategory().subscribe((data)=>{
       this.adminCategory=data;
       this.productForm.patchValue({
        category: this.adminCategory[0].id
       })
      
  })
  }
  loadProducts(){
    this.data.getProducts().subscribe((data)=>{
      this.adminProducts=data;
  })
  }
  changeCategory(category:any){
   console.log(category.value)
  }
  onSubmit(){

  }
  editProduct(product:IProduct){
  this.addProduct=true;
  this.isEdit=true;
  this.currentId=product.id;
  this.productForm.patchValue({
    category:product.category,
    name: product.name,
      path: product.path, 
      description: product.description, 
      weight: product.weight, 
      price:product.price, 
      img:product.img, 
      count:[1]
  })  }
  saveChanges(){
    this.data.updateProduct(this.currentId,this.productForm.value).subscribe(()=>{
      this.loadProducts();
      this.productForm.reset();
      this.isEdit=false;
      this.addProduct=false;

    })

  }
  deleteProduct(id:any){
    this.data.deleteProduct(id).subscribe(data=>{
      this.loadProducts();
      this.isEdit=false;
    this.productForm.reset()
    })

  }
  upload(event:any){
      this.fileData = event.target.files[0];
  }
  valueByControl(control:string){
      return this.productForm.get(control)?.value;
    
  }

}
