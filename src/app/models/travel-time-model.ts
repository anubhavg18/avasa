// Request Models for Travel Time App Request
export interface travelTimeAppRequestFormat {
    app_key: string;
    app_id: string;
    format: string;
    smooth: boolean;
    targets: { [key: string]: Target };
    shapes: {};
    // shapes: string;
    intersections: { [key: string]: Intersection };
    unions: {};
 }
 
 export class Target {
    arrival_time: Date;
    travel_time: number;
    mode: string;
    coords: number[];
 }
 
 export interface Intersection {
    targets: string[];
    max_points: number;
 }
 
 export interface Shape {
    max_points: number;
 }
 
 export interface TravelResponse {
    accuracy: any;
    shape: any;
 }
 
 
 // Response
 export interface Envelope {
    min_lon: number;
    max_lon: number;
    min_lat: number;
    max_lat: number;
 }
 
 export interface Box {
    min_lon: number;
    max_lon: number;
    min_lat: number;
    max_lat: number;
 }
 
 export interface Intersection1 {
    envelope: Envelope;
    boxes: Box[];
 }
 
 export interface Results {
    intersection1: Intersection1[];
 }
 
 // export interface TargetErrors {
 // }
 
 export interface TravelTimeRootObject {
    results: Results;
    //  target-errors: TargetErrors;
 }
 