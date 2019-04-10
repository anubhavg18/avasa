// To parse this data:
//
//   import { Convert, Welcome } from "./file";
//
//   const welcome = Convert.toWelcome(json);

export interface Welcome {
    ResponseCode:               number;
    ResponseMessage:            string;
    Comments:                   string;
    totalShortlistedProperties: number;
    Result:                     Result;
}

export interface Result {
    properties: Property[];
}

export interface Property {
    searchCriteriaId:      number;
    propertyId:            number;
    propertyName:          string;
    propertyUrl:           string;
    imageUrl:              string;
    description:           string;
    price:                 number;
    availableDate:         string;
    bedroom:               number;
    bathroom:              number;
    address:               string;
    totalComments:         number;
    avgRating:             number;
    commutes:              Commute[];
    shortlistedPropertyId: number;
    last_published_date:   string;
    latitude:              string;
    longitude:             string;
}

export interface Commute {
    commuteName:             string;
    modeOfCommute:           string;
    commuteTimeInSeconds:    number;
    commuteTime:             string;
    commuteDistance:         string;
    commuteDistanceInMeters: number;
}

// Converts JSON strings to/from your types
export namespace Convert {
    export function toWelcome(json: string): Welcome {
        return JSON.parse(json);
    }

    export function welcomeToJson(value: Welcome): string {
        return JSON.stringify(value);
    }
}
