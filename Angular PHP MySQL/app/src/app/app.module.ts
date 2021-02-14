import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { LoginComponent } from './core/components/login/login.component';
import { RegisterComponent } from './core/components/register/register.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AuthGuardService } from './shared/services/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,      
  ],
  imports: [
    RouterModule.forRoot([           
      { path: "", component: HomeComponent, canActivate : [AuthGuardService] },       
      { path: "login", component: LoginComponent }, 
      { path: "register", component: RegisterComponent },                                        
    ]),      
    BrowserModule,    
    SharedModule,
    CoreModule,    
  ],
  providers: [
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
