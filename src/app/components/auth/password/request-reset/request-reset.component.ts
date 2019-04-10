import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../../services/login/login.service'
import { NotifierService } from 'angular-notifier';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {
  forgetPasswordForm: FormGroup;
  submitted = false;
  
  private readonly notifier: NotifierService;


  constructor(private formBuilder: FormBuilder,private loginService:LoginService,notifierService: NotifierService,) {
    this.notifier = notifierService;
    }
    
  public form={
    email:null
  }
  ngOnInit() {
    this.forgetPasswordForm = this.formBuilder.group({
      email: ['', Validators.required],
      
  });
  }
  
  get f() { return this.forgetPasswordForm.controls; }

  onSubmit(){
    this.form.email=this.f.email.value;
    this.loginService.sendResetPassword(this.form).subscribe(
      data => this.handleResponse(data),
      
      error => this.notifier.notify('error',error.error.Comments)
    );
  }

  handleResponse(res) {
    
    this.notifier.notify( 'success', res.Comments );
    console.log(res);
    this.form.email = null;
  }
}
