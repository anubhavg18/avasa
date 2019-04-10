/// <reference types="@types/googlemaps" />
import { Component, ElementRef, NgZone, OnInit, ViewChild, } from '@angular/core';
import { PropertyDetailsService } from 'src/app/services/property-details.service';
import { Store, select } from '@ngrx/store';
import { Increment, Decrement, Reset,UpdateForm } from '../search-criteria/search-criteria.actions';
import { Observable } from 'rxjs';
declare var $: any;
declare const google: any;

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit {
public propertyDetails:any;
propertyLatitude:any;
propertyLongitude:any;
public floorPlansExist:boolean=false;
@ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  count$: Observable<object>;
  constructor(public PropertyDetailsService:PropertyDetailsService,private store: Store<{ searchCriteria: object }>) {
    // this.PropertyDetailsService.currentMessage.subscribe(
    //   (data)=>this.getPropertyDetailsData(data),


    // );
    // console.log(this.propertyDetails)
    this.count$ = this.store.pipe(select('searchCriteria'));
    this.count$.subscribe(res=>{
    this.getPropertyDetailsData(res['property details'])
 })
   }

  ngOnInit() {
    var mapProp = {
      center:
         new google.maps.LatLng(51.509865, -0.118092),
      zoom: 6,
      mapTypeId: google.maps.MapTypeId.ROADMAP
   };
   this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
   var marker = new google.maps.Marker({
    position: {
       lat: Number(this.propertyLatitude),
       lng: Number( this.propertyLongitude)
    },
    map: this.gmapElement.nativeElement,
   //  icon: image,
//  label: title,
 });
 marker.setMap(this.map);

  }

  myFunction() {
    var showHide = document.getElementById("sub-item-1");
    var addClass = document.getElementById("openItem1");
    if (showHide.style.display === "none") {
      showHide.style.display = "block";
      addClass.classList.add("active");
    } else {
      showHide.style.display = "none";
      addClass.classList.remove("active");
    }
  }

  getPropertyDetailsData(data){
    this.propertyDetails=data;
    this.propertyLatitude=data.propertyLatitude;
    this.propertyLongitude=data.propertyLongitude;
    if(this.propertyDetails.floor_plan){
       this.floorPlansExist=true;
    }
    
  }

}
