import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile/profile.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  userEmail : any;
  confpass: any;
  userpass: any;

  constructor(private profileService : ProfileService,private router:Router) { }

  ngOnInit() {
  }

  updatepass(){
  	this.profileService.updatePass(this.userEmail,this.confpass,this.userpass)
  	.subscribe(res => {
  		if(res['Result'] == true){
  			alert('Password updated succefully');
  			this.router.navigateByUrl('/');
  		}
  	});
  }

}
