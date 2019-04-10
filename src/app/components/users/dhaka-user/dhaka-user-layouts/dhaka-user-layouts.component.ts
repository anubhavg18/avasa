import { Component, OnInit } from '@angular/core';
import {TokenService} from 'src/app/services/login/token.service';
import { Auth1Service } from 'src/app/services/login/auth1.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dhaka-user-layouts',
  templateUrl: './dhaka-user-layouts.component.html',
  styleUrls: ['./dhaka-user-layouts.component.css']
})
export class DhakaUserLayoutsComponent implements OnInit {

  public username:string;
  constructor(private Token:TokenService,private Auth:Auth1Service,private router:Router) { 
    this.username=this.Token.getLoggedInUserEmail() }

  ngOnInit() {
  }
  logout(event:MouseEvent){
    event.preventDefault();
    this.Token.remove();
    this.Auth.changeAuthStatus(false);
    this.router.navigateByUrl('/login');
  }


}
