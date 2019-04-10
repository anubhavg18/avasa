import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile/profile.service';
declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	minval: any;
	maxval: any;
	selectedOption1: any;
	selectedOption2: any;
	selectedOption3: any;
	selectedOption4: any;
	selectedval: any;
	areas: any;
	optname: any;
	checkboxes = [];
	propertytype: any;
	furnishing: any;
	outdoorspace: any;
  minbedroom: any;
  maxbedroom: any;
  amenitypre: any;
  prefrencebox = [{
      name: 'Period',
      selected: true
    },
    {
      name: 'New Built',
      selected: false
    },
    {
      name: 'Purpose Built',
      selected: false
    },
    {
      name: 'Wood Floor',
      selected: false
    },
    {
      name: '2+ Bathrooms',
      selected: false
    }
    ];

  constructor(private profileService : ProfileService,private router:Router) { }

  ngOnInit() {
  	this.minval = 100;
  	this.maxval = 100;
  	this.profileService.getareapreference().subscribe(res => {
  	   this.checkboxes = res['Result']['areas'];
  	});
    this.profileService.getamenityPreferences().subscribe(res => {
       this.amenitypre = res['Result']['statuses'];
         if(this.amenitypre[0]['id'] == 1 && this.amenitypre[0]['isSelected'] == true){
             this.selectedOption1 = this.amenitypre[0]['id'];
         }
         else if(this.amenitypre[1]['id'] == 2 && this.amenitypre[1]['isSelected'] == true){
             this.selectedOption1 = this.amenitypre[1]['id'];
         }
         if(this.amenitypre[2]['id'] == 3 && this.amenitypre[2]['isSelected'] == true){
             this.selectedOption2 = this.amenitypre[2]['id'];
         }else if(this.amenitypre[3]['id']== 4 &&  this.amenitypre[3]['isSelected'] == true){
             this.selectedOption2 = this.amenitypre[3]['id'];
         }
         if(this.amenitypre[4]['id'] == 5 &&  this.amenitypre[4]['isSelected'] == true){
             this.selectedOption3 = this.amenitypre[4]['id'];
         }else if(this.amenitypre[5]['id'] == 6 &&  this.amenitypre[5]['isSelected'] == true){
             this.selectedOption3 = this.amenitypre[5]['id'];
         }
         if(this.amenitypre[6]['id'] == 7 &&  this.amenitypre[6]['isSelected'] == true){
             this.selectedOption4 = this.amenitypre[6]['id'];
         }else if(this.amenitypre[7]['id'] == 8 &&  this.amenitypre[7]['isSelected'] == true){
             this.selectedOption4 = this.amenitypre[7]['id'];
         }
         // console.log(this.selectedOption1);
         // console.log(this.selectedOption2);
         // console.log(this.selectedOption3);
         // console.log(this.selectedOption4);
    });
    this.profileService.getuserPreferences().subscribe(res => {
       this.outdoorspace = res['Result']['userPreferences']['outdoorSpaces'][0];
       this.furnishing = res['Result']['userPreferences']['furnishType'];
       this.propertytype = res['Result']['userPreferences']['houseType'];
       this.maxbedroom = res['Result']['userPreferences']['maxBedroom'];
       this.maxval = res['Result']['userPreferences']['maxPrice'];
       this.minbedroom = res['Result']['userPreferences']['minBedroom'];
       this.minval = res['Result']['userPreferences']['minPrice'];
    });

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

  updateform(){
     this.selectedval = [this.selectedOption1,this.selectedOption2,this.selectedOption3,this.selectedOption4];
     let likedarea = this.checkboxes.filter((ch) => { return ch.selected })
                     .map((ch) => { return ch.id });

     let preferencedata = this.prefrencebox.filter((pre) => { return pre.selected })
                     .map((pre) => { return pre.name });

      let basicdata = {
       "houseType": this.propertytype,
       "furnishType": this.furnishing,
       "minPrice": this.minval,
       "maxPrice": this.maxval,
       "minBedroom": this.minbedroom,
       "maxBedroom": this.maxbedroom
     }

     let advancedata ={
         "outdoorSpaces":[this.outdoorspace],
          "propertyFeatures":preferencedata,
          "5minPlaces": []
     }

     let amenitype = {
       "statuses":this.selectedval,
       "preferredAmenities":[],
       "avoidedAmenities": [],
       "mostImportantThings": []
      }

      let areadata ={
        "areas":likedarea
      }

     this.profileService.updateprofile('basic','userPreferences',basicdata);
     this.profileService.updateprofile('advance','userPreferences',advancedata);
     this.profileService.updateamenity('amenityPreferences',amenitype);
     this.profileService.updateamenity('areaPreferences',areadata);
     alert('Profile updated');

  }




}
