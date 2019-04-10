import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyDetailsService {

  public propertyDetails :any;
  private dataSource = new BehaviorSubject(this.propertyDetails);
  currentMessage = this.dataSource.asObservable();

  changeMessage(propertyDetails) {
    this.dataSource.next(propertyDetails);

  }

  constructor() {
  }
}