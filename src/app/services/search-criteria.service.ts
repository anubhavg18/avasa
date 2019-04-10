import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, } from '@angular/common/http';
import { ZooplaListingModel, BoundingBox, Listing, PriceChange, RentalPrices, ConvertZoopla } from 'src/app/models/zoopla-listing.model';
@Injectable({
   providedIn: 'root'
})
export class SearchCriteriaService {
   public maxCommuteTime: any;
   ZooplaListingModel: ZooplaListingModel[] = [];
   constructor(private http: HttpClient) { }

   amenityPreferences() {
      let headers = new HttpHeaders().set('Authorization', 'Bearer mpcNqE1ZOVZs7cn');
      return this.http.get('amenityPreferences', {
         headers: headers
      });
   }

   areaPreferences() {
      let headers = new HttpHeaders().set('Authorization', 'Bearer mpcNqE1ZOVZs7cn');
      return this.http.get('areaPreferences', {
         headers: headers
      })
   }


   updateAmenityPreferences(data) {
      let headers = new HttpHeaders().set('Authorization', 'Bearer mpcNqE1ZOVZs7cn');
      return this.http.put('amenityPreferences', data, {
         headers: headers
      });
   }

   updateAreaPreferences(data) {
      let headers = new HttpHeaders().set('Authorization', 'Bearer mpcNqE1ZOVZs7cn');
      return this.http.put('areaPreferences', data, {
         headers: headers
      });
   }

   maxCommuteTimeInWord(commuteTime) {
      var h = Math.floor(commuteTime / 3600);
      var m = Math.floor(commuteTime % 3600 / 60);
      var hDisplay = h > 0 ? h + (h == 1 ? " Hour and " : " Hours and ") : "";
      var mDisplay = m > 0 ? m + (m == 1 ? " minutes " : " minutes") : "";
      var time = hDisplay + mDisplay;
      if (time == '1 Hour and ') {
         var b = time.replace('1 Hour and ', '1 Hour');
         return this.maxCommuteTime = b;
      }
      else if (time == "2 Hours and ") {
         var a = time.replace('2 Hours and ', '2 Hours');
         return this.maxCommuteTime = a;
      }
      else {
         return hDisplay + mDisplay;
      }
   }

   timeMap(data) {
      // console.log(data);
      return this.http.post(`https://api.traveltimeapp.com/v3/time_map`, data)

   }

   getProperty(data) {

      return this.http.get(data)
      //   .subscribe((res: Response) => {
      //     const data = JSON.stringify(res);
      //     const zooplaListingModel = Convert.toZooplaListingModel(data);

      // })
   }

   searchCriteria(data) {
      // let headers = new HttpHeaders().set('Authorization','Bearer '+token).set('Content-Type','application/json');
      // let params=new HttpParams().set('email',data);
      // data=JSON.parse(data);
      console.log("Search Criteria ID Object: ", data)
      return this.http.post('searchCriterias', data);
   }

   // getImagesFromZoopla(listing) {
   //    var url = "http://www.whateverorigin.org/get?url=" + encodeURIComponent(`https://www.zoopla.co.uk/to-rent/details/photos/${listing.listing_id}`);
   //    return this.http.get(url);

   // }

}