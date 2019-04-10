import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,HttpHeaders} from '@angular/common/http';

import { TokenService } from './login/token.service';
@Injectable({
  providedIn: 'root'
})
export class ShortlistService {

  constructor(private http: HttpClient,private token:TokenService) { }

  myShortlist(){
    let token=this.token.getLoggedInUserToken();
    let headers = new HttpHeaders().set('Authorization','Bearer '+token);
    return this.http.get('shortlistedProperties?page=1',{
      headers: headers});
  }

  checkIfShortlistProperty(){
    let token=this.token.getLoggedInUserToken();
    let headers = new HttpHeaders().set('Authorization','Bearer '+token);
    return this.http.get('myShortlists',{
      headers: headers});
  }

  getLastSearchCriteria(){
    let token=this.token.getLoggedInUserToken();
    let headers = new HttpHeaders().set('Authorization','Bearer '+token);
    return this.http.get('searchCriterias',{
      headers: headers});
  }

  getShortlistedPropertyDetails(id){
    let token=this.token.getLoggedInUserToken();
    let headers = new HttpHeaders().set('Authorization','Bearer '+token);
    return this.http.get('shortlistedProperties/'+id,{
      headers: headers});
    
  }
  

  shortlistListing(listingObject) {
   let newHeader = new HttpHeaders().set('Authorization', 'Bearer 02f3517d-2623-1');
   return this.http.post('http://35.177.138.4/v2/shortlistedProperties', listingObject, { headers: newHeader });
}
}
