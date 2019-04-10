/// <reference types="@types/googlemaps" />
import { Component, ElementRef, NgZone, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Increment, Decrement, Reset,UpdateForm } from '../search-criteria/search-criteria.actions';
import { Observable } from 'rxjs';
import { forEach } from '@angular/router/src/utils/collection';
import {SearchCriteriaService} from 'src/app/services/search-criteria.service';
import { ZooplaListingModel, BoundingBox, Listing, PriceChange, RentalPrices, ConvertZoopla } from 'src/app/models/zoopla-listing.model';
declare var $: any;
declare const google: any;
@Component({
  selector: 'app-property-listing',
  templateUrl: './property-listing.component.html',
  styleUrls: ['./property-listing.component.css']
})
export class PropertyListingComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  count$: Observable<object>;
  public lat:number;
  public propertyList: any = [];
  public lon:number;
  public selectedZooplaRoots: any = [];
  public mapMarkers = [];
  public selectedZooplaListings: any = [];
  public uiState: string = 'searchProperty';
  public listingViewState = 'viewMap';
  public selectedListingDetails: any = {};
  showEditOptions = false;

  constructor(private store: Store<{ searchCriteria: object }>,private router:Router) {
    this.count$ = this.store.pipe(select('searchCriteria'));
    this.count$.subscribe(res=>{
     this.selectedZooplaRoots=res['preferred area'];

   //   this.lat=this.selectedZooplaRoots[0].listing[0].latitude;
   //   this.lon=this.selectedZooplaRoots[0].listing[0].longitude;
     this.showSelectedPropertiesNow();
    });
    this.count$.subscribe(res=>{
      this.lat=res['commute']['destLatitude'];
      this.lon=res['commute']['destLongitude'];
     });
   }

  ngOnInit() {
    setTimeout(() => {
      // Put the logic here 
      // let centerLat=parseFloat(this.latitude).toFixed(0);
      // var centerLng = parseFloat(this.longitude).toFixed(0);
      // console.log(this.lat);
      // console.log(this.lon);
      var mapProp = {
         center:
            //   // {lat: -34, lng: 150},
            new google.maps.LatLng(this.lat, this.lon),
         //     // parseFloat(this.latitude),parseFloat( this.longitude)),
         zoom: 15,
         mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      // var mapOptions = {
      //   zoom: 8,
      //   center: {lat: -34.397, lng: 150.644}
      // };
      
      this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
      // var marker = new google.maps.Marker({
      //    position: {
      //       lat: this.lat,
      //       lng: this.lon
      //       // lat: property.min_lat,
      //       // lng: property.min_lon
      //    },
      // //    // map: this.gmapElement.nativeElement,
      // //    icon: '/assets/images/blue_star.png'
      // });
      // marker.setMap(this.map);
   }
   , 1000);
  }

  toggleListingView() {
   console.log('toggleListingView executed')
   if (this.listingViewState === 'viewList') {
      this.listingViewState = 'viewMap';
      this.initialiseMapListingCarousel()
   } else {
      this.listingViewState = 'viewList';
   }
}
editSearchCriteria(type: string) {

   if (type === 'preferred_area') {
      this.uiState = 'selectProperty';
      console.log('preferred Area ', this.propertyList);
      // this.selectedZooplaRoots = [];
      // this.selectedZooplaListings = [];
      // this.mapMarkers = [];
      // this.selectPropertyCount = 0;
      // var mapProp = {
      //    center:
      //       new google.maps.LatLng(this.recentLatitude, this.recentLongitude),
      //    zoom: 11,
      //    mapTypeId: google.maps.MapTypeId.ROADMAP
      // };
      // this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
      // var marker = new google.maps.Marker({
      //    position: {
      //       lat: this.recentLatitude,
      //       lng: this.recentLongitude
      //       // lat: property.min_lat,
      //       // lng: property.min_lon
      //    },
      //    // map: this.gmapElement.nativeElement,
      //    icon: '/assets/images/blue_star.png'
      // });
      // marker.setMap(this.map);
      // this.propertyList.forEach((eachProp, index) => {
      //    if (eachProp.listing.length > 0) {
      //       this.plotLocationsToMap(eachProp, index, eachProp.listing.length.toString())
      //    }
         
      // })
      this.router.navigateByUrl('/preferred-area');
   } else {
      this.uiState = 'searchProperty';
      // this.closeModal();
      // this.closeModal1();
      // this.selectedZooplaRoots = [];
      // this.selectedZooplaListings = [];
      // this.selectedListingDetails = [];
      // this.mapMarkers = [];
      // this.propertyList = [];
      // this.selectPropertyCount = 0;
      // setTimeout(() => {
      //    var mapProp = {
      //       center:
      //          new google.maps.LatLng(this.recentLatitude, this.recentLongitude),
      //       zoom: 15,
      //       mapTypeId: google.maps.MapTypeId.ROADMAP
      //    };
      //    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
      //    var marker = new google.maps.Marker({
      //       position: {
      //          lat: this.recentLatitude,
      //          lng: this.recentLongitude
      //          // lat: property.min_lat,
      //          // lng: property.min_lon
      //       },
      //       // map: this.gmapElement.nativeElement,
      //       icon: '/assets/images/blue_star.png'
      //    });
      //    marker.setMap(this.map);
      // }, 100);
      this.router.navigateByUrl('/preferred-area');

      if(type==='commute'){
         this.router.navigateByUrl('/search-criteria');
       
      } else if (type==='filter'){
         this.router.navigateByUrl('/search-criteria');
        
      }
   }

   this.showEditOptions = !this.showEditOptions;
}

sortListings(choice: any) {
   console.log('In Sort ', choice);
   let sortedList = this.selectedZooplaListings;

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

  public showSelectedPropertiesNow() {
    // this.closeModal();
    // this.deleteMarkers();
    setTimeout(() => {
    this.selectedZooplaRoots.forEach((eachZooplaRoot) => {
       eachZooplaRoot.listing.forEach(eachListing => {
  
          //Filter out properties older than 14 days
          var datePrevFourteen = new Date();
          datePrevFourteen.setDate(datePrevFourteen.getDate() - 14);
          if(new Date(eachListing.last_published_date) > datePrevFourteen){
             var marker = this.plotPropertyToMap(eachListing, '');
             eachListing.marker = marker;
             this.selectedZooplaListings.push(eachListing);
             
             // console.log(marker);
            //  console.log('date within range', eachListing.last_published_date)
          }
       });
    });
    //Pans out map
    var bounds = this.map.getBounds();
    var center = bounds.getCenter();
    this.map.fitBounds(bounds);
   //  this.map.setZoom(9);
  
    this.initialiseMapListingCarousel();
    // this.searchCriteriaService.getCommuteTimeFromDistanceMatrix(this.recentLatitude.toString(), this.recentLongitude.toString(),this.modeOfCommute , this.selectedZooplaListings);
    // this.getDistanceMatrix(this.recentLatitude.toString(), this.recentLongitude.toString(), this.modeOfCommute, this.selectedZooplaListings).subscribe(
    //    (res) => {
    //       // console.log('hhh');
    //       // console.log(res);
    //    }
    // );
  
  
    // console.log("Listings: ", this.selectedZooplaListings);
    this.uiState = "viewSelectedListings";
    },2000);
  }
  
  plotPropertyToMap(eachListing, title = 'demo') {
    // var image = '/assets/images/map-marker.svg'
   //  console.log(eachListing);
    var icon = {
       url: '/assets/images/map-marker.svg', // url
       scaledSize: new google.maps.Size(50, 50), // scaled size
       origin: new google.maps.Point(0,0), // origin
       anchor: new google.maps.Point(0, 0) // anchor
   };
    var marker = new google.maps.Marker({
       position: {
          lat: eachListing.latitude,
          lng: eachListing.longitude
          // lat: property.min_lat,
          // lng: property.min_lon
       },
       // map: this.gmapElement.nativeElement,
       icon: icon,
       // label: {
       //    text: eachListing.price,
       //    color: 'white',
       //    fontSize: '15px',
       //    fontWeight: 'bold'
       //  },
        title:'£'+eachListing.price+'/month'
    });
    marker.set('obj', eachListing);
    marker.set('clickStatus', false);
    marker.addListener('click', () => {
      //  console.log(marker.get('obj'));
       this.handlePropertyClick(marker);
    });
    this.mapMarkers.push(marker);
    marker.setMap(this.map);
    return marker;
  }

  private handlePropertyClick(marker) {
    $('.owl-carousel').owlCarousel({
       slideBy: 2
    });
  }
  carouselClickProperty(eachListing) {
    this.map.setZoom(17);
   //  console.log(eachListing)
   //  console.log(eachListing.marker);
    this.map.panTo(eachListing.marker.position);
 }

 viewFullDetails(eachListing) {
  this.selectedListingDetails = eachListing;
  // this.uiState = 'viewFullDetails';
//  this.PropertyDetailsService.changeMessage(eachListing);
this.store.dispatch(new UpdateForm({"property details":eachListing}));
  this.router.navigate(['/property-details',eachListing.listing_id]);
  // console.log(eachListing);
  // this.searchCriteriaService.getImagesFromZoopla(eachListing)
  // .subscribe(
  //    (res) => {
  //       console.log(res);
  //       return res;
  //    }
  // );
  // $(window).load(function () {
  //    $('#carousel').flexslider({
  //       animation: "slide",
  //       controlNav: false,
  //       animationLoop: false,
  //       slideshow: false,
  //       itemMargin: 3,
  //       asNavFor: '#slider'
  //    });

  //    $('#slider').flexslider({
  //       animation: "slide",
  //       controlNav: false,
  //       animationLoop: false,
  //       slideshow: false,
  //       smoothHeight: true,
  //       sync: "#carousel",
  //       start: function (slider) {
  //          $('body').removeClass('loading');
  //       }
  //    });
  // });
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
