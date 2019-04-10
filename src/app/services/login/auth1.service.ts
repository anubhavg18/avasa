import { Injectable } from '@angular/core';
import { TokenService } from 'src/app/services/login/token.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth1Service {

  constructor(private Token:TokenService) { }

private loggedIn = new BehaviorSubject<boolean>(this.Token.loggedIn());
authStatus = this.loggedIn.asObservable();

changeAuthStatus(value:boolean){
  this.loggedIn.next(value);
}
}
