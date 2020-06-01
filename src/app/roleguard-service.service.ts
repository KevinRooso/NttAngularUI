import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class RoleguardServiceService implements CanActivate {
  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
    if (this.service.isUserAdmin()) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }

  constructor(private service: AuthServiceService, private router: Router) {}
}
