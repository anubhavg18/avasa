// To parse this data:
//
//   import { Convert, Welcome } from "./file";
//
//   const welcome = Convert.toWelcome(json);

export interface Welcome {
    ResponseCode:    number;
    ResponseMessage: string;
    Comments:        string;
    Result:          Result;
}

export interface Result {
    shortlistedPropertyId: number;
    totalComments:         number;
    avgRating:             number;
    commutes:              Commute[];
    zooplaJsonData:        ZooplaJSONData;
    comments:              any[];
}

export interface Commute {
    commuteDistance:         string;
    commuteDistanceInMeters: number;
    commuteName:             string;
    commuteTime:             string;
    commuteTimeInSeconds:    number;
    modeOfCommute:           string;
}

export interface ZooplaJSONData {
    rental_prices:           RentalPrices;
    country_code:            string;
    num_floors:              string;
    image_150_113_url:       string;
    listing_status:          string;
    num_bedrooms:            string;
    location_is_approximate: number;
    image_50_38_url:         string;
    latitude:                string;
    furnished_state:         string;
    agent_address:           string;
    category:                string;
    property_type:           string;
    longitude:               string;
    thumbnail_url:           string;
    description:             string;
    post_town:               string;
    details_url:             string;
    short_description:       string;
    outcode:                 string;
    image_645_430_url:       string;
    county:                  string;
    price:                   string;
    listing_id:              string;
    image_caption:           string;
    image_80_60_url:         string;
    status:                  string;
    agent_name:              string;
    num_recepts:             string;
    country:                 string;
    first_published_date:    Date;
    displayable_address:     string;
    floor_plan:              string[];
    street_name:             string;
    num_bathrooms:           string;
    agent_logo:              string;
    price_change:            PriceChange[];
    agent_phone:             string;
    image_354_255_url:       string;
    image_url:               string;
    last_published_date:     Date;
    price_change_summary:    PriceChangeSummary;
}

export interface PriceChange {
    direction: string;
    date:      Date;
    percent:   string;
    price:     string;
}

export interface PriceChangeSummary {
    direction:         string;
    percent:           string;
    last_updated_date: Date;
}

export interface RentalPrices {
    shared_occupancy: string;
    per_week:         number;
    accurate:         string;
    per_month:        number;
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
