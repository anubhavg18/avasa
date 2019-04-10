import { Component, OnInit, ViewChild,NgZone, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Commutes, Convert, commute } from 'src/app/models/search-parameter';
import { MapsAPILoader } from '@agm/core';
import {SearchService} from 'src/app/services/search.service';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Increment, Decrement, Reset,UpdateForm } from '../search-criteria/search-criteria.actions';
import { Observable } from 'rxjs';
declare const google: any;

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.css']
})
export class SearchFieldComponent implements OnInit {
  @ViewChild("search")
  public searchElementRef: ElementRef;
  someModel;

  public latitude: number;
  public longitude: number;
  public maxCommuteTime:any;
  public zoom: number;
  public name: string;
  public lat: number;
  public long: number;
  searchForm: FormGroup;
  submitted = false;
  count$: Observable<object>;

public name1:string='15 minutes';
  // commuteTime=[
  //   {name:'15 minutes',send:'15'},
  //   {name:'30 minutes',send:'30'},
  //   {name:'45 minutes',send:'45'},
  //   {name:'1 hour',send:'60'},
  //   {name:'1 hour and 15 minutes',send:'75'},
  //   {name:'1 hour and 30 minutes',send:'90'},
  //   {name:'1 hour and 45 minutes',send:'105'},
  //   {name:'2 hours',send:'120'},
  //   {name:'2 hours and 15 minutes',send:'135'},
  //    ];
    public commuteTime=[
     '15 minutes','30 minutes','45 minutes','1 hour','1 hour and 15 minutes','1 hour and 30 minutes',
     '1 hour and 45 minutes','2 hours','2 hours and 15 minutes'
       ];

     public searchCriteria={
      commutesTime:15,
      commuteLocation:"London, UK",
      commuteLatitude:51.5073509,
      commuteLongitude:-0.12775829999998223
     }  

  
  constructor(private formBuilder: FormBuilder, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone,
    private searchService:SearchService,private router:Router,private store: Store<{ searchCriteria: object }>) {
    this.searchForm = this.formBuilder.group({
      maxCommuteTime: ['15 minutes', Validators.required],
      search: ['', Validators.required],
   });
   }


  ngOnInit() {

  this.zoom = 4;
  this.latitude = 39.8282;
  this.longitude = -98.5795;
  var options = {
    types: ['(regions)'],
    componentRestrictions: {country: "UK"}
   };
  

  //set current position
  this.setCurrentPosition();

  //load Places Autocomplete
  this.mapsAPILoader.load().then(() => {
    let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, options);
    autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();

        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }


        //set latitude, longitude and zoom
        this.latitude = place.geometry.location.lat();
        this.longitude = place.geometry.location.lng();
        this.lat = place.geometry.location.lat();
        this.long = place.geometry.location.lng();
        this.zoom = 12;
        this.name = autocomplete.getPlace().formatted_address;
      });
    });
  });
  //--- end location data here..1
  }

  get f() { return this.searchForm.controls; }
  

  
  commuteDetails(){
    this.submitted = true;
   const time=this.convertTime(this.searchForm.value.maxCommuteTime);
   console.log(time)
        // stop here if form is invalid
        if (this.searchForm.invalid) {
            return;
        }
    this.searchCriteria.commutesTime = time;
    this.searchCriteria.commuteLocation=this.name;
    this.searchCriteria.commuteLatitude=this.lat;
    this.searchCriteria.commuteLongitude=this.long;
    // console.log(this.searchCriteria)
    this.store.dispatch(new UpdateForm({"searchCriteria":this.searchCriteria}));
    this.searchService.changeMessage(this.searchCriteria);
    this.router.navigateByUrl('/search-criteria');;
  }

private setCurrentPosition() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.zoom = 12;
    });
  }
}

convertTime(data){
  
switch (data) {
  case "15 minutes":
    data = 15;
    break;
    case "30 minutes":
    data = 30;
    break;
    case "45 minutes":
    data = 45;
    break;
    case "1 hour":
    data = 60;
    break;
    case "1 hour and 15 minutes":
    data = 75;
    break;
    case "1 hour and 30 minutes":
    data = 90;
    break;
    case "1 hour and 45 minutes":
    data = 105;
    break;
    case "2 hours":
    data = 120;
    break;
    case "2 hours and 15 minutes":
    data = 135;
    break;
  default:
    data = "No value found";
}
return data;
}

}