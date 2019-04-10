import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router  } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { isString } from 'util';


@Injectable({
  providedIn: 'root'
})
export class AfterLoginService {
  public userRole :any;
  constructor(private Token:TokenService,private router:Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    // return this.Token.loggedIn();
    
    this.userRole = this.Token.isRole();
    if (this.userRole === next.data.role && this.Token.loggedIn()==true) {
      return true;
    }
    this.router.navigateByUrl('/');
    return false;
  }
}
