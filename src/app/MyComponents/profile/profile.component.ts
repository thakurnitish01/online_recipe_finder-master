import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userEmail: string = '';

  constructor(private afAuth: AngularFireAuth, private router : Router) {}

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userEmail = user.email || '';
        console.log('User email:', this.userEmail);
      } else {
        console.log('User is not logged in');
      }
    });
  }

  async deleteAccount() {
    const user = await this.afAuth.currentUser;
    if (user) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete my account!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await user.delete();
            console.log('User account deleted successfully');
            this.router.navigate([''])
          } catch (error) {
            console.error('An error occurred while deleting the user account:', error);
          }
        }
      });
    }
  }
}
