import { Routes } from '@angular/router';
import { RegistroComponent } from './registro/registro.component';

export const routes: Routes = [
  { path: 'registro', component: RegistroComponent },
  { path: '', pathMatch: 'full', redirectTo: 'registro' },
  { path: '**', redirectTo: 'registro' }
];