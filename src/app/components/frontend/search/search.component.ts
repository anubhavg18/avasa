import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  infoMessage = '';
  constructor(private router:Router) { }

  ngOnInit() {
    this.router.routerState.root.queryParams
      .subscribe(params => {
        if(params.login !== undefined && params.login === 'true') {
            this.infoMessage = 'Registration Successful! Please Login!';
        }
      });
 
  }


}
