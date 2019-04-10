import { Component, OnInit } from '@angular/core';
import {TokenService} from 'src/app/services/login/token.service';
import { Auth1Service } from 'src/app/services/login/auth1.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.css']
})
export class LayoutsComponent implements OnInit {
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
