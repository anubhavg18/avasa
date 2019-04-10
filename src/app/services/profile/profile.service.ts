import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { HttpClient, HttpParams,HttpHeaders} from '@angular/common/http';
import {RequestOptions} from "@angular/http";
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient) { }


  public updatePass(email,userpass,confpass){
	let data = {"email":email,"newPassword":userpass,"oldPassword":confpass};
	return this.http.post('updatePassword', data);
  }

  public getmycalender(){
		const params = new HttpParams()
		  .set('page','1');
	
		return this.http.get('sherpaAppointments',{params});
	}
   
  public getcalenderdetail(serpaid){
  	return this.http.get('sherpaAppointments/'+serpaid);
  } 

  public getrecodata(){
    return this.http.get('notifications');
  }

  public getsherpadetail(proid,id){
    const params = new HttpParams()
      .set('propertyId',proid)
      .set('id',id)
  
    return this.http.get('userQuestionAnswers',{params});
  }

  public getareapreference(){
    return this.http.get('areaPreferences');
  }

  public updateprofile(type,apiurl,data){
    const params = new HttpParams()
      .set('type',type)
      return this.http.put(apiurl, data,{params}).subscribe(data => {},(error =>{}));
  }
  
  public updateamenity(apiurl,data){
      return this.http.put(apiurl, data).subscribe(data => {},(error =>{}));
  }

  public getamenityPreferences(){
    return this.http.get<any[]>('amenityPreferences');
  }

   public getuserPreferences(){
    return this.http.get('userPreferences');
  }

  public getdatedata(appointid,month,calendarid,timezone){
    const params = new HttpParams()
      .set('appointmentTypeID',appointid)
      .set('month',month)
      .set('calendarID',calendarid)
      .set('timezone',timezone)
      return this.http.get('availabilityDates', {params});
  }

   public getscheduledata(appointid,month,calendarid,timezone,date){
    const params = new HttpParams()
      .set('appointmentTypeID',appointid)
      .set('month',month)
      .set('calendarID',calendarid)
      .set('timezone',timezone)
      .set('date',date)
      return this.http.get('availabilityTimes', {params});
  }

  public postscheduledata(data){
    return this.http.post('appointments', data);
    // .subscribe(data => {
    //   console.log(data);
    // },(error =>{
    //   console.log(error);
    // }));
  }

  public cancelappontment(id){
      let data ={"cancelNote":"Postpended"}
      return this.http.put('appointments/cancel/'+id, data);
  }

  public rescheduledata(id,date){
    let data ={"datetime": date}
      return this.http.put('appointments/reschedule/'+id, data);
  } 

}
