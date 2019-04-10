import { DhakaUserService } from './../../../services/dhaka-user/dhaka-user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/login/token.service';
import { Auth1Service } from 'src/app/services/login/auth1.service';


import { Convert, Welcome, AVASAJSONParse, Property, ResultQuestion, } from '../../../models/dhaka-user.model';
import { NgForm } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-dhaka-user',
  templateUrl: './dhaka-user.component.html',
  styleUrls: ['./dhaka-user.component.css']
})
export class DhakaUserComponent implements OnInit {

  currentProperty: any;
  currentUserQuestions: any[]
  currentPropertyZooplaData;any;
  properties: any;
  totalPropertiesPages: any[];
  isLoad: boolean = false;
 
  public loggedIn: boolean;
 
  constructor(private Auth: Auth1Service, private questionAnswers: DhakaUserService,
   private router: Router,
   private Token: TokenService) {
 
 
   //Calling method of All unique Properties
   this.questionAnswers.userQuestionProperties('userQuestionProperties?page=1')
    .subscribe((res: Response) => {
     const data = JSON.stringify(res);
     let queryProperties = Convert.toUserQuestions(data);
 
     if (queryProperties != {}) {
 
      this.questionAnswers.userQuestionProperties('zooplaJsonData/' + queryProperties.Result.properties[0].propertyId)
       .subscribe((res: Response) => {
        const data = JSON.stringify(res);
 
        let queryProperties = Convert.toUserQuestions(data);
        this.currentPropertyZooplaData = queryProperties.Result.zooplaJsonData;
 
        console.clear();
 
       });
 
      this.questionAnswers.userQuestionProperties('userQuestions?propertyId=' + queryProperties.Result.properties[0].propertyId + '&page=1')
       .subscribe((res: Response) => {
        const data = JSON.stringify(res);
 
        let queryProperties = Convert.toUserQuestions(data);
        this.currentProperty = queryProperties.Result.questions;
 
        console.clear();
 
       });
 
     }
 
     this.properties = queryProperties.Result.properties;
     // console.log(queryProperties.Result.properties[0].propertyId)
 
     this.totalPropertiesPages = new Array(Math.ceil(queryProperties.Result.totalProperties / 10));
 
    });
 
  }
 
  currentUserProperty(userProperty) {
   this.isLoad = true;
   this.questionAnswers.userQuestionProperties('userQuestions?propertyId=' + userProperty + '&page=1')
    .subscribe((res: Response) => {
     const data = JSON.stringify(res);
     let queryProperties = Convert.toUserQuestions(data);
     this.currentProperty = queryProperties.Result.questions;
 
    });
 
   this.questionAnswers.userQuestionProperties('zooplaJsonData/' + userProperty)
    .subscribe((res: Response) => {
     const data = JSON.stringify(res);
 
     let queryProperties = Convert.toUserQuestions(data);
     this.currentPropertyZooplaData = queryProperties.Result.zooplaJsonData;
 
     if (queryProperties.Result.zooplaJsonData != {}) {
      this.currentPropertyZooplaData = queryProperties.Result.zooplaJsonData
     } else {
      this.currentPropertyZooplaData = {}
     }
 
     this.isLoad = false;
 
 
    });
   console.clear();
  }
 
  // method of sending Answers of users Questions
  answerSubmit(user, submitIndex) {
   var answersParameters: AnswersParameters = {
    questions: user.questions
   }
 
   let answersParametersRequest = AVASAJSONParse.toJSON(answersParameters);
   console.log("answersParametersRequest " + answersParametersRequest);
   console.log(user)
 
  //  this.questionAnswers.usersQueryAnswers("userQuestions/" + user.id, answersParametersRequest)
  //   .subscribe((res: Response) => {
  //    const data = JSON.stringify(res);
  //    console.log("response" + data);
  //   });

  this.currentProperty.splice(submitIndex, 1);
   console.clear();
 
  }
 
  nextPageProperties(pageIndex) {
   this.isLoad = true;
 
   const nextPage = pageIndex + 1;
   this.questionAnswers.userQuestionProperties('userQuestionProperties?page=' + nextPage)
    .subscribe((res: Response) => {
     const data = JSON.stringify(res);
     let queryProperties = Convert.toUserQuestions(data);
     this.properties = queryProperties.Result.properties;
 
     this.isLoad = false;
 
    });
 
  }
 
 
 
  ngOnInit() {
   this.Auth.authStatus.subscribe(value => this.loggedIn = value);
  }
 
 
  logout(event: MouseEvent) {
   event.preventDefault();
   this.Token.remove();
   this.Auth.changeAuthStatus(false);
   this.router.navigateByUrl('/login');
  }
 }
 
 interface AnswersParameters {
  questions: any;
 }
