import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './components/nav/nav.component';



@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavComponent,
  ],
  imports: [ 
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild([]),
  ],
  exports: [HomeComponent, LoginComponent, RegisterComponent,NavComponent,],
})


export class CoreModule { }
