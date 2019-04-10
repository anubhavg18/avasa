import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class BeforeLoginService {
  public userLoggedInData:any;
  constructor(private Token: TokenService,private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    this.userLoggedInData=this.Token.isUserLoggedIn();
    if (this.userLoggedInData==false) {
      return true;
    }
    this.router.navigateByUrl('/');
    return false;
  }
    // return !this.Token.loggedIn();
  }
  

