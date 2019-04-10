import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-profilesidebar',
  templateUrl: './profilesidebar.component.html',
  styleUrls: ['./profilesidebar.component.css']
})
export class ProfilesidebarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  routeacount() {
   this.router.navigateByUrl('/useracount');
  }

  routeprofile() {
   this.router.navigateByUrl('/myprofile');
  }

routeserpa() {
   this.router.navigateByUrl('/sherpareco');
  }
routecalender() {
   this.router.navigateByUrl('/mycalender');
  }

}
