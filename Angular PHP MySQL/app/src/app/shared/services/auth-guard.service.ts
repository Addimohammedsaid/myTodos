import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private dataService: AuthService,private router: Router ) {}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
  const routeurl: string = state.url;
  return this.isLogin(routeurl);
  }
  
  isLogin(routeurl: string): boolean{
    if (this.dataService.isLoggedIn()) {
      return true;
    } 
    const redirectUrl:string = routeurl;
    this.router.navigate(['/login'], {queryParams: { returnUrl: routeurl }} );
    return false;
  }  

}
