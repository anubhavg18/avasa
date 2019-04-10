import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { HttpClient, HttpParams,HttpHeaders ,} from '@angular/common/http';
import {RequestOptions} from "@angular/http";
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

  	constructor(private http: HttpClient) { }
	//   private baseUrl = 'http://13.126.241.91/uc/public/v1/';
  	public login (data){
  		return this.http.post('users',data);
	  }
	  
	  loginWithSocial(userData){
		let headers = new HttpHeaders().set('Content-Type','application/json');
		let data={"loginMethod":userData.provider,"uid":userData.id,"accessToken":userData.token,"email":userData.email,"gender":"Male","profilePicture":"","contactNumber":"","city":"","work":"","education":"","firstName":"","lastName":"","age":25};
		let httpParams = new HttpParams().set('loginMethod', userData.provider).set('uid', userData.id).set('accessToken', userData.token);
	
		return this.http.post('users',data,{
			headers: headers}).pipe(map(res => res));
	
		
		
		// return this.http.post('users',{httpHeaders: httpHeaders,httpParams:httpParams });
			// .pipe(map(res => res));
	
	  }


  	public register (data){
  		return this.http.post('users', data);
	  }
	 
	 public sendResetPassword(data){
		return this.http.post('forgotPassword', data)
	 } 
}
