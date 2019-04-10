import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }


  handle(userData){
    this.set(userData);
    // console.log(userData);
  }

  getLoggedInUserToken() {
    let JsonData=JSON.parse(this.get());
    let token=JsonData.apiToken;
     return token;
  }


  set(userData) {
    localStorage.setItem('userData', userData);
  }

  get() {
    return localStorage.getItem('userData');
    
  }
  getLoggedInUserEmail() {
    let JsonData=JSON.parse(this.get());
    let username=JsonData.email;
     return username;
  }

  remove() {
    localStorage.removeItem('userData');
  }


  isValid(){
    const userData=this.get();
    if(userData){
      // console.log(true);
      return true;
    }
  }

  isUserLoggedIn(){
    const userData=this.get();
    if(userData){
      return userData;
    }
    return 0;
  }


  loggedIn() {
    return this.isValid();
  }

  isRole(){
  const userData=this.get();
     if(userData){
      let userDataJson=JSON.parse(userData);
      // console.log(userDataJson.userRole);
      return userDataJson.userRole;
    }
    return 0;
  }

 
}
