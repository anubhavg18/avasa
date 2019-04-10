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

//  export interface commuteTime{
//    "commuteTime":[
//       {name:'15 minutes',send:'15'},
//       {name:'30 minutes',send:'30'},
//       {name:'45 minutes',send:'45'},
//       {name:'1 hour',send:'60'},
//       {name:'1 hour and 15 minutes',send:'75'},
//       {name:'1 hour and 30 minutes',send:'90'},
//       {name:'1 hour and 45 minutes',send:'105'},
//       {name:'2 hours',send:'120'},
//       {name:'2 hours and 15 minutes',send:'135'},
      
//     ]
// }

 export namespace Convert {
    export function toZooplaListingModel(json: string): Commutes {
    return JSON.parse(json);
    }


    export function abc(json: string): commute {
    return JSON.parse(json);
    }
}
