import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/login/token.service';
import { Auth1Service } from 'src/app/services/login/auth1.service';

@Component({
  selector: 'app-dialog-flow-users',
  templateUrl: './dialog-flow-users.component.html',
  styleUrls: ['./dialog-flow-users.component.css']
})
export class DialogFlowUsersComponent implements OnInit {
  public loggedIn:boolean;
  constructor(private Auth:Auth1Service,
    private router:Router,
    private Token:TokenService) { }

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
