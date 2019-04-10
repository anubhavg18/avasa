/// <reference types="@types/googlemaps" />
import { Component, ElementRef, NgZone, OnInit, ViewChild, } from '@angular/core';
import { Commutes, Convert, commute } from 'src/app/models/search-criteria.model'
import { MapsAPILoader } from '@agm/core';
import { SearchService } from 'src/app/services/search.service';
import { SearchCriteriaService } from 'src/app/services/search-criteria.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/login/token.service';
import { Auth1Service } from 'src/app/services/login/auth1.service';
import { isInteger, isNumber } from '@ng-bootstrap/ng-bootstrap/util/util';
import { ZooplaListingModel, BoundingBox, Listing, PriceChange, RentalPrices, ConvertZoopla } from 'src/app/models/zoopla-listing.model';
import { Observable } from 'rxjs';
import { forEach } from '@angular/router/src/utils/collection';
import { PropertyDetailsService } from 'src/app/services/property-details.service';
import { ShortlistService } from 'src/app/services/shortlist.service';
import { Store, select } from '@ngrx/store';
import { Increment, Decrement, Reset,UpdateForm } from './search-criteria.actions';
declare var $: any;
declare const google: any;
@Component({
   selector: 'app-search-criteria',
   templateUrl: './search-criteria.component.html',
   styleUrls: ['./search-criteria.component.css']
})

export class SearchCriteriaComponent implements OnInit {
   @ViewChild("search")
   public searchElementRef: ElementRef;

   @ViewChild('gmap') gmapElement: any;
   map: google.maps.Map;
   public latitude: number;
   public longitude: number;
   public zoom: number;
   public name: string;
   public lat: number;
   public long: number;
   public loggedIn: boolean;
public totalPropertyCount:number;
public totalZooplaApiCount:number=0;
   public recentLatitude: number = 51.509865;
   public recentLongitude: number = -0.118092;
   public recentLocationName: string = 'Long Acre, London, UK';
   public recentCommuteTime: any = '1 hour and 15 minutes';
   public recentCommuteTimeInSec: any = 4500;
   public modeOfCommute:any = 'public_transport';
   public maxCommuteTime:any;
   public statuses: any;
   public areas: any;
   public preferredAmenities: any;
   public avoidedAmenities: any;
   public searchControl: FormControl;
   form: FormGroup;
   basicCriteriaForm: FormGroup;
   personalizeSearchForm: FormGroup;
   advanceCriteriaForm: FormGroup;
   minPrice: number = 500;
   maxPrice: number = 2500;
   propertyFeatures: any = [];
   propertyfiveMinutesWalk: any = [];
   minBedrooms: any;
   maxBedrooms: any;
   furnishType: any;
   houseType: any;
   searchCriteriaModel: Commutes[] = [];
   searchCriteriaId: number;
   features = [{ features: "Period" }, { features: "New Built" }, { features: "Purpose Built" }, { features: 'Wood Floor' }, { features: '2+ Bathrooms' }]
   fiveMinutesWalk = [{ features: "Super Market" }, { features: "School" }, { features: "Shopping" }, { features: 'Restaurant' }, { features: 'Gym' }, { features: 'Parking' }]
   outdoorSpaces: any = [];
   primaryCommute: any;
   public propertyList: any = [];
   public uiState: string = 'searchProperty';
   public listingViewState = 'viewMap';
   selectPropertyCount: number = 0;
   public selectedZooplaRoots: any = [];
   public selectedZooplaListings: any = [];
   public selectedListingDetails: any = {};
   public mapMarkers = [];
   bounds: any;
   center: any;
   showSortMenu = false;
   showEditOptions = false;
   searchIdObj: any;
   count$: Observable<object>;
   showLoader = false;
   public timetaken = {
      arrival_time: new Date(),
      mode: null,
      app_key: "693f948e6dac8c9c1c032b8248c89898",
      app_id: "f2d25c05",
      format: "bounding-boxes-no-holes",
      smooth: false,
      shapes: {},
      targets: {
         target0: {
            mode: null,
            arrival_time: "2019-03-26T09:00:00.000Z",
            coords: [

            ],
            travel_time: null,
         }
      },
      unions: {},
      travel_time: null,
      intersections: {
         intersections1: {
            max_points: 0,
            targets: [
               "target0"
            ]
         }
      }
      
   }


   constructor(
      private store: Store<{ searchCriteria: object }>,
      private searchService: SearchService,
      private searchCriteriaService: SearchCriteriaService,
      private myListingService: ShortlistService,
      private mapsAPILoader: MapsAPILoader,
      private ngZone: NgZone, 
      private formBuilder: FormBuilder, 
      private Auth: Auth1Service, 
      private Token: TokenService, 
      private router: Router,
      private PropertyDetailsService:PropertyDetailsService 
      ) {
      
      

         this.form = this.formBuilder.group({
         mode: ['public_transport', Validators.required],
         search: ['', Validators.required],
      });

      this.basicCriteriaForm = this.formBuilder.group({
         typeOfFurnishing: ['all', Validators.required],
         typeOfProperty: ['all', Validators.required],
         noOfBedrooms: ['', Validators.required],
      });
      this.personalizeSearchForm = this.formBuilder.group({
         status: new FormArray([]),
         areas: new FormArray([]),
         preferredAmenity: new FormArray([]),
         avoidedAmenity: new FormArray([]),
      });
      this.advanceCriteriaForm = this.formBuilder.group({
        outdoor: ['', Validators.required],
        propertyFeature: this.formBuilder.array([]),
      });

      // this.searchService.currentMessage.subscribe(
      //    (data) => this.mapData(data),
      //    (error) => console.log(error),
      // );

      this.searchCriteriaService.amenityPreferences().subscribe(
         (data) => this.amenitiesData(data),
         (error) => console.log(error),
      );

      this.searchCriteriaService.areaPreferences().subscribe(
         (data) => this.areaData(data),
         (error) => console.log(error),
      );
      this.count$ = this.store.pipe(select('searchCriteria'));
         this.count$.subscribe(res=>{
            this.mapData(res['searchCriteria']);
         });

      this.count$ = this.store.pipe(select('searchCriteria'));
         this.count$.subscribe(res=>{
       
         this.form = this.formBuilder.group({
            mode: [res['commute']['modeOfCommute'], Validators.required],
            search: ['', Validators.required],
         });

         this.basicCriteriaForm = this.formBuilder.group({
            typeOfFurnishing: [res['basic criteria']['furnishType'], Validators.required],
            typeOfProperty: [res['basic criteria']['houseType'], Validators.required],
            noOfBedrooms: ['', Validators.required],
         });
         this.minPrice=Number([res['basic criteria']['minPrice']]);
         this.maxPrice=Number([res['basic criteria']['maxPrice']]);
         // this.recentCommuteTime = this.searchCriteriaService.maxCommuteTimeInWord(res['commute']['maxCommuteTime']);

       
         
         // this.recentLocationName=res['commute']['destination'];
         // this.recentLatitude=res['commute']['destLatitude'];
         // this.recentLongitude=res['commute']['destLongitude'];
         console.log([res['basic criteria']['maxPrice']])
      })

   }





   commuteDetails() {
      
      this.modeOfCommute = this.form.value.mode;
      let modeOfCommute= this.form.value.mode;;
      this.maxCommuteTime = this.recentCommuteTimeInSec;
       let maxCommuteTime = this.recentCommuteTimeInSec;
      
      //  this.store.dispatch(new UpdateForm({"pub":"zxc111111","pub2":"zxc2222222","pub3":"zxc333333","pub4":"zxc444444"}));
      if(this.long){
         this.recentLocationName = this.name;
         this.recentLongitude = this.long;this.recentLatitude = this.lat;
         let commute: commute = {
            destination: this.recentLocationName,
            modeOfCommute: modeOfCommute, maxCommuteTime: maxCommuteTime,
            destLatitude: this.recentLatitude, destLongitude: this.recentLongitude, primaryCommute: 1
         };
        
         this.primaryCommute = commute;

      }
      
    
      

      let commute: commute = {
         destination: this.recentLocationName,
         modeOfCommute: this.modeOfCommute, maxCommuteTime: maxCommuteTime,
         destLatitude: this.recentLatitude, destLongitude: this.recentLongitude, primaryCommute: 1
      };
      this.primaryCommute = commute;
      this.store.dispatch(new UpdateForm({"commute":this.primaryCommute}));
      // console.log(commute)
      this.timetaken.targets.target0.travel_time = parseInt(maxCommuteTime);
      this.timetaken.travel_time = parseInt(maxCommuteTime);
      this.timetaken.mode = this.modeOfCommute;
      this.timetaken.targets.target0.mode = this.modeOfCommute;
      // console.log(typeof(this.recentLatitude));
      // this.timetaken.coords.push(this.recentLatitude);
      // this.timetaken.coords.push(this.recentLongitude);
      if (this.recentLatitude) {
         this.timetaken.targets.target0.coords.push(this.recentLatitude);
      }
      if (this.recentLongitude) {
         this.timetaken.targets.target0.coords.push(this.recentLongitude);
         
      }
      console.log(this.recentLatitude);
      console.log(this.recentLongitude);
      
      this.openItem(2);
   }

   callZooplaApi(res) {
      // console.log(res);
     
      for (let intersections = 0; intersections <= res.results.intersections1.length - 1; intersections++) {
         // console.log('j');
         this.totalZooplaApiCount=this.totalZooplaApiCount+1;
         let intersections1 = res.results.intersections1;
         let array_length = intersections1.length;


         let zooplaURL = this.getZooplaURL(intersections1[intersections]);

         this.searchCriteriaService.getProperty(zooplaURL).subscribe((res: Response) => {
            const data = JSON.stringify(res);
            const zooplaListingModel = ConvertZoopla.toZooplaListingModel(data);
            this.propertyList[intersections] = zooplaListingModel;
            this.store.dispatch(new UpdateForm({"zoopla":zooplaListingModel}));
            
            console.log(zooplaListingModel.listing.length)
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
      if(totalZooplaApiCount==0){
         console.log(totalZooplaApiCount)
         this.openModelForNoProperty();
      }

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

   }

   public plotLocationsMarkerToMap(property: any, index: number, title: string) {
      console.log(property);
      // var image = '/assets/images/tag_line.png';
      
      var marker = new google.maps.Marker({
         position: {
            lat: property.latitude,
            lng: property.longitude
            // lat: property.min_lat,
            // lng: property.min_lon
         },
         // map: this.gmapElement.nativeElement,
         // icon: image,
         label: title,
      });
      marker.set('id', index);
      marker.set('clickStatus', false);
      marker.addListener('click', () => {
         this.handleMarkerClick(marker);
      });
      this.mapMarkers.push(marker);
      marker.setMap(this.map);

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
         this.selectPropertyCount += this.propertyList[markerIndex].listing.length;
         marker.setIcon(image);

      }
      marker.set('clickStatus', !marker.get('clickStatus'));
      if (this.selectedZooplaRoots && this.selectedZooplaRoots.length > 0) {
         this.uiState = 'selectProperty';
      }

   }

   getZooplaURL(data) {
      // console.log(data);
      let keywords: String = this.getKeywords();
      let minPrice: String = this.minPrice.toString();
      let maxPrice: String = this.maxPrice.toString();
      let lat_min: String = data.envelope.min_lat;
      let lon_min: String = data.envelope.min_lon;
      let lat_max: String = data.envelope.max_lat;
      let lon_max: String = data.envelope.max_lon;
      let ZOOPLA_API_DEV_KEY = "4ka8x2a4nz5weccjpzumekn9";

      let minimum_beds: String = this.minBedrooms;
      let maximum_beds: String = this.maxBedrooms;
      let propertyType: String = this.houseType;

      let zooplaURL = "https://api.zoopla.co.uk/api/v1/property_listings.json?api_key=" + ZOOPLA_API_DEV_KEY + "&minimum_price=" + minPrice + "&maximum_price=" + maxPrice + "&listing_status=rent&lat_min=" + lat_min + "&lon_min=" + lon_min + "&page_size=100&lat_max=" + lat_max + "&lon_max=" + lon_max + "&minimum_beds=" + minimum_beds + "&maximum_beds=" + maximum_beds + "&order_by=age&&page_number=1&keyworld=" + keywords;
      console.log(zooplaURL)
      return zooplaURL;
   }

   getKeywords() {
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
         keywords += this.outdoorSpaces;
      }

      keywords = keywords.toLocaleLowerCase();
      keywords = keywords.split(' ').join('');
      console.log(keywords);
      return keywords;
   }

   basicCriteriaDetails() {
      this.furnishType = this.basicCriteriaForm.value.typeOfFurnishing;
      this.houseType = this.basicCriteriaForm.value.typeOfProperty;
      let data = $('#ex18b').data('slider').getValue();
      this.minBedrooms = data[0];
      this.maxBedrooms = data[1];
      let basicCriteria={
         minBedrooms: this.minBedrooms,maxBedrooms:this.maxBedrooms,
         furnishType:this.furnishType,houseType:this.houseType,minPrice:this.minPrice,maxPrice:this.maxPrice
      }
      
      this.store.dispatch(new UpdateForm({"basic criteria":basicCriteria}));
      this.openItem(3);
   }

   advanceCriteraiDetails() {
      this.openItem(4);
      let outdoor = this.advanceCriteriaForm.value.outdoor;
      this.outdoorSpaces.push(outdoor);
     
      // this.openItem(4);
      let commute: commute = {
         destination: this.recentLocationName,
         modeOfCommute: this.modeOfCommute, maxCommuteTime: this.maxCommuteTime,
         destLatitude: this.recentLatitude, destLongitude: this.recentLongitude, primaryCommute: 1
      };
     
      this.primaryCommute = commute;
      console.log(this.primaryCommute);
      let Commute: Commutes = {
         commute: [this.primaryCommute], "houseType": this.houseType,
         "furnishType": this.furnishType,
         "minPrice": this.minPrice,
         "maxPrice": this.maxPrice,
         "minBedroom": this.minBedrooms,
         "maxBedroom": this.maxBedrooms,
         "outdoorSpaces": this.outdoorSpaces,
         "propertyFeatures": this.propertyFeatures,
         "5minPlaces": this.propertyfiveMinutesWalk
      }
      
      let advanceCriteria={
         outdoor:this.outdoorSpaces,propertyFeatures:this.propertyFeatures,fiveminPlaces:this.propertyfiveMinutesWalk
      }
      this.store.dispatch(new UpdateForm({"Advance Criteria":advanceCriteria}));

      this.searchCriteriaService.searchCriteria(Commute).subscribe((res: Response) => {
         console.log("Search Criteria Response ", res);
         this.searchIdObj = res;
         this.searchCriteriaId = this.searchIdObj['Result'].searchId;
         console.log("Search Object: ", this.searchIdObj);
      })

   }

   personalizeSearch() {
      // this.uiState = 'searching';
      // this.showLoader = true;
      // this.openItem(5);
      let areas = this.personalizeSearchForm.value.areas;
      let status = this.personalizeSearchForm.value.status;
      let preferredAmenities=this.personalizeSearchForm.value.status;
      let avoidedAmenity=this.personalizeSearchForm.value.status;
      let area={"areas":areas};
      let data={"statuses":status,"preferredAmenities":preferredAmenities,"avoidedAmenities":avoidedAmenity,"mostImportantThings":[1]}
      this.searchCriteriaService.updateAreaPreferences(area);
      this.searchCriteriaService.updateAmenityPreferences(data);

      this.store.dispatch(new UpdateForm({"personalizeSearch":data}));
      this.store.dispatch(new UpdateForm({"timeTravelData":this.timetaken}));
      this.searchCriteriaService.timeMap(this.timetaken);
      this.router.navigateByUrl('/preferred-area');
   //   this.router.navigate(['/login']);
      // .subscribe((res: Response) =>
      // this.callZooplaApi(res));
   }

   mapData(data) {
      
      this.recentLatitude = data.commuteLatitude;
      this.recentLongitude = data.commuteLongitude;
      this.recentLocationName = data.commuteLocation;
      this.recentCommuteTimeInSec = data.commutesTime * 60;
      this.recentCommuteTime = this.searchCriteriaService.maxCommuteTimeInWord(data.commutesTime * 60);
   }

   plusCommuteTime() {
      if (!(this.recentCommuteTimeInSec > 7200)) {
         this.recentCommuteTimeInSec = this.recentCommuteTimeInSec + 900;
         this.recentCommuteTime = this.searchCriteriaService.maxCommuteTimeInWord(this.recentCommuteTimeInSec);
      }

   }

   minusCommuteTime() {
      if (this.recentCommuteTimeInSec > 900) {
         this.recentCommuteTimeInSec = this.recentCommuteTimeInSec - 900;
         this.recentCommuteTime = this.searchCriteriaService.maxCommuteTimeInWord(this.recentCommuteTimeInSec);
      }

   }


   onChange(features: string, isChecked: boolean) {
      const emailFormArray = <FormArray>this.advanceCriteriaForm.controls.propertyFeature;

      if (isChecked) {
         this.propertyFeatures.push(new FormControl(features).value);
         emailFormArray.push(new FormControl(features));
      } else {
         let index = emailFormArray.controls.findIndex(x => x.value == features)
         emailFormArray.removeAt(index);
      }

   }

   onChange1(features: string, isChecked: boolean) {
      const emailFormArray = <FormArray>this.advanceCriteriaForm.controls.fiveMinutesWalk;

      if (isChecked) {
         this.propertyfiveMinutesWalk.push(new FormControl(features).value);
         emailFormArray.push(new FormControl(features));
      } else {
         let index = emailFormArray.controls.findIndex(x => x.value == features)
         emailFormArray.removeAt(index);
      }
   }

   ngOnInit() {
      this.openItem('1');
      this.advanceCriteriaForm = this.formBuilder.group({
         outdoor: ['', Validators.required],
         propertyFeature: this.formBuilder.array([]),
         fiveMinutesWalk: this.formBuilder.array([]),
      });

      this.Auth.authStatus.subscribe(value => this.loggedIn = value);
      setTimeout(() => {
         // Put the logic here 
         // let centerLat=parseFloat(this.latitude).toFixed(0);
         // var centerLng = parseFloat(this.longitude).toFixed(0);
         // console.log(typeof(late))
         var mapProp = {
            center:
               //   // {lat: -34, lng: 150},
               new google.maps.LatLng(this.recentLatitude, this.recentLongitude),
            //     // parseFloat(this.latitude),parseFloat( this.longitude)),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
         };
         // var mapOptions = {
         //   zoom: 8,
         //   center: {lat: -34.397, lng: 150.644}
         // };
         
         this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
         var marker = new google.maps.Marker({
            position: {
               lat: this.recentLatitude,
               lng: this.recentLongitude
               // lat: property.min_lat,
               // lng: property.min_lon
            },
            // map: this.gmapElement.nativeElement,
            icon: '/assets/images/blue_star.png'
         });
         marker.setMap(this.map);
      }, 1000);



      $("#ex18a").slider({
         min: 0,
         max: 4,
         value: 5,
         labelledby: 'ex18-label-1'
      });
      $("#ex18b").slider({
         min: 0,
         max: 4,
         value: [0, 4],
         labelledby: ['ex18-label-2a', 'ex18-label-3b', 'ex18-label-4b', 'ex18-label-5b']
      });

      this.zoom = 4;
      this.latitude = 39.8282;
      this.longitude = -98.5795;

      //create search FormControl
      // this.searchControl = new FormControl();
      var options = {
         types: ['(regions)'],
         componentRestrictions: {country: "UK"}
        };
      //set current position
      this.setCurrentPosition();

      //load Places Autocomplete
      this.mapsAPILoader.load().then(() => {
         let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement,options);
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
               this.recentLatitude = this.latitude;
               this.recentLongitude = this.longitude;
               this.lat = place.geometry.location.lat();
               this.long = place.geometry.location.lng();
               this.zoom = 12;
               this.name = autocomplete.getPlace().formatted_address;
               // console.log(this.name)
               setTimeout(() => {
                  var mapProp = {
                     center:
                        new google.maps.LatLng(this.recentLatitude, this.recentLongitude),
                     zoom: 15,
                     mapTypeId: google.maps.MapTypeId.ROADMAP
                  };
                  this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
                  var marker = new google.maps.Marker({
                     position: {
                        lat: this.recentLatitude,
                        lng: this.recentLongitude
                        // lat: property.min_lat,
                        // lng: property.min_lon
                     },
                     // map: this.gmapElement.nativeElement,
                     icon: '/assets/images/blue_star.png'
                  });
                  marker.setMap(this.map);
               }, 100);
            });
         });
      });


   }

   logout(event: MouseEvent) {
      event.preventDefault();
      this.Token.remove();
      this.Auth.changeAuthStatus(false);
      this.router.navigateByUrl('/login');
   }

   checkSelectedProperties() {
      // if(this.selectPropertyCount>0){
      // console.log('Check slelected properties called')
      if (this.selectPropertyCount && this.selectPropertyCount < 100) {
         this.showSelectedPropertiesNow();
      } else {
         this.openModal();
      }
   }
   // else{
   //    this.openModal();
   // }
   // }

   public showSelectedPropertiesNow() {
      this.closeModal();
      this.deleteMarkers();
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
               // console.log('date within range', eachListing.last_published_date)
            }
         });
      });
      //Pans out map
      var bounds = this.map.getBounds();
      var center = bounds.getCenter();
      this.map.fitBounds(bounds);

      // this.searchCriteriaService.getCommuteTimeFromDistanceMatrix(this.recentLatitude.toString(), this.recentLongitude.toString(),this.modeOfCommute , this.selectedZooplaListings);
      this.getDistanceMatrix(this.recentLatitude.toString(), this.recentLongitude.toString(), this.modeOfCommute, this.selectedZooplaListings).subscribe(
         (res) => {
            // console.log('hhh');
            // console.log(res);
         }
      );


      console.log("Listings: ", this.selectedZooplaListings);
      this.uiState = "viewSelectedListings";

      this.initialiseMapListingCarousel();
   }

   getDistanceMatrix(originLat: string, originLong: string, mode: string, listings: any[]) {
      return new Observable((observer) => {

         var origin1 = new google.maps.LatLng(originLat, originLong);
         var tokenSizeOfDest = 20;
         var loopCount = listings.length / tokenSizeOfDest | 0;
         let i = 0;
         // console.log(loopCount);
         for (i = 0; i < loopCount + 1; i++) {
            let destArray = [];
            // let coordString = '';
            let j;

            for (j = 0; j < tokenSizeOfDest; j++) {
               if (listings[i * tokenSizeOfDest + j] && listings[i * tokenSizeOfDest + j].latitude && listings[i * tokenSizeOfDest + j].longitude) {
                  destArray.push(new google.maps.LatLng(listings[i * tokenSizeOfDest + j].latitude, listings[i * tokenSizeOfDest + j].longitude));
               }
            }
            // console.log(destArray);
            this.callGMapsApi(origin1, destArray, listings, i, tokenSizeOfDest, observer, mode);
         }
      });

   }

   // Calls Distance Matrix API
   callGMapsApi(origin1, destArray, listings, i, tokenSizeOfDest, observer, mode) {
      var service = new google.maps.DistanceMatrixService();

      service.getDistanceMatrix(
         {
            origins: [origin1],
            destinations: destArray,
            travelMode: this.getModeNameForGMapsApi(mode),

         }, (resp, data) => {
            // console.log(resp);
            // console.log(data);
            // console.log(listings);
            let j;
            for (j = 0; j < tokenSizeOfDest; j++) {
               // console.log(i * tokenSizeOfDest + j);
               if (listings[i * tokenSizeOfDest + j]) {
                  const newListingVal = Object.assign({}, listings[i * tokenSizeOfDest + j]);
                  // console.log(newListingVal);
                  // console.log(listings[i * tokenSizeOfDest + j]);
                  newListingVal.distanceMatrix = {
                     distance: resp.rows[0].elements[j].distance,
                     duration: resp.rows[0].elements[j].duration
                  };
                  this.selectedZooplaListings[i * tokenSizeOfDest + j].distanceMatrix = newListingVal.distanceMatrix;
                  // console.log(newListingVal);
                  observer.next(newListingVal);
               }
            }

         });
   }

   getModeNameForGMapsApi(mode: string) {
      switch (mode) {

         case 'public_transport': return 'TRANSIT';
         case 'driving': return 'DRIVING';
         case 'walking': return 'WALKING';
      }
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

   openItem(i) {
      $("#sub-item-1").css({ "display": "none" });
      $("#sub-item-2").css({ "display": "none" });
      $("#sub-item-3").css({ "display": "none" });
      $("#sub-item-4").css({ "display": "none" });
      $("#sub-item-" + i).css({ "display": "block" });
      $("#openItem1").removeClass("active").addClass("inActive");
      $("#openItem2").removeClass("active").addClass("inActive");
      $("#openItem3").removeClass("active").addClass("inActive");
      $("#openItem4").removeClass("active").addClass("inActive");
      $("#openItem" + i).removeClass("inActive").addClass("active");
   }



   minusMinPrice(){
      if(this.minPrice>100)
      {
       this.minPrice=this.minPrice-100;
      //  this.recentCommuteTime= this.searchCriteriaService.maxCommuteTimeInWord(this.recentCommuteTimeInSec);
      }
    }
  
    plusMinPrice(){
      if(this.minPrice<this.maxPrice-100)
      {
       this.minPrice=this.minPrice+100;
      //  this.recentCommuteTime= this.searchCriteriaService.maxCommuteTimeInWord(this.recentCommuteTimeInSec);
      }
    }
  
    minusMaxPrice(){
      if(this.minPrice+100<this.maxPrice)
      {
      this.maxPrice=this.maxPrice-100;
    }
  } 
    
    plusMaxPrice(){
      this.maxPrice=this.maxPrice+100;
    }
   amenitiesData(data) {
      this.statuses = data.Result.statuses;
      this.preferredAmenities = data.Result.preferredAmenities;
      this.avoidedAmenities = data.Result.avoidedAmenities;
   }

   areaData(data) {
      this.areas = data.Result.areas;
   }

   private setCurrentPosition() {
      if ("geolocation" in navigator) {
         navigator.geolocation.getCurrentPosition((position) => {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            this.zoom = 12;
            // console.log(Placeholder)

         });
      }
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

   viewFullDetails(eachListing) {
      this.selectedListingDetails = eachListing;
      // this.uiState = 'viewFullDetails';
     this.PropertyDetailsService.changeMessage(eachListing);
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

   public test(term:string){
      this.router.navigate(['property-details',  {term: term}]);
   }
   editSearchCriteria(type: string) {

      if (type === 'preferred_area') {
         this.uiState = 'selectProperty';
         console.log('preferred Area ', this.propertyList);
         this.selectedZooplaRoots = [];
         this.selectedZooplaListings = [];
         this.mapMarkers = [];
         this.selectPropertyCount = 0;
         var mapProp = {
            center:
               new google.maps.LatLng(this.recentLatitude, this.recentLongitude),
            zoom: 11,
            mapTypeId: google.maps.MapTypeId.ROADMAP
         };
         this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
         var marker = new google.maps.Marker({
            position: {
               lat: this.recentLatitude,
               lng: this.recentLongitude
               // lat: property.min_lat,
               // lng: property.min_lon
            },
            // map: this.gmapElement.nativeElement,
            icon: '/assets/images/blue_star.png'
         });
         marker.setMap(this.map);
         this.propertyList.forEach((eachProp, index) => {
            if (eachProp.listing.length > 0) {
               this.plotLocationsToMap(eachProp, index, eachProp.listing.length.toString())
            }
            
         })
      } else {
         this.uiState = 'searchProperty';
         this.closeModal();
         this.closeModal1();
         this.selectedZooplaRoots = [];
         this.selectedZooplaListings = [];
         this.selectedListingDetails = [];
         this.mapMarkers = [];
         this.propertyList = [];
         this.selectPropertyCount = 0;
         setTimeout(() => {
            var mapProp = {
               center:
                  new google.maps.LatLng(this.recentLatitude, this.recentLongitude),
               zoom: 15,
               mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
            var marker = new google.maps.Marker({
               position: {
                  lat: this.recentLatitude,
                  lng: this.recentLongitude
                  // lat: property.min_lat,
                  // lng: property.min_lon
               },
               // map: this.gmapElement.nativeElement,
               icon: '/assets/images/blue_star.png'
            });
            marker.setMap(this.map);
         }, 100);
         if(type==='commute'){
            this.openItem('1');
          
         } else if (type==='filter'){
            this.openItem('2');
           
         }
      }

      this.showEditOptions = !this.showEditOptions;
   }


   saveListing(listing) {

      var data = {
         commuteName: this.recentLocationName,
         modeOfCommute: this.modeOfCommute,
         commuteTime: listing.distanceMatrix.duration.text,
         commuteTimeInSeconds: listing.distanceMatrix.duration.value,
         commuteDistance: listing.distanceMatrix.distance.text,
         commuteDistanceInMeters: listing.distanceMatrix.distance.value,
         searchCriteriaId: this.searchCriteriaId,
         propertyId: listing.listing_id,
         propertyName: listing.displayable_address,
         propertyUrl: listing.details_url,
         imageUrl: listing.image_url,
         description: listing.description,
         price: listing.price,
         availableDate: listing.last_published_date,
         address: listing.displayable_address,
         bedroom: listing.num_bedrooms,
         bathroom: listing.num_bathrooms
      }
      // console.log('Listing Obj: ', data);
      this.myListingService.shortlistListing(data).
         subscribe(res => {
            console.log('Shortlisted Response: ', res);
            this.myListingService.myShortlist()
            .subscribe(res => {
               console.log('ALl shortilseted porperties: ', res);
            })
         })
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


   hideFullDetails() {
      this.selectedListingDetails = {};
      this.uiState = 'viewSelectedListings';
      this.listingViewState === 'viewMap';
      // console.log("After hide ",this.selectedZooplaListings);
      this.initialiseMapListingCarousel()
   }

   carouselClickProperty(eachListing) {
      this.map.setZoom(17);
      console.log(eachListing)
      console.log(eachListing.marker);
      this.map.panTo(eachListing.marker.position);
   }

   addMarker(lat, lng) {
      console.log("addmarker called")
      var pt = new google.maps.LatLng(lat, lng);
      this.bounds.extend(pt);
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
   onCheckChange(event) {
      const formArray: FormArray = this.personalizeSearchForm.get('status') as FormArray;
    
      /* Selected */
      if(event.target.checked){
        // Add a new control in the arrayForm
        formArray.push(new FormControl(event.target.value));
      }
      /* unselected */
      else{
        // find the unselected element
        let i: number = 0;
    
        formArray.controls.forEach((ctrl: FormControl) => {
          if(ctrl.value == event.target.value) {
            // Remove the unselected element from the arrayForm
            formArray.removeAt(i);
            return;
          }
    
          i++;
        });
      }
    }

    onCheckChange1(event) {
      const formArray: FormArray = this.personalizeSearchForm.get('areas') as FormArray;
    
      /* Selected */
      if(event.target.checked){
        // Add a new control in the arrayForm
        formArray.push(new FormControl(event.target.value));
      }
      /* unselected */
      else{
        // find the unselected element
        let i: number = 0;
    
        formArray.controls.forEach((ctrl: FormControl) => {
          if(ctrl.value == event.target.value) {
            // Remove the unselected element from the arrayForm
            formArray.removeAt(i);
            return;
          }
    
          i++;
        });
      }
    }

    onCheckChange2(event) {
      const formArray: FormArray = this.personalizeSearchForm.get('preferredAmenity') as FormArray;
    
      /* Selected */
      if(event.target.checked){
        // Add a new control in the arrayForm
        formArray.push(new FormControl(event.target.value));
      }
      /* unselected */
      else{
        // find the unselected element
        let i: number = 0;
    
        formArray.controls.forEach((ctrl: FormControl) => {
          if(ctrl.value == event.target.value) {
            // Remove the unselected element from the arrayForm
            formArray.removeAt(i);
            return;
          }
    
          i++;
        });
      }
    }

    onCheckChange3(event) {
      const formArray: FormArray = this.personalizeSearchForm.get('avoidedAmenity') as FormArray;
    
      /* Selected */
      if(event.target.checked){
        // Add a new control in the arrayForm
        formArray.push(new FormControl(event.target.value));
      }
      /* unselected */
      else{
        // find the unselected element
        let i: number = 0;
    
        formArray.controls.forEach((ctrl: FormControl) => {
          if(ctrl.value == event.target.value) {
            // Remove the unselected element from the arrayForm
            formArray.removeAt(i);
            return;
          }
    
          i++;
        });
      }
    }
}
