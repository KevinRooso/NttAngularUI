import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-public-resource',
  templateUrl: './public-resource.component.html',
  styleUrls: ['./public-resource.component.css'],
})
export class PublicResourceComponent implements OnInit {
  resourceData: any;
  resourceTags: any[] = [];
  token: string;
  resourceObj: string;
  flag = false;
  flag2 = false;
  // restags:string='';

  constructor(private router1: ActivatedRoute) {}
  show = false;
  ngOnInit(): void {
    this.show = true;
    this.router1.queryParams.subscribe((params) => {
      if (params.hasOwnProperty('resourceJson')) {
        const resourceURL = decodeURIComponent(params.resourceJson);
        this.resourceObj = JSON.parse(resourceURL);
        this.getResourceData();
        this.flag = true;
      } else {
        this.flag2 = true;
      }
    });
  }
  getResourceData() {
    this.resourceData = this.resourceObj;
    this.show = false;

    this.resourceTags = this.resourceData.resourceTags;

    // this.resourceTags.forEach((value,index)=>{
    //   if(index!=this.resourceTags.length-1)
    //   this.restags=this.restags+value.name + ','
    // })
  }
}
