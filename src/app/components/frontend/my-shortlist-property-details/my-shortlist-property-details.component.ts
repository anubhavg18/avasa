/// <reference types="@types/googlemaps" />
import { Component,OnInit, ViewChild, } from '@angular/core';
import { SharingService } from 'src/app/services/sharing.service';
import {  Router, RouterStateSnapshot, ActivatedRouteSnapshot  } from '@angular/router';
import { ShortlistService } from 'src/app/services/shortlist.service';
import {Convert, Welcome} from 'src/app/models/my-shortlist-property-details.model';
declare var $: any;
declare const google: any;
@Component({
  selector: 'app-my-shortlist-property-details',
  templateUrl: './my-shortlist-property-details.component.html',
  styleUrls: ['./my-shortlist-property-details.component.css']
})
export class MyShortlistPropertyDetailsComponent implements OnInit {
  isDataAvailable:boolean = false;
  public data:object;
  propertyDetails:any;
  propertyLatitude:any;
  propertyLongitude:any;
  public floorPlansExist:boolean=false;
  propertyId:any;
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  constructor(private router: Router,private shortlistService:ShortlistService) {
    const snapshot: RouterStateSnapshot = router.routerState.snapshot;
    var propertyIdInArray = snapshot.url.split('/');
   
    this.propertyId=propertyIdInArray[2];
    
    
   }


  ngOnInit() {
    this.shortlistService.getShortlistedPropertyDetails(this.propertyId).subscribe(
      // (data)=>this.getPropertyDetailsData(data),
      (data)=>this.getPropertyDetailsData(data),
      (error)=>console.log(error)
    ); 
    var mapProp = {
      center:
         new google.maps.LatLng(51.509865, -0.118092),
      zoom: 7,
      mapTypeId: google.maps.MapTypeId.ROADMAP
   };
   this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
   
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
  // const welcome = Convert.toWelcome(data);
  this.isDataAvailable = true;
  this.propertyDetails=data.Result;
  console.log(data)
  
  var marker = new google.maps.Marker({
    position: {
       lat: Number(data.Result.zooplaJsonData.latitude),
       lng: Number(data.Result.zooplaJsonData.longitude)
    },
   //  map: this.gmapElement.nativeElement,
   //  icon: image,
//  label: title,
 });
 

 
 
//  this.handleMarkerClick(marker);
//  this.showMapProperies();
//  this.mapMarkers.push(marker);
 marker.setMap(this.map);
 this.map.setZoom(5);
//  marker.setIcon(image);


  }


}
