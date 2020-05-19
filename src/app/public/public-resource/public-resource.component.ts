import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service';
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
  // restags:string='';

  constructor(private authService: AuthServiceService, private router1: ActivatedRoute) {}
  show = false;
  ngOnInit(): void {
    this.show = true;
    this.router1.queryParams.subscribe((params) => {
      this.token = 'Bearer ' + params.token;
      this.getResourceData(params.page);
    });
  }
  getResourceData(id) {
    this.authService.getPublicResourceById(id, this.token).subscribe((res) => {
      this.resourceData = res.body;
      this.show = false;

      this.resourceTags = this.resourceData.resourceTags;

      // this.resourceTags.forEach((value,index)=>{
      //   if(index!=this.resourceTags.length-1)
      //   this.restags=this.restags+value.name + ','
      // })
    });
  }
}
