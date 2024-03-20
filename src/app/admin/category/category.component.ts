import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet, RouterModule } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Storage, getDownloadURL, percentage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { ApiService } from '../../service/api.service';
import {category, categoryResponse} from '../../shared/interfaces/category';
import { ImageService } from '../../service/image/image.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [FormsModule,CommonModule, RouterLink, RouterLinkActive, RouterOutlet, RouterModule, ReactiveFormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
public addCategory:boolean=false;
public categoryForm: FormGroup;
public isUploaded=false;
public percentage!:number;
public categoryForAdmin:category[]=[];
public isEdit:boolean=false;
public fileData: File | null = null;
editIndex:any;
constructor(private fb: FormBuilder, public data:ApiService, public imageServise:ImageService) {
  this.categoryForm = this.fb.group({
    title: ['', Validators.required],
    path: ['', Validators.required],
    img:['']

  })
}
ngOnInit(){
 this.getCategories();

}
getCategories(){
  this.data.getFireBaseCategory().subscribe((res)=>{
    this.categoryForAdmin=res as categoryResponse[];
  })

}
deleteItem(id:any){
  this.data.deleteCategory(id).then(()=>{
    this.getCategories();
  })
}
addCategoryAction():void{
  this.addCategory = !this.addCategory;

}
onSubmit(){
}
createCategory(){
if(this.fileData===null){
  this.data.createFireBaseCategory(this.categoryForm.value).then((data)=>{
this.getCategories();
this.categoryForm.reset();
this.fileData=null;
  })
}
else {
  this.imageServise.uploadFile('images', this.fileData.name, this.fileData).then((data => {
    let category = this.categoryForm.value;
    category.img = data;
    this.data.createFireBaseCategory(category).then((data)=>{
      this.getCategories();
      this.categoryForm.reset();
      this.fileData = null;
    });
  })
  ).catch((error) => { console.log(error) })
}
}
editItem(item:category){
  this.addCategory=true;
  this.editIndex=item.id;
  this.isEdit=true;
  this.categoryForm.patchValue({
    title:item.title,
    path:item.path,
    img:item.img
  });


}
saveChanges(){
  this.data.editCategory(this.editIndex, this.categoryForm.value).then(()=>{
    this.getCategories();
    this.isEdit=false;
    this.categoryForm.reset()
  })

}
upload(event:any){
  this.fileData = event.target.files[0];

}

valueByControl(control:string):string{
return this.categoryForm.get(control)?.value;

}
}
