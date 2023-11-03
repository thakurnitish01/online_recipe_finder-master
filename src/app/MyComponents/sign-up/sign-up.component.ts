import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FireauthService } from 'src/app/services/fireauth.service';
import Swal from 'sweetalert2';
import {AngularFirestore} from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm !: FormGroup;


  constructor(private formBuilder: FormBuilder,
              private fireservice : FireauthService,
              private router : Router,
              private firestore : AngularFirestore) {
  }
  
  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], 
      password: ['', Validators.required],
      cnfpassword: ['', Validators.required]
    });
  }

  onSubmit(){
      const email = this.signUpForm.value.email;
      const password = this.signUpForm.value.password;
      const confirmPass = this.signUpForm.value.cnfpassword
      if ( password == confirmPass)
      {
        this.fireservice.createAccount(email, password).then(
          (resp) => {
            this.firestore.collection('users').add({
              name: name,
              email: email,
              password: password
            })
            console.log("account has been created");
            Swal.fire('Success', 'Account has been created...!', 'success');
            this.router.navigate(['']);
          }
        ).catch((error) => {
          console.error("Error creating account: ", error);
          Swal.fire('Error', 'Failed to create an account. Please try again.', 'error');
        });
      }else{console.log("password missmatch...")
      Swal.fire('Oops', 'Password Missmatch. Please try again.', 'warning');
    }

  }
}
