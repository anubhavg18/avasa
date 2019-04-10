// To parse this data:
//
  // import { Convert, ZooplaListingModel } from "./file";
//
  // const zooplaListingModel = Convert.toZooplaListingModel(json);

  export interface ZooplaListingModel {
    result_count: number;
    longitude:    number;
    area_name:    string;
    listing:      Listing[];
    street:       string;
    town:         string;
    latitude:     number;
    county:       string;
    bounding_box: BoundingBox;
    postcode:     string;
  }
  
  export interface BoundingBox {
    longitude_min: string;
    latitude_min:  string;
    longitude_max: string;
    latitude_max:  string;
  }
  
  export interface Listing {
    rental_prices:           RentalPrices;
    country_code:            string;
    num_floors:              string;
    image_150_113_url:       string;
    listing_status:          string;
    num_bedrooms:            string;
    location_is_approximate: number;
    image_50_38_url:         string;
    latitude:                number;
    furnished_state:         string;
    agent_address:           string;
    category:                string;
    property_type:           string;
    longitude:               number;
    thumbnail_url:           string;
    description:             string;
    post_town:               string;
    details_url:             string;
    short_description:       string;
    outcode:                 string;
    image_645_430_url:       string;
    county:                  string;
    price:                   string;
    available_from_date:     string;
    listing_id:              string;
    image_caption:           string;
    image_80_60_url:         string;
    status:                  string;
    agent_name:              string;
    num_recepts:             string;
    country:                 string;
    first_published_date:    string;
    displayable_address:     string;
    floor_plan:              string[];
    street_name:             string;
    num_bathrooms:           string;
    agent_logo:              string;
    price_change:            PriceChange[];
    agent_phone:             string;
    image_354_255_url:       string;
    image_url:               string;
    last_published_date:     string;
  }
  
  export interface PriceChange {
    direction: string;
    date:      string;
    percent:   string;
    price:     string;
  }
  
  export interface RentalPrices {
    shared_occupancy: string;
    per_week:         number;
    accurate:         string;
    per_month:        number;
  }
  
  // Converts JSON strings to/from your types
    export namespace ConvertZoopla {
      export function toZooplaListingModel(json: string): ZooplaListingModel {
          return JSON.parse(json);
      }
  
    export function zooplaListingModelToJson(value: ZooplaListingModel): string {
        return JSON.stringify(value);
    }
  }
  