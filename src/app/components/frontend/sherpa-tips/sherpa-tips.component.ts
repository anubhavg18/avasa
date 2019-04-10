import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/login/token.service';
import { Auth1Service } from 'src/app/services/login/auth1.service';
@Component({
  selector: 'app-sherpa-tips',
  templateUrl: './sherpa-tips.component.html',
  styleUrls: ['./sherpa-tips.component.css']
})
export class SherpaTipsComponent implements OnInit {
  public loggedIn:boolean;
  constructor(private router:Router,private Auth:Auth1Service,private Token:TokenService)
     {
     
     }

  ngOnInit() {
    this.Auth.authStatus.subscribe(value => this.loggedIn = value);
  }

  logout(event:MouseEvent){
    event.preventDefault();
    this.Token.remove();
    this.Auth.changeAuthStatus(false);
    this.router.navigateByUrl('/login');
  }

}
