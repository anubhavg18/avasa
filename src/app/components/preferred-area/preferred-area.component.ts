/// <reference types="@types/googlemaps" />
import { Component, ElementRef, NgZone, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Increment, Decrement, Reset,UpdateForm } from '../frontend/search-criteria/search-criteria.actions';
import { Observable } from 'rxjs';
import {SearchCriteriaService} from 'src/app/services/search-criteria.service';
import { ZooplaListingModel, BoundingBox, Listing, PriceChange, RentalPrices, ConvertZoopla } from 'src/app/models/zoopla-listing.model';
declare var $: any;
declare const google: any;
@Component({
  selector: 'app-preferred-area',
  templateUrl: './preferred-area.component.html',
  styleUrls: ['./preferred-area.component.css']
})
export class PreferredAreaComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  count$: Observable<object>;
  public timeTaken:any;
  public totalZooplaApiCount:number=0;
  public propertyList: any = [];
  public lat:number;
  public lon:number;
  public totalPropertyCount:number;
  showLoader = true;
  public mapMarkers = [];
  public selectedZooplaRoots: any = [];
  selectPropertyCount: number = 0;
  public uiState: string = 'searchProperty';
  public propertyfiveMinutesWalk:any=[];
  public propertyFeatures:any=[];
  public outdoorSpaces:any=[];
  minPrice: number = 500;
  maxPrice: number = 2500;
  public selectedZooplaListings: any = [];
  minBedrooms: any;
  maxBedrooms: any;
  furnishType: any;
  houseType: any;
  constructor(private store: Store<{ searchCriteria: object }>,  private searchCriteriaService: SearchCriteriaService,private router:Router) {
    this.count$ = this.store.pipe(select('searchCriteria'));
    this.count$.subscribe(res=>{
     this.timeTaken=res['timeTravelData'];
    });

    this.count$.subscribe(res=>{
      this.lat=res['commute']['destLatitude'];
      this.lon=res['commute']['destLongitude'];
     });

    this.searchCriteriaService.timeMap(this.timeTaken).subscribe((res: Response) =>
    this.callZooplaApi(res));
   }

  ngOnInit() {
    setTimeout(() => {
      // Put the logic here 
      // let centerLat=parseFloat(this.latitude).toFixed(0);
      // var centerLng = parseFloat(this.longitude).toFixed(0);
      console.log(this.lat);
      console.log(this.lon);
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
  checkSelectedProperties() {
    // if(this.selectPropertyCount>0){
    // console.log('Check slelected properties called')
    if (this.selectPropertyCount && this.selectPropertyCount < 100) {
      this.router.navigateByUrl('/property-listing');
      //  this.showSelectedPropertiesNow();
    } else {
       this.openModal();
    }
 }

 public showSelectedPropertiesNow() {
  this.closeModal();
  this.router.navigateByUrl('/property-listing');
//   this.deleteMarkers();
//   this.selectedZooplaRoots.forEach((eachZooplaRoot) => {
//      eachZooplaRoot.listing.forEach(eachListing => {

//         //Filter out properties older than 14 days
//         var datePrevFourteen = new Date();
//         datePrevFourteen.setDate(datePrevFourteen.getDate() - 14);
//         if(new Date(eachListing.last_published_date) > datePrevFourteen){
//            var marker = this.plotPropertyToMap(eachListing, '');
//            eachListing.marker = marker;
//            this.selectedZooplaListings.push(eachListing);
           
//            // console.log(marker);
//            // console.log('date within range', eachListing.last_published_date)
//         }
//      });
//   });
//   //Pans out map
//   var bounds = this.map.getBounds();
//   var center = bounds.getCenter();
//   this.map.fitBounds(bounds);

  // this.searchCriteriaService.getCommuteTimeFromDistanceMatrix(this.recentLatitude.toString(), this.recentLongitude.toString(),this.modeOfCommute , this.selectedZooplaListings);
  // this.getDistanceMatrix(this.recentLatitude.toString(), this.recentLongitude.toString(), this.modeOfCommute, this.selectedZooplaListings).subscribe(
  //    (res) => {
  //       // console.log('hhh');
  //       // console.log(res);
  //    }
  // );


  // console.log("Listings: ", this.selectedZooplaListings);
  // this.uiState = "viewSelectedListings";

  // this.initialiseMapListingCarousel();
}

plotPropertyToMap(eachListing, title = 'demo') {
  // var image = '/assets/images/map-marker.svg'
  console.log(eachListing);
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
     console.log(marker.get('obj'));
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

// Deletes all markers in the array by removing references to them.
private deleteMarkers() {
  console.log('delete markers called');
  this.clearMarkers();
  this.mapMarkers = [];
}
// Removes the markers from the map, but keeps them in the array.
private clearMarkers() {
  this.setMapOnAll(null);
}
// Sets the map on all markers in the array.
private setMapOnAll(map) {
  for (var i = 0; i < this.mapMarkers.length; i++) {
     this.mapMarkers[i].setMap(map);
  }
}
  callZooplaApi(res) {
    // console.log(res);
   this.showLoader=false;
    for (let intersections = 0; intersections <= res.results.intersections1.length - 1; intersections++) {
       // console.log('j');
       this.totalZooplaApiCount=this.totalZooplaApiCount+1;
       let intersections1 = res.results.intersections1;
       let array_length = intersections1.length;

if(intersections ==3){return
}
       let zooplaURL = this.getZooplaURL(intersections1[intersections]);

       this.searchCriteriaService.getProperty(zooplaURL).subscribe((res: Response) => {
          const data = JSON.stringify(res);
          const zooplaListingModel = ConvertZoopla.toZooplaListingModel(data);
          this.propertyList[intersections] = zooplaListingModel;
          this.store.dispatch(new UpdateForm({"zoopla":zooplaListingModel}));
          
       
          if (zooplaListingModel.listing.length > 0) {
             this.totalZooplaApiCount=this.totalZooplaApiCount-1;
             this.plotLocationsToMap(zooplaListingModel, intersections, zooplaListingModel.listing.length.toString())
             this.totalPropertyCount=this.totalPropertyCount+zooplaListingModel.listing.length;
          }
          else{
             this.totalZooplaApiCount=this.totalZooplaApiCount-1;
             // this.openModelForNoProperty();
         
          }
         
       },
          error => {
             this.totalZooplaApiCount=this.totalZooplaApiCount-1;
             console.log('IN failure, ', error)
             // setTimeout(() => {
             // this.openModelForNoProperty();
          // }, 3000);
          this.checkIsLastApi(this.totalZooplaApiCount);

          }
       );
 
       // this.checkIsLastApi(this.totalZooplaApiCount);
    }

    setTimeout(() => {
       this.map.setZoom(11);
       this.showLoader = false;
    }, 3000);
    //Pans out map
    
 }
 
 public checkIsLastApi(totalZooplaApiCount){
   console.log(totalZooplaApiCount)
  if(totalZooplaApiCount==0){
     console.log(totalZooplaApiCount)
     this.openModelForNoProperty();
  }

}
openModal() {
  let element: HTMLElement = document.getElementById('open-modal') as HTMLElement;
  element.click();
}

openModelForNoProperty(){
  let element: HTMLElement = document.getElementById('open-modal1') as HTMLElement;
  element.click();
}
closeModal() {
  let element: HTMLElement = document.getElementById('close-modal') as HTMLElement;
  element.click();
}
closeModal1() {
  let element: HTMLElement = document.getElementById('close-modal1') as HTMLElement;
  element.click();
}
 public plotLocationsToMap(property: any, index: number, title: string) {
  console.log(property);
  // var image = '/assets/images/tag_line.png';
  var image = '/assets/images/map_point.svg';
  var marker = new google.maps.Marker({
     position: {
        lat: property.latitude,
        lng: property.longitude
        // lat: property.min_lat,
        // lng: property.min_lon
     },
     // map: this.gmapElement.nativeElement,
     icon: image,
     label: title,
  });
  marker.set('id', index);
  marker.set('clickStatus', false);
  marker.addListener('click', () => {
     this.handleMarkerClick(marker);
  });
  
  this.mapMarkers.push(marker);
  marker.setMap(this.map);
  this.map.setZoom(8);

}

handleMarkerClick(marker) {
  if (marker.get('clickStatus') === true) {
     // var image = '/assets/images/tag_line.png';
     var image = '/assets/images/map_point.svg';
     marker.setIcon(image);

  } else {
     // var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
     var image = '/assets/images/map_point2.svg';

     const markerIndex = marker.get('id');
     console.log(this.propertyList[markerIndex].listing.length.toString());
     this.selectedZooplaRoots.push(this.propertyList[markerIndex]);
     this.store.dispatch(new UpdateForm({"preferred area":this.selectedZooplaRoots}));
     this.selectPropertyCount += this.propertyList[markerIndex].listing.length;
     marker.setIcon(image);

  }
  marker.set('clickStatus', !marker.get('clickStatus'));
  if (this.selectedZooplaRoots && this.selectedZooplaRoots.length > 0) {
   
   //  this.router.navigateByUrl('/property-listing');
    this.uiState = 'selectProperty';
  }

}
 getZooplaURL(data) {
  // console.log(data);
  this.count$ = this.store.pipe(select('searchCriteria'));
  
    this.count$.subscribe(res=>{
  this.minPrice=res['basic criteria']['minPrice'];
  this.maxPrice=res['basic criteria']['maxPrice'];
  this.minBedrooms=res['basic criteria']['minBedrooms'];
  this.maxBedrooms=res['basic criteria']['maxBedrooms'];
  this.houseType=res['basic criteria']['houseType'];
    });
    let keywords: String = this.getKeywords();
    let minPrice: String = (this.minPrice).toString();
    let maxPrice: String = (this.maxPrice).toString();
    let lat_min: String = data.envelope.min_lat;
    let lon_min: String = data.envelope.min_lon;
    let lat_max: String = data.envelope.max_lat;
    let lon_max: String = data.envelope.max_lon;
    let ZOOPLA_API_DEV_KEY = "5gdsqq79cbhfxr8kdgqez233";
  
    let minimum_beds: String = this.minBedrooms;
    let maximum_beds: String = this.maxBedrooms;
    let propertyType: String = this.houseType;
  
    let zooplaURL = 'https://api.zoopla.co.uk/api/v1/property_listings.json?api_key=' + ZOOPLA_API_DEV_KEY + '&minimum_price=' + minPrice + '&maximum_price=' + maxPrice + '&listing_status=rent&lat_min=' + lat_min + '&lon_min=' + lon_min + '&page_size=100&lat_max=' + lat_max + '&lon_max=' + lon_max + '&minimum_beds=' + minimum_beds + '&maximum_beds=' + maximum_beds + '&order_by=age&&page_number=1&keyworld=' + keywords;
    console.log(zooplaURL)
    return zooplaURL;
}

getKeywords() {
  this.count$ = this.store.pipe(select('searchCriteria'));
   
    this.count$.subscribe(res=>{
      this.propertyfiveMinutesWalk=res['Advance Criteria']['fiveminPlaces'];
      this.propertyFeatures=res['Advance Criteria']['propertyFeatures'];
      this.outdoorSpaces=res['Advance Criteria']['outdoor'];
    });
    var keywords = "";
    if (this.propertyfiveMinutesWalk.length > 0) {
       keywords += this.propertyfiveMinutesWalk.join(',');
       keywords += ',';
    }
    if (this.propertyFeatures.length > 0) {
       keywords += this.propertyFeatures.join(',');
       keywords += ',';
    }
    if (this.outdoorSpaces.length > 0) {
       keywords += this.outdoorSpaces.join(',');
    }
    keywords = keywords.toLocaleLowerCase();
    keywords = keywords.split(' ').join('');
    console.log(keywords);
    return keywords;
    
 
}


}
