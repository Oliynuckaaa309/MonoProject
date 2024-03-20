import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Storage, getDownloadURL, percentage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { ApiService } from '../../service/api.service';
import { actions } from '../../shared/interfaces/actions';
import { ImageService } from '../../service/image/image.service';
@Component({
  selector: 'app-actions',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, RouterModule, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.css'
})
export class ActionsComponent {
  public actionForm: FormGroup;
  public addAction: boolean = false;
  public percentage!: number;
  public isUploaded = false;
  public actionsAdmin: actions[] = [];
  public isEdit=false;
  public editIndex!:any;
  public fileData: File | null = null
  constructor(private fb: FormBuilder, private storage: Storage, public data: ApiService, public imageServise:ImageService) {
    this.actionForm = this.fb.group({
      title: ['', Validators.required],
      main_title: ['', Validators.required],
      description: ['', Validators.required],
      path:['', Validators.required],
      image: ['']

    })
  }
  ngOnInit(): void {
    this.getActionsForAdmin();
  }
  getActionsForAdmin() {
    this.data.getActions().subscribe(res => {
      this.actionsAdmin = res as actions[];
    })
  }
  deleteActions(id:any){
    this.data.deleteAction(id).then(()=>{
      this.getActionsForAdmin();
    })

  }
  editItem(item:actions){
    this.addAction = true;
     this.editIndex=item.id;
     this.isEdit=true;
    this.actionForm.patchValue({
      title:item.title,
      main_title:item.main_title,
      description: item.description,
      image:item.image
    });


  }
  saveChanges(){

    this.data.editAction(this.editIndex, this.actionForm.value).then(()=>{
      this.getActionsForAdmin();
      this.isEdit=false;
      this.actionForm.reset();
})
  }
  createDiscount(){
    if(this.fileData === null){
      this.data.createActions(this.actionForm.value).then((data)=>{
        this.getActionsForAdmin();
        this.actionForm.reset();
        this.fileData = null;

      });
    } else {
    this.imageServise.uploadFile('images', this.fileData.name, this.fileData).then((data => {
      let discount = this.actionForm.value;
      discount.image = data;
      this.data.createActions(discount).then((data)=>{
        this.getActionsForAdmin();
        this.actionForm.reset();
        this.fileData = null;
      });
    })
    ).catch((error) => { console.log(error) })
  }

  }
  addActions(): void {
    this.addAction = true;

  }
  onSubmit(): void {
    console.log(this.actionForm.value);


  }
  upload(event: any) {
    this.fileData = event.target.files[0];

  }
  valueByControl(control: string): string {
    console.log('value by control ' + control)
    return this.actionForm.get(control)?.value;

  }
}
