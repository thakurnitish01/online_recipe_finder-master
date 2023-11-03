import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FireauthService {

  constructor(private fireauth : AngularFireAuth,
              private router : Router) { }

  login(email : string, password : string){
    return this.fireauth.signInWithEmailAndPassword(email, password);
  }

  createAccount(email: string, password : string){
    return this.fireauth.createUserWithEmailAndPassword(email, password)
  }

  logout(){
   return this.fireauth.signOut();
  }
}
