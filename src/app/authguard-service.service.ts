import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router'
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardServiceService implements CanActivate{
  canActivate(
    route:ActivatedRouteSnapshot,
    state:RouterStateSnapshot) {

      if(this.service.isUserLoggedIn()){
        return true
      }
      else{
        this.router.navigate(['login']);
        return false;
      }

  }

  constructor(private service:AuthServiceService,private router: Router) { }
}
