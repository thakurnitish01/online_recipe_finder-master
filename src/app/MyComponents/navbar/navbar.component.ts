import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FireauthService } from 'src/app/services/fireauth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor (private router : Router, private fireService : FireauthService){}


 logOut(): void {
    this.fireService.logout()
      .then(() => {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
            this.router.navigate([''])
          }
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  }
}
