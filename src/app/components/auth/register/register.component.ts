
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login/login.service'
import { Observable } from 'rxjs/Observable';
import { TokenService } from 'src/app/services/login/token.service';
import { Auth1Service } from 'src/app/services/login/auth1.service';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider,
  VkontakteLoginProvider
} from 'angular-6-social-login-v2';
import { AlertService } from 'src/app/services/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
 
  private readonly notifier: NotifierService;

  constructor( private formBuilder: FormBuilder,public loginService: LoginService ,private Token:TokenService, private Auth:Auth1Service,private socialAuthService: AuthService,private router:Router,private alertService: AlertService,notifierService: NotifierService,) {
    this.notifier = notifierService;
   }
  // error:boolean;
  
  public form = {
    firstName:null,
    email:null,
    password:null,
    loginMethod :'email',
  };
  public socialSignIn(socialPlatform : string) {
		let socialPlatformProvider;
		if(socialPlatform == "facebook"){
		  socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
		}else if(socialPlatform == "google"){
		  socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
		}
		
		
		this.socialAuthService.signIn(socialPlatformProvider).then(
		  (userData) => {
			// console.log(socialPlatform+" sign in data : " , userData);
			// Now sign-in with userData
			// ...
      this.loginService.loginWithSocial(userData).subscribe(
				
				userData=>this.handleResponse(userData),
        error=>this.notifier.notify('error',error),
				
		  
				);
      });
    }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
      // password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }

  get f() { return this.registerForm.controls; }

  register() {
    this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        this.form.firstName=this.f.username.value;
        this.form.email=this.f.email.value;
        this.form.password=this.f.password.value;

    this.loginService.register(this.form).subscribe(
      (data) => this.handleResponse(data),
       error=>this.notifier.notify('error',error.error.Comments),
    )}


  handleResponse(data){

    let userData=JSON.stringify(data.Result);
    this.Token.handle(userData);
    this.Auth.changeAuthStatus(true);
    this.router.navigateByUrl('/home-search');
  }
  
  

}

