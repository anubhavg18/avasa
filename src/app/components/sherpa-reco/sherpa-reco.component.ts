import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile/profile.service';

@Component({
  selector: 'app-sherpa-reco',
  templateUrl: './sherpa-reco.component.html',
  styleUrls: ['./sherpa-reco.component.css']
})
export class SherpaRecoComponent implements OnInit {

	recodata: any;
  detaildiv: any;
  defaultdiv: any;
  detaildata: any;
  disp_add: any;
  dis_img: any;
  rentalprice: any;
  num_bedrooms: any;
  num_bathrooms: any;
  questions: any;

  constructor(private profileService : ProfileService) { }

  ngOnInit() {
  	this.profileService.getrecodata().subscribe(res => {
  		this.recodata = res['Result']['notifications'];
      console.log(res);
  	});
    this.defaultdiv = 'defaultdiv';
  }

  detailpage(proid,id){
    this.defaultdiv = '';
    this.profileService.getsherpadetail(proid,id).subscribe(res =>{
      this.questions = res['Result']['questions'];
      // console.log(this.questions);
      this.disp_add = res['Result']['zooplaJsonData']['displayable_address'];
      this.dis_img = res['Result']['zooplaJsonData']['image_url'];
      this.rentalprice = res['Result']['zooplaJsonData']['rental_prices']['per_month'];
      this.num_bedrooms = res['Result']['zooplaJsonData']['num_bathrooms'];
      this.num_bathrooms = res['Result']['zooplaJsonData']['num_bathrooms'];
    })
    this.detaildiv = 'detaildiv';
  }

}
