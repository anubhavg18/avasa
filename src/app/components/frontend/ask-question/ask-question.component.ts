import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormArray, FormControl } from '@angular/forms';
import { AskQuestionService } from '../../../services/ask-question.service';
import { TokenService } from 'src/app/services/login/token.service';
import { Auth1Service } from 'src/app/services/login/auth1.service';
import { Router } from '@angular/router';
import {  AVASAJSONParse } from '../../../models/dhaka-user.model';


@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.css']
})
export class AskQuestionComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  isOthers:boolean = true;
  isPet:boolean = true;
  public loggedIn: boolean;
  petError: boolean = false
  othersError: boolean = false
  


  constructor(private Auth: Auth1Service, private askquestion: AskQuestionService,
    private router: Router,
    private Token: TokenService,private formBuilder: FormBuilder) { 

      this.registerForm = this.formBuilder.group({

        available: ['',[]],
        property: ['',[]],
        floor: ['',[]],      
        glazing: ['',[]],        
        petQu:['',[ ]],
        othersQu:['',[ ]],
        petvalue:['',[ ]],
        othersvalue:['',[]],
        // myChoices: new FormArray([])
        
    });
    
    }

    // onCheckChange(event) {
    //   const formArray: FormArray = this.registerForm.get('myChoices') as FormArray;
    
    //   /* Selected */
    //   if(event.target.checked){
    //     // Add a new control in the arrayForm
    //     formArray.push(new FormControl(event.target.value));
    //   }
    //   /* unselected */
    //   else{
    //     // find the unselected element
    //     let i: number = 0;
    
    //     formArray.controls.forEach((ctrl: FormControl) => {
    //       if(ctrl.value == event.target.value) {
    //         // Remove the unselected element from the arrayForm
    //         formArray.removeAt(i);
    //         return;
    //       }
    
    //       i++;
    //     });
    //   }
    // }
    

    onSubmit() {
    //  console.log(this.registerForm.value)
      this.submitted = true;
      if( this.registerForm.value.available=="" && this.registerForm.value.property=="" && this.registerForm.value.floor=="" && this.registerForm.value.othersvalue=="" && this.registerForm.value.petvalue=="" && this.registerForm.value.glazing==""){  
        alert("please select atleast one Question")
      }
     if( this.registerForm.value.petvalue==true ){  
        //alert("please fill the pet field question")
        this.petError = true;
        return ;
      }
      if( this.registerForm.value.othersvalue==true ){  
        //alert("please fill the pet field question")
        this.othersError = true;
        return ;
      }
     


      else{

        if (this.registerForm.value.available==""){
          this.registerForm.value.available=="false"          
        }
        if (this.registerForm.value.property==""){
          this.registerForm.value.property=="false"          
        }
        if (this.registerForm.value.floor==""){
          this.registerForm.value.floor=="false"          
        }
        if (this.registerForm.value.othersvalue==""){
          this.registerForm.value.othersvalue=="false"          
        }
        if (this.registerForm.value.petvalue==""){
          this.registerForm.value.petvalue=="false"          
        }
        if (this.registerForm.value.glazing==""){
          this.registerForm.value.glazing=="false"          
        }
  
      var questionsParameters = [

        {extraInfo:"",
        id:"1",
        isSelected:this.registerForm.value.available || false,
        options:"",
        question:"Is it still available?",
        selectedOption:"",
        type:"0",
        answer:"",},

        {extraInfo:"",
        id:"2",
        isSelected:this.registerForm.value.property || false,
        options:"",
        question:"What size is the property?",
        selectedOption:"",
        type:"0",
        answer:"",},

        {extraInfo:"",
        id:"3",
        isSelected:this.registerForm.value.floor || false,
        options:"",
        question:"Is the property lower ground floor?",
        selectedOption:"",
        type:"0",
        answer:"",},

        {extraInfo:this.registerForm.value.petQu,
        id:"4",
        isSelected:this.registerForm.value.petvalue || false,
        options:"",
        question:"Is the property pet friendly?",
        selectedOption:"",
        type:"",
        answer:"0",},

        {extraInfo:"",
        id:"5",
        isSelected:this.registerForm.value.glazing || false,
        options:"",
        question:"Are the windows double or single glazing?",
        selectedOption:"",
        type:"0",
        answer:"",},

        {extraInfo:this.registerForm.value.othersQu,
        id:"6",
        isSelected:this.registerForm.value.othersvalue || false,
        options:"",
        question:"Others",
        selectedOption:"",
        type:"0",
        answer:"",}
  
      ]

       console.log(questionsParameters);
      //  let appointParametersRequest = AVASAJSONParse.toJSON(appointParameters);
      //  console.log(appointParametersRequest);
  
      // this.sherpabooking.sherpaCalender('availabilityDates?appointmentTypeID=6530539&month=2019-04&calendarID=2802650&timezone=Europe/London')
      // .subscribe((res: Response) => {
      //  const data = JSON.stringify(res);
      //  let dates = JSON.parse(data);
      //  console.log(dates);
   
      // });
      //this.router.navigate(['/home-search']);

      this.askquestion.changeMessage(questionsParameters);
      this.router.navigate(['/ask-question-form']);
    }
      
  }

  others(event){
    this.isOthers = !this.isOthers;
  
    
  }
  pet(event){
    this.isPet = !this.isPet;
  
  }
  
  

  ngOnInit() {
    this.Auth.authStatus.subscribe(value => this.loggedIn = value);

  
  }

  get f() { return this.registerForm.controls; }

  logout(event: MouseEvent) {
    event.preventDefault();
    this.Token.remove();
    this.Auth.changeAuthStatus(false);
    this.router.navigateByUrl('/login');
   }

}
