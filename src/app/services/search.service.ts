import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public searchCriteria :any;
  private dataSource = new BehaviorSubject(this.searchCriteria);
  currentMessage = this.dataSource.asObservable();

  changeMessage(searchCriteria) {
    this.dataSource.next(searchCriteria);
    // console.log(searchCriteria)
  }


  constructor() {
  }
}
