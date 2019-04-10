import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
// import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
//import * as firebase from 'firebase/app';
// import {FirebaseListObservable } from 'angularfire2/database-deprecated';


@Injectable()
export class ChatService {

  private baseURL: string = "https://api.dialogflow.com/v1/query?v=20150910";
  private token: string = "448457a85f984ce0abe0077592ddb304";

  constructor(private http: Http){    
  }

  public getResponse(query: string){
    let data = {
      query : query,
      lang: 'en',
      sessionId: '1234567'
    }
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${this.token}`);

    return this.http
      .post(`${this.baseURL}`, data, {headers: headers})
      .map(res => {
        return res.json()
      })
  }

}
