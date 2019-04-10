import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile/profile.service';
declare var $: any;

@Component({
  selector: 'app-bookacuity',
  templateUrl: './bookacuity.component.html',
  styleUrls: ['./bookacuity.component.css']
})
export class BookacuityComponent implements OnInit {

  constructor(private profileService:ProfileService) {
    this.minval = 100;
    this.maxval = 100;
    this.defaultdiv = 'defaultdiv';
   }

  contactdata:any;
  datedata: any;
  selecteddata: any;
  selectedtime: any;
  defaultdiv: any;
  minval: any;
  maxval: any;
  lastname: any;
  firstname: any;
  email: any;
  contact: any;
  datetime: any;
  location: any;
  opendiv: any;
  numberbed: any;
  openphone: any;
  openskype: any;
  openwhatsup: any;
  acuitydetail: any;
  phone:any;
  name:any;
  movingDate:any;
  connectvia:any;
  preferredAreas:any;
  minPrice:any;
  maxPrice:any;
  maxBedrooms:any;
  appointmentid:any;
  reschude: any;

  ngOnInit() {}

  scheduledata(data){
      let	appointid = '6530539';
	    let	month = this.datetime;
	    let	calendarid = '2802650';
	    let	timezone = 'Europe/London' ;
	    let   date = data.date;
     this.profileService.getscheduledata(appointid,month,calendarid,timezone,date).subscribe(res => {
  	   this.selecteddata = res;
  	});
  }

 saveform(){
    let  appointid = '6530539';
    let  month = this.datetime ;
    let  calendarid = '2802650';
    let  timezone = 'Europe/London' ;

     this.profileService.getdatedata(appointid,month,calendarid,timezone).subscribe(res => {
       this.datedata = res;
    });
     this.defaultdiv = '';
     this.opendiv = 'opendiv';
     this.updatedata;
  }

  updatedata(){
     let data ={
   "appointmentTypeID":"6530539",
   "calendarID":"2802650",
   "datetime":this.selectedtime,
   "firstName":this.firstname,
   "lastName":this.lastname,
   "email":this.email,
   "phone":this.contactdata,

  "fields": [
    {"id": 6059371, "value": this.contact},
    {"id": 5040867, "value": this.datetime},
    {"id": 5040868, "value": this.location},
    {"id": 5384239, "value": this.numberbed},
    {"id": 5040871, "value": this.minval+"-"+ this.maxval}

  ]
     }

    if(this.reschude == 'reschude'){
      this.profileService.rescheduledata(this.appointmentid,this.selectedtime).subscribe(res => {
        this.appointmentid = res['id']
        this.phone = res['phone'];
        this.name = res['firstName'];
        this.movingDate = this.datetime;
        this.connectvia = this.contact;
        this.preferredAreas = this.location;
        this.minPrice = this.minval;
        this.maxPrice = this.maxval;
        this.maxBedrooms = this.numberbed;
    });
    alert("Your appointment is rescheduled");
    }else{
      this.profileService.postscheduledata(data).subscribe(res => {
        this.appointmentid = res['id']
        this.phone = res['phone'];
        this.name = res['firstName'];
        this.movingDate = this.datetime;
        this.connectvia = this.contact;
        this.preferredAreas = this.location;
        this.minPrice = this.minval;
        this.maxPrice = this.maxval;
        this.maxBedrooms = this.numberbed;
    });
    }
    this.reschude = '';
    this.defaultdiv = '';
    this.opendiv = '';
    this.acuitydetail = 'acuitydetail';
  }

  decmin(){
    if(this.minval>100){
      this.minval = this.minval - 100;
    }
  }
  incmin(){
    if(this.minval<this.maxval-100){
      this.minval = this.minval + 100;
    }
  }
  decmax(){
    if(this.maxval>100){
      this.maxval = this.maxval -100;
    }
  }
  incmax(){
     this.maxval = this.maxval + 100; 
  }


  onChange(){
    if(this.contact == 'Whatup'){
      this.openwhatsup = 'openwhatsup';
      this.openskype = '';
      this.openphone='';
    }else if(this.contact == 'Skype'){
      this.openskype = 'openskype';
      this.openphone='';
      this.openwhatsup = '';
    }else if(this.contact == 'Phone Number'){
     this.openphone = 'openphone';
     this.openwhatsup = '';
     this.openskype = '';
    }
  }

  cancelappontment(){
    this.profileService.cancelappontment(this.appointmentid).subscribe(res=>{
      if(res['firstName']){
        alert('Appontment Canceled');
      }
    });
  }
  Rescheduleappontment(){
    this.defaultdiv = '';
    this.opendiv = 'opendiv';
    this.acuitydetail = '';
    this.reschude = 'reschude';
  }


}
