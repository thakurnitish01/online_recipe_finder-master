import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FireauthService } from 'src/app/services/fireauth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm !: FormGroup;


    constructor(private formBuilder: FormBuilder,
                private fireService : FireauthService,
                private router : Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(){
    if(this.loginForm.valid){
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      this.fireService.login(email, password).then((resp)=>{
        console.log("sucessfully login...");
        Swal.fire('Saved!', 'Successfully Login...!', 'success');
        this.router.navigate(['/dashboard'])
      })
      .catch((error) => {
        console.error("Error occurred during login:", error);
        Swal.fire('Error', 'Failed to log in. Please try again!', 'error');
      });
    }else{
      console.log("form is invalid...")
      Swal.fire('Opps..', 'Invalid Credentials ...!', 'error')
    }
  }
  onGoogleClick(){
    Swal.fire('Error', 'This feature is temporarily unavailable. Please try again later!', 'warning');
  }

 
}
