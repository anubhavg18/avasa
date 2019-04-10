/// <reference types="@types/googlemaps" />
import { Component,ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { ShortlistService } from 'src/app/services/shortlist.service';
import { MapsAPILoader } from '@agm/core';
import { Convert, Welcome } from "src/app/models/shortlist-property.model";
import { SharingService } from 'src/app/services/sharing.service';
import { Router } from '@angular/router';
declare var $: any;
declare const google: any;
@Component({
  selector: 'app-my-shortlist', 
  templateUrl: './my-shortlist.component.html',
  styleUrls: ['./my-shortlist.component.css']
})
export class MyShortlistComponent implements OnInit {
  
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  public shortlistProperty: any = [];
  public property: any = [];
  public uiState: string = 'viewSelectedListings';
  public listingViewState = 'viewMap';
  shortlistPropertyExist:any;
  public mapMarkers = [];
  public getLastSearchCriteria:any;


  constructor(private myShortlist:ShortlistService, private shareService:SharingService,private router:Router) {
    
    this.myShortlist.checkIfShortlistProperty().subscribe(
      (data)=>this.checkIfShortlistProperty(data),
      (error)=>console.log(error)
    );

    this.myShortlist.myShortlist().subscribe(
      (data)=>this.myShortlistProperties(data),

      (error)=>console.log(error)
    );

    
  }
    
  ngOnInit() {
      var mapProp = {
         center:
            new google.maps.LatLng(51.509865, -0.118092),
         zoom: 6,
         mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }

  editSearchCriteria(choice: any){
  this.myShortlist.getLastSearchCriteria().subscribe(
     (data)=>console.log(data),
     (error)=>console.log(error)
     );
  }
  
  sortListings(choice: any) {
   console.log('In Sort ', choice);
   let sortedList = this.shortlistProperty;

   if (choice === 'lowest_price') {
      sortedList.sort((a, b) => a.price - b.price);
      console.log('Sorted Array: ', sortedList);
   }

   if (choice === 'highest_price') {
      sortedList.sort((a, b) => b.price - a.price);
   }

   if (choice === 'most_recent') {
      sortedList.sort((a, b) => new Date(b.last_published_date).getTime() - new Date(a.last_published_date).getTime());
   }
}

 public myShortlistProperties(shortlist){
  this.shareService.setSettings(shortlist);
   let data=JSON.stringify(shortlist);
   if(this.shortlistPropertyExist=true){
     const shorlistModel = Convert.toWelcome(data);
   //   this.shortlistProperty.push(shorlistModel.Result.properties);
       for(let properties = 0;properties<=shorlistModel.Result.properties.length-1;properties++)
       {
         this.property.push(shorlistModel.Result.properties[properties]);
       }
 
       for(let properties = 0; properties <= this.property.length-1; properties++)
       {
         var marker =   this.plotLocationsToMap(this.property[properties],properties);
         this.property[properties].marker = marker;
         this.shortlistProperty.push(this.property[properties]);
       }
   }
   else{
     console.log("No shortlist");
   }
   this.map.setZoom(8);
   this.initialiseMapListingCarousel();
   }

   carouselClickProperty(eachListing) {
      this.map.setZoom(12);
      this.map.panTo(eachListing.marker.position);
   }

public plotLocationsToMap(property: any, index: number) {
 // var image = '/assets/images/tag_line.png';
 var marker = new google.maps.Marker({
    position: {
       lat: Number(property.latitude),
       lng: Number(property.longitude)
    },
   //  map: this.gmapElement.nativeElement,
   //  icon: image,
//  label: title,
 });
 
 marker.set('id', index);
 marker.set('clickStatus', false);
 
 this.handleMarkerClick(marker);
 this.showMapProperies();
 this.mapMarkers.push(marker);
 marker.setMap(this.map);
 return marker;
}


 
private deleteMarkers() {
   this.clearMarkers();
   this.mapMarkers = [];
}
private clearMarkers() {
   this.setMapOnAll(null);
}

// Sets the map on all markers in the array.
private setMapOnAll(map) {
   for (var i = 0; i < this.mapMarkers.length; i++) {
      this.mapMarkers[i].setMap(map);
   }
}


showMapProperies(){
   $(document).ready(function () {
      $('.owl-carousel').owlCarousel({
         loop: true,
         margin: 10,
         // reowlNav : false,
         responsiveClass: true,
         navigation: false,
         responsive: {
            0: {
               items: 1,
               nav: true
            },
            600: {
               items: 2,
               nav: false
            },
            776: {
               items: 2,
               nav: false
            },
            1000: {
               items: 3,
               nav: false
            },
            1200: {
               items: 5,
               nav: true,
               loop: false,
               margin: 20
            }
         }
      })
   });
   
}

handleMarkerClick(marker) {
if (marker.get('clickStatus') === true) {
  var image = '/assets/images/tag_line.png';
  marker.setIcon(image);

} else {
//   var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

//   const markerIndex = marker.get('id');
// //   console.log(this.propertyList[markerIndex].listing.length.toString());
// //   this.selectedZooplaRoots.push(this.propertyList[markerIndex]);
// //   this.selectPropertyCount += this.propertyList[markerIndex].listing.length;
// this.showMapProperies();
// this.initialiseMapListingCarousel();
//   marker.setIcon(image);
marker.setIcon();
}
marker.set('clickStatus', !marker.get('clickStatus'));
}

  toggleListingView() {
    console.log('toggleListingView executed')
    if (this.listingViewState === 'viewList') {
       this.listingViewState = 'viewMap';
      this.showMapProperies();
    } else {
      // this.uiState='viewSelectedListings';
       this.listingViewState = 'viewList';
    }
 }

  checkIfShortlistProperty(data){
    if(data.Result.length>0){
      this.shortlistPropertyExist=true;
    }
    else{
      this.shortlistPropertyExist=false;
    }
  }

 openItem(i) {
		$("#sub-item-1").css({"display":"none"});
		$("#sub-item-"+i).css({"display":"block"});
		$("#openItem1").removeClass("active").addClass("inActive");
		$("#openItem"+i).removeClass("inActive").addClass("active");
	}
  viewFullDetails(eachListing) {
    this.shortlistProperty = eachListing;
   //  this.shareService.setSettings(eachListing);
    this.router.navigate(['/my-shortlist',eachListing.shortlistedPropertyId]);

 }

 initialiseMapListingCarousel() {
   $(document).ready(function () {
      $('.owl-carousel').owlCarousel({
         loop: true,
         margin: 10,
         dots: true,
         // reowlNav : false,
         // items: this.selectedZooplaListings.length,
         responsiveClass: true,
         navigation: false,
         responsive: {
            0: {
               items: 1,
               nav: true
            },
            600: {
               items: 2,
               nav: false
            },
            776: {
               items: 2,
               nav: false
            },
            1000: {
               items: 3,
               nav: false
            },
            1200: {
               items: 5,
               nav: true,
               loop: false,
               margin: 20
            }
         }
      })
   });
}
}
