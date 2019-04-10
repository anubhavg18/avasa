import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login/login.service'
import { TokenService } from 'src/app/services/login/token.service';
import { Auth1Service } from 'src/app/services/login/auth1.service';
import { AuthService,FacebookLoginProvider,GoogleLoginProvider,} from 'angular-6-social-login-v2';
import { NotifierService } from 'angular-notifier';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
	private readonly notifier: NotifierService;
	loginForm: FormGroup;
	submitted = false;
		constructor(private formBuilder: FormBuilder,public loginService: LoginService, private Token:TokenService,
			private Auth:Auth1Service,private socialAuthService: AuthService,private router:Router,notifierService: NotifierService) 
		{
			this.notifier = notifierService;
		}

		public form = {
			email:null,
			password:null,
			loginMethod :'email',
		};
	
		public error=null;

  	ngOnInit() {
			this.loginForm = this.formBuilder.group({
				email: ['', Validators.required],
				password: ['', Validators.required]
		});
		}
		
		get f() { return this.loginForm.controls; }

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
				// Now sign-in with userData
				// ...
				}
				);
				}


  	login() {
			this.submitted = true;

			// stop here if form is invalid
			if (this.loginForm.invalid) {
					return;
			}
			// console.log(this.loginForm);
			this.form.email=this.f.email.value;
			this.form.password=this.f.password.value;
	    this.loginService.login(this.form).subscribe(
				data => this.handleResponse(data),
				// error=>console.log(error),
				error => this.notifier.notify('error',error.error.Comments),
			
			)};
			
			handleResponse(data){
				
				let userData=JSON.stringify(data.Result);
				this.Token.handle(userData);
				
				if(data.Result.userRole==0){
					this.Auth.changeAuthStatus(true);
					this.router.navigateByUrl('/home-search');
				}
				else if(data.Result.userRole==1){
					this.Auth.changeAuthStatus(true);
					this.router.navigateByUrl('/dhaka/user');
				}
				else if(data.Result.userRole==2){
					this.Auth.changeAuthStatus(true);
					this.router.navigateByUrl('/approve-team/user');
				}
				else if(data.Result.userRole==3){
					this.Auth.changeAuthStatus(true);
					this.router.navigateByUrl('/dialog-flow/user');
				}

				else if(data.Result.userRole==4){
					this.Auth.changeAuthStatus(true);
					this.router.navigateByUrl('/super-admin/user');
				}

				// this.Auth.changeAuthStatus(true);
			// this.router.navigateByUrl('dhaka/user');
			}

			
	}


  

