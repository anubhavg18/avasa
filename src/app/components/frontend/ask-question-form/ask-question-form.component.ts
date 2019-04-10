import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AskQuestionService } from '../../../services/ask-question.service';
import { TokenService } from 'src/app/services/login/token.service';
import { Auth1Service } from 'src/app/services/login/auth1.service';
import { Router } from '@angular/router';
import {  AVASAJSONParse } from '../../../models/dhaka-user.model';

@Component({
  selector: 'app-ask-question-form',
  templateUrl: './ask-question-form.component.html',
  styleUrls: ['./ask-question-form.component.css']
})
export class AskQuestionFormComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  isprofessional:boolean= false;
  isstudent:boolean= false;
  isbusiness:boolean= false;
  isothers:boolean= true;
  public loggedIn: boolean;
  askQuestions:any;
  finalQuestions:any;
  AskQuestionParameters:any;
  modalsubmit:boolean =false
  

  constructor(private Auth: Auth1Service, private questionService: AskQuestionService,
    private router: Router,
    private Token: TokenService,private formBuilder: FormBuilder) { 

      this.questionService.currentMessage
      .subscribe(
        (data)=>this.askQuestions = (data),
        (error)=>console.log(error)
      )
    }


  
    student(event){
      this.isprofessional= false;
      this.isstudent= true;
      this.isbusiness= false;
      this.isothers= false;   
      // if(event.type == "click"){
       
      //   this.registerForm = this.formBuilder.group({

      //     name: ['',[ Validators.required,]],
      //     email: ['',[Validators.required]],
      //     phone: ['',[Validators.required]],
      //     occupation: ['',[Validators.required]],      
      //       job_title: ['',[ ]],
      //     occupants: ['', [Validators.required]],
      //     university: ['', [ Validators.required]],
      //      income: ['',[Validators.required ]],
      //      pleaseSpecify: ['', []],
      //     moving_date: ['',[Validators.required ]],
      //     duration: ['',[Validators.required ]],
                 
      // });
      // } 
    }
    professional(event){
      this. isprofessional= true;
      this.isstudent= false;
      this.isbusiness= false;
      this.isothers= false;
      // if(event.type == "click"){
      //   this.registerForm = this.formBuilder.group({

      //     name: ['',[Validators.required ,]],
      //     email: ['',[Validators.required, Validators.email]],
      //     phone: ['',[Validators.required, Validators.pattern("^[0-9]*$")]],
      //     occupation: ['',[Validators.required]],      
      //     job_title: ['',[ Validators.required]],
      //     occupants: ['', [Validators.required]],
      //     university: ['', [ ]],
      //     income: ['',[Validators.required ]],
      //     pleaseSpecify: ['', []],
      //     moving_date: ['',[Validators.required]],
      //     duration: ['',[ Validators.required]],
                 
      // });
      // }
      
    }
    business(event){
      this.isprofessional= false;
      this.isstudent= false;
      this.isbusiness= true;
      this.isothers= false;
      // if(event.type == "click"){
      //   this.registerForm = this.formBuilder.group({

      //     name: ['',[Validators.required ,]],
      //     email: ['',[Validators.required, Validators.email]],
      //     phone: ['',[Validators.required, Validators.pattern("^[0-9]*$")]],
      //     occupation: ['',[Validators.required]],      
      //     job_title: ['',[Validators.required]],
      //     occupants: ['', [Validators.required]],
      //    university: ['', [ ]],
      //     income: ['',[ Validators.required]],
      //     pleaseSpecify: ['', []],
      //     moving_date: ['',[ Validators.required]],
      //     duration: ['',[Validators.required ]],
                 
      // });
      // }
      
    }
    others(event){
      this.isprofessional= false;
      this.isstudent= false;
      this.isbusiness= false;
      this.isothers= true;
      // if(event.type == "click"){
      //   this.registerForm = this.formBuilder.group({

      //     name: ['',[Validators.required ,]],
      //     email: ['',[Validators.required, Validators.email]],
      //     phone: ['',[Validators.required, Validators.pattern("^[0-9]*$")]],
      //     occupation: ['',[Validators.required]],      
      //     job_title: ['',[ ]],
      //     occupants: ['', [Validators.required]],
      //     university: ['', [ ]],
      //     income: ['',[ Validators.required]],
      //     pleaseSpecify: ['', [Validators.required]],
      //     moving_date: ['',[ Validators.required]],
      //     duration: ['',[Validators.required ]],
                 
      // });
      // }
    }

    onSubmit() {
      this.submitted = true;
  console.log(this.registerForm)
      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }
  
      this.AskQuestionParameters = {
        
        propertyId: "50458652",
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        mobile: this.registerForm.value.phone,
        occupation:this.registerForm.value.occupation,
        university:this.registerForm.value.university,
        occupants:this.registerForm.value.occupants,
        incomeTwoAndHalfTimesRent: this.registerForm.value.income,
        movingDate: this.registerForm.value.moving_date,
        leaseDuration:this.registerForm.value.duration,
        isViewing:"0", 
        questions : this.askQuestions     
  
       }

       console.log(this.AskQuestionParameters);
       this.askQuestions = AVASAJSONParse.toJSON(this.finalQuestions);    
       this.modalsubmit = true;   
      
 }

  finalSubmit(){
    this.questionService.askQuestions('https://testing.avasa.ai/v1/userQuestions', this.AskQuestionParameters)
      .subscribe((res: Response) => {
       const data = JSON.stringify(res);
       let submitQuestions = JSON.parse(data);
       console.log(submitQuestions);
   
      });
     this.router.navigate(['/home-search']);
  }

  viewSubmit(){
    this.AskQuestionParameters.isViewing = "1"
    console.log(this.AskQuestionParameters)
    this.finalSubmit()
  }

        
  ngOnInit() {
    this.Auth.authStatus.subscribe(value => this.loggedIn = value);

    this.registerForm = this.formBuilder.group({

      name: ['',[Validators.required, Validators.pattern("[a-zA-z]+\s[a-zA-z]+")]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['',[ Validators.required , Validators.pattern("^[0-9]*$")]],
      occupation: ['',[Validators.required]],      
      job_title: ['',[ ]],
      occupants: ['', [ Validators.required , Validators.pattern("^[0-9]*$")]],
      university: ['', []],
      income: ['',[Validators.required  ]],
      pleaseSpecify: ['', [ ]],
      moving_date: ['',[ Validators.required ]],
      duration: ['',[ Validators.required ]],
             
  });
  }

  get f() { return this.registerForm.controls; }

  logout(event: MouseEvent) {
    event.preventDefault();
    this.Token.remove();
    this.Auth.changeAuthStatus(false);
    this.router.navigateByUrl('/login');
   }

}
