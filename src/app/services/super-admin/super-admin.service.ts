import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SuperAdminService {

  constructor(private http: HttpClient) { }

  getAllUsers(token){
    let headers = new HttpHeaders().set('Authorization','Bearer '+token);
    return this.http.get('users',{headers:headers});
      // .subscribe((res: Response) => {
      //   const data = res;
      //   console.log(data)
      //   return data;
  // })
}
}
