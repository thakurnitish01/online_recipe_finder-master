import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './MyComponents/home/home.component';
import { SearchbarComponent } from './MyComponents/searchbar/searchbar.component';
import { DetailComponent } from './MyComponents/detail/detail.component';
import { FavoriteComponent } from './MyComponents/favorite/favorite.component';
import { LoginComponent } from './MyComponents/login/login.component';
import { SignUpComponent } from './MyComponents/sign-up/sign-up.component';
import { NavbarComponent } from './MyComponents/navbar/navbar.component';
import { ProfileComponent } from './MyComponents/profile/profile.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  {path : 'dashboard', component : NavbarComponent , 
                children  : [
                  { path: '', component: SearchbarComponent },
                  { path: 'home', component: HomeComponent },
                  { path: 'detail/:id', component: DetailComponent },
                  { path: 'favorite', component: FavoriteComponent},
                  { path: 'profile', component: ProfileComponent},
                ]}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
