import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile/profile.service';

@Component({
  selector: 'app-my-calendar',
  templateUrl: './my-calendar.component.html',
  styleUrls: ['./my-calendar.component.css']
})
export class MyCalendarComponent implements OnInit {
   
   mycalender: any;
   detaildiv: any;
   defaultdiv: any;
   calenderdetail: any;
   email: any;
   name: any;
   phone: any;
   movingDate: any;
   preferredAreas: any;
   minPrice: any;
   maxPrice: any;
   maxBedrooms: any;
   connectvia: any;

  constructor(private profileService : ProfileService) {
   }

  ngOnInit() {
  	this.profileService.getmycalender().subscribe(res => {
  		this.mycalender = res['Result']['sherpaAppointments'];
      // console.log(this.mycalender);
  	});
    this.defaultdiv = 'defaultdiv'
  }

  opendetail(sherpaAppointmentId){
    this.defaultdiv = '';
  	this.profileService.getcalenderdetail(sherpaAppointmentId).subscribe(res => {
         console.log(res);
      this.connectvia = res['Result']['sherpaAppointment']['preferredWayOfCommunication'];
  		this.email = res['Result']['sherpaAppointment']['email'];
  		this.name = res['Result']['sherpaAppointment']['name'];
  		this.phone = res['Result']['sherpaAppointment']['phone'];
  		this.movingDate = res['Result']['sherpaAppointment']['movingDate'];
  		this.preferredAreas = res['Result']['sherpaAppointment']['preferredAreas'];
  		this.minPrice = res['Result']['sherpaAppointment']['minPrice'];
  		this.maxPrice = res['Result']['sherpaAppointment']['maxPrice'];
  		this.maxBedrooms = res['Result']['sherpaAppointment']['maxBedrooms'];
  	});
  	this.detaildiv = 'detaildiv';
  }

}
