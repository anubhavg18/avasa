import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AskQuestionService {
  public date:any;
 
  private dataSource = new BehaviorSubject(this.date);
  currentMessage = this.dataSource.asObservable();

  changeMessage(date) {
    this.dataSource.next(date);
    console.log(date)
  }

  constructor(private router: Router, private http: HttpClient) { }
  askQuestions ( api, query){
    let headers = new HttpHeaders().set('Authorization', "Bearer mpcNqE1ZOVZs7cn").set('Content-Type', "application/json");

    return this.http.post(api, query, {headers:headers});
  }


}
