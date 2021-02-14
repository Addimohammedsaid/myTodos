import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { User } from '../modules/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly rootUrl = environment.baseUrl
  constructor(private http:HttpClient, private _router:Router) { }
 
  login(user: any){
    return this.http.post(this.rootUrl+"/authentication/login.php", JSON.stringify(user)).pipe(
      map( 
        (res : any) =>{
        if (res){                    
          localStorage.setItem('user', JSON.stringify(res["data"]));
          return true;
        }
        else { return false;} 
      })
    );
  }

  register(user: any){
    return this.http.post(this.rootUrl+"/authentication/register.php", JSON.stringify(user)).pipe(
      map( 
        (res:any) =>{
        if (res) {          
          localStorage.setItem('user', JSON.stringify(res['data']));
          return true;
        }
        else { return false;} 
      })
    );
  }
  
  logout(){
    localStorage.removeItem('user');    
    this._router.navigate(['/']);    
  }

  getUser() {
    return localStorage.getItem('user');
  }

  isLoggedIn() {
    const user = this.getUser();
    if (user != null) {
      return true
    }
    return false;
  }
}
