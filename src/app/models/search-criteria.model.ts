export interface Commutes{
    "commute":[
       {
          "modeOfCommute":string,
          "destination":string,
          "maxCommuteTime":number,
          "destLatitude":number,
          "destLongitude":number,
          "primaryCommute":number
       }

    ],
    "houseType":string,
    "furnishType":string,
    "minPrice":number,
    "maxPrice":number,
    "minBedroom":number,
    "maxBedroom":number,
    "outdoorSpaces":any[],
    "propertyFeatures":any[],
    "5minPlaces":any[]
 }

 export interface commute{
    "modeOfCommute":string,
    "destination":string,
    "maxCommuteTime":number,
    "destLatitude":number,
    "destLongitude":number,
    "primaryCommute":number
 }
 export namespace Convert {
    export function toZooplaListingModel(json: string): Commutes {
    return JSON.parse(json);
    }


    export function abc(json: string): commute {
    return JSON.parse(json);
    }
}
