import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile/profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router'

declare var $: any;

@Component({
  selector: 'app-bookacuity',
  templateUrl: './bookacuity.component.html',
  styleUrls: ['./bookacuity.component.css']
})
export class BookacuityComponent implements OnInit {

  constructor(private profileService:ProfileService,private formBuilder: FormBuilder,private router: Router) {
    this.minval = 100;
    this.maxval = 100;
    this.defaultdiv = 'defaultdiv';

   }
  registerForm: FormGroup;
  submitted = false;
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
  openbutton: any;

  ngOnInit() {
     this.registerForm = this.formBuilder.group({
            firstName: ['', [Validators.required]],
            lastname: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            contact: ['', [Validators.required]],
            datetime: ['', [Validators.required]],
            location: ['', [Validators.required]],
            numberbed: ['', [Validators.required]],
            contactdata:['', [Validators.required, Validators.minLength(6), Validators.maxLength(14)]]
        });
  }

  get f() { return this.registerForm.controls; }

   datevalidate(e){
     var today = new Date();
     today.setDate(today.getDate() + 7);
     var date_from = new Date(e);
      if (today >= date_from){
        alert('Please select a valid date');
        this.registerForm.controls['datetime'].setValue(null);
      }else{
        
      }
   }

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
    this.submitted = true;
    if(this.registerForm.invalid) {
            return;
      }else{
         this.name = this.registerForm.value.firstName+' '+this.registerForm.value.lastname;
         this.firstname = this.registerForm.value.firstName;
         this.lastname = this.registerForm.value.lastname;
         this.location = this.registerForm.value.location;
         this.email = this.registerForm.value.email;
         this.contact = this.registerForm.value.contact;
         this.datetime = convert(this.registerForm.value.datetime);
         this.numberbed = this.registerForm.value.numberbed;
         this.contactdata = this.registerForm.value.contactdata;
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

    function convert(str) {
    var date = new Date(str),
        mnth = ("0" + (date.getMonth()+1)).slice(-2),
        day  = ("0" + date.getDate()).slice(-2);
    return [ date.getFullYear(), mnth, day ].join("-");
    }
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
    //   this.profileService.rescheduledata(this.appointmentid,this.selectedtime).subscribe(res => {
    //     this.appointmentid = res['id']
    //     this.phone = res['phone'];
    //     this.name = this.name;
    //     this.movingDate = this.datetime;
    //     this.connectvia = this.contact;
    //     this.preferredAreas = this.location;
    //     this.minPrice = this.minval;
    //     this.maxPrice = this.maxval;
    //     this.maxBedrooms = this.numberbed;
    //     this.contactdata = this.contactdata;
    // });
    alert("Your appointment is rescheduled");
    }else{

    //   this.profileService.postscheduledata(data).subscribe(res => {
    //     console.log(res);
    //     this.firstname = this.firstname;
    //     this.appointmentid = res['id'];
    //     this.phone = res['phone'];
    //     this.name = this.name;
    //     this.movingDate = this.datetime;
    //     this.connectvia = this.contact;
    //     this.preferredAreas = this.location;
    //     this.minPrice = this.minval;
    //     this.maxPrice = this.maxval;
    //     this.maxBedrooms = this.numberbed;
    //     this.contactdata = this.contactdata;
    // });
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
    if(this.maxval>100 && this.maxval > this.minval+100){
      this.maxval = this.maxval -100;
    }
  }
  incmax(){
     this.maxval = this.maxval + 100; 
  }


  onChange(e){
    if(e == 'Whatup'){
      this.openwhatsup = 'openwhatsup';
      this.openskype = '';
      this.openphone='';
    }else if(e == 'Skype'){
      this.openskype = 'openskype';
      this.openphone='';
      this.openwhatsup = '';
    }else if(e == 'Phone Number'){
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
    this.openbutton = '';
    this.selecteddata = '';
    this.defaultdiv = '';
    this.opendiv = 'opendiv';
    this.acuitydetail = '';
    this.reschude = 'reschude';
  }

  openbook(){
    this.openbutton ='openbutton';
  }


}
