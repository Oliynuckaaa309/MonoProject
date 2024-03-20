import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormGroupName,
  FormsModule,
  Validators,
  ReactiveFormsModule,
  AbstractControl
} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from '../../service/account/account.service';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { Auth, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Role } from '../../shared/constant/constant';
import {IRegister} from "../../shared/interfaces/register";

@Component({
  selector: 'app-dialog-auth',
  standalone: true,
  imports: [ FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule, CommonModule],
  templateUrl: './dialog-auth.component.html',
  styleUrl: './dialog-auth.component.css'
})
export class DialogAuthComponent implements OnInit {
  public authForm!:FormGroup;
  public registerForm!:FormGroup;
  private registerData!:IRegister;
  public logUser:boolean=true;
  public isUserLogin:boolean=true;
  public checkPassword=false;

constructor(private fb: FormBuilder,
  public dialog: MatDialog,
  private auth: Auth,
  private afs: Firestore,
  public router: Router,
  private acc:AccountService) {
  this.authForm=this.fb.group({
    email:[null,[Validators.required,Validators.email]],
    password:[null,[Validators.required]],
  });
  this.registerForm=this.fb.group({
    firstName:[null,Validators.required],
    lastName:[null,Validators.required],
    phoneNumber:[null,Validators.required],
    email:[null, Validators.required],
    password:[null, Validators.required],
    confirmationPassword:[null, Validators.required],


  })
}
ngOnInit(): void {

}
onSubmit(){}

closeWindow(){
  this.dialog.closeAll();

}

logIn(): void {
  const { email, password } = this.authForm.value;
  this.login(email, password).then(() => {
    console.log('Well done');
    this.dialog.closeAll();

  }).catch(e => {
    console.log(e)
  })

}

async login(email: string, password: string): Promise<any> {
  const credential = await signInWithEmailAndPassword(this.auth, email, password);

  docData(doc(this.afs, "users", credential.user.uid)).subscribe((user) => {

    const currentUser:any = user;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    this.acc.isUserLogin.next(true);
    if (currentUser) {
      console.log(currentUser.role);
      if (currentUser.role === Role.user) {
        this.router.navigate(['/profile/info']);
      }
      else if (currentUser.role === Role.admin) {
        this.router.navigate(['/admin-component']);
      }
    }
  })
}
registerUser(){
  this.isUserLogin=false;
}
returnLoginPage(){
  this.isUserLogin=true;
}

registerUsers(){
  const { email, password } = this.registerForm.value;
  this.registerData= this.registerForm.value
  this.emailSignUp(email,password).then(()=>{
    this.login(email,password);
  });
  this.router.navigate(['/profile']);
  this.dialog.closeAll();
}
async emailSignUp(email:string, password:string):Promise<void>{
  const credential = await createUserWithEmailAndPassword(this.auth, email, password);
  const user={
    firstName:this.registerData.firstName,
    lastName:this.registerData.lastName,
    email:credential.user.email,
    address:'',
    phoneNumber:'',
    role:'User',
    orderd:[],
  }
  setDoc(doc(this.afs, 'users', credential.user.uid), user);
  this.isUserLogin=false;


}
checkConfirmedPassword(){
  this.checkPassword=this.password.value===this.confirmed.value;
  if(this.password.value!=this.confirmed.value){
    this.registerForm.controls['confirmationPassword'].setErrors({
      matchError:'Password you entered'
    })
  }

}
get password():AbstractControl{
  return this.registerForm.controls['password'];
}
  get confirmed():AbstractControl{
    return this.registerForm.controls['confirmationPassword'];
  }
  checkVisibilityError(control:string, name:string):boolean | null{
  return this.registerForm.controls[control].errors?.[name];

  }

}
