import { Routes } from '@angular/router';
import { SignInComponent } from './pages/auth/sign-in/sign-in.component';

export const routes: Routes = [
  {
    path: 'sign-in',
    title: 'Sign In',
    component: SignInComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sign-in',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'sign-in',
  },
];
