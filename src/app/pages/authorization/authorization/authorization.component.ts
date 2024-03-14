import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../../../service/account/account.service';
import { Role } from '../../../shared/constant/constant';
import { Router } from '@angular/router';
import { Auth, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-authorization',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.sass'
})
export class AuthorizationComponent implements OnInit, OnDestroy {
  public registrationForm!: FormGroup;
  public loginSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private accountServise: AccountService,
    private router: Router,
    private auth: Auth,
    private afs: Firestore) {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,]],
    });

  }
  ngOnDestroy(): void {
    //  this.loginSubscription.unsubscribe();
  }
  ngOnInit(): void {

  }

  //  ngOnInit(): void {
  //    this.logIn();

  //  }

  onSubmit(): void {
    console.log(this.registrationForm.value);
  }
  logIn(): void {
    //  this.accountServise.login(this.registrationForm.value).subscribe(data=>{
    //   console.log( data[0].role)

    //   if(data){
    //     const user=data[0];
    //     console.log(user)
    //     localStorage.setItem('currentUser', JSON.stringify(user));
    //     this.accountServise.isUserLogin.next(true);
    //     if( user.role===Role.user){
    //       this.router.navigate( ['/profile']);
    //     }
    //     else if(user.role===Role.admin){
    //       this.router.navigate( ['/admin-component']);
    //     }
    //   }
    //  })

    const { email, password } = this.registrationForm.value;
    this.login(email, password).then(() => {
      console.log('Well done')

    }).catch(e => {
      console.log(e)
    })

  }

  async login(email: string, password: string): Promise<any> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
  
    docData(doc(this.afs, "users", credential.user.uid)).subscribe((user) => {
     
      const currentUser:any = user;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      this.accountServise.isUserLogin.next(true);
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
    const { email, password } = this.registrationForm.value;
    this.emailSignUp(email,password).then(()=>{

    });

  }
  async emailSignUp(email:string, password:string):Promise<void>{
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    const user={
      firstName:'',
      lastName:'',
      email:credential.user.email,
      address:'',
      phoneNumber:'',
      role:'User',
      orderd:[],
    }
    setDoc(doc(this.afs, 'users', credential.user.uid), user);

  }

}