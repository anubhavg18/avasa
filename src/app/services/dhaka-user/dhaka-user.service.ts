import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Convert,  } from '../../models/dhaka-user.model';

@Injectable({
  providedIn: 'root'
})
export class DhakaUserService {
  //UserQuestions: UserQuestions[] = [];
  

  constructor(private router: Router, private http: HttpClient) { }

  userQuestionProperties(Index){
      let headers = new HttpHeaders().set('Authorization', "Bearer mpcNqE1ZOVZs7cn");
    
       return this.http.get(Index, {headers:headers});
    }

    allQuestions(Index){
      let headers = new HttpHeaders().set('Authorization', "Bearer mpcNqE1ZOVZs7cn");
    
       return this.http.get(Index, {headers:headers});
    }
    
    usersQueryAnswers ( api, usersAnswers){
      let headers = new HttpHeaders().set('Authorization', "Bearer mpcNqE1ZOVZs7cn").set('Content-Type', "application/json");

  		return this.http.put(api, usersAnswers, {headers:headers});
    }
    
    

  
}