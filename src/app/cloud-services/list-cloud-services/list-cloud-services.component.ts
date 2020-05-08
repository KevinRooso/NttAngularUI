import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-list-cloud-services',
  templateUrl: './list-cloud-services.component.html',
  styleUrls: ['./list-cloud-services.component.css'],
})
export class ListCloudServicesComponent implements OnInit {
  constructor(private router: Router, private service: AuthServiceService, private router1: ActivatedRoute) {}

  serviceData: any[] = [];
  detailPage = false;
  detailData: any = {};
  parent: any = null;
  bradArray: any[] = [];
  show = false;
  ngOnInit(): void {
    this.show = true;
    this.router1.queryParams.subscribe((params) => {
      if ((Object.keys(params).length === 0 && params.constructor === Object) || JSON.parse(params.page) == null) {
        this.getAllData();
      } else {
        this.bradArray = JSON.parse(params.page1);

        if (JSON.parse(params.page) != null) {
          this.getDetailData(JSON.parse(params.page));
        }
      }
      this.show = false;
    });
  }
  getAllData() {
    this.bradArray = [];
    this.parent = null;
    this.show = true;
    this.service.getProductAndService(0).subscribe(
      (res) => {
        this.detailPage = false;
        this.serviceData = res.body;
        if (this.serviceData.length === 1 && this.serviceData[0].isLastService) {
          this.detailPage = true;
          this.parent = this.serviceData[0];
          this.detailData = this.serviceData[0];
        }
        this.show = false;
      },
      (_error) => {
        this.show = false;
      }
    );
  }
  openSubmitModel() {
    const obj = {
      page: JSON.stringify(this.parent),
      page1: JSON.stringify(this.bradArray),
      page2: JSON.stringify(null),
    };
    const navigationExtras: NavigationExtras = {
      queryParams: obj,
      skipLocationChange: true,
    };
    this.router.navigate(['cloud-service-form'], navigationExtras);
  }
  getDetailData(obj) {
    this.parent = obj;
    this.detailPage = false;
    this.bradArray.push(obj);
    const newArr = this.bradArray;
    this.bradArray = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < newArr.length; i++) {
      if (obj.id === newArr[i].id) {
        this.bradArray.push(newArr[i]);
        break;
      } else {
        this.bradArray.push(newArr[i]);
      }
    }
    if (obj.isLastService) {
      this.detailPage = true;
      this.detailData = obj;
    } else {
      this.service.getProductAndService(obj.id).subscribe((res) => {
        this.serviceData = res.body;
      });
    }
  }
  editForm(data) {
    const obj = {
      page: JSON.stringify(this.parent),
      page1: JSON.stringify(this.bradArray),
      page2: JSON.stringify(data),
    };
    const navigationExtras: NavigationExtras = {
      queryParams: obj,
      skipLocationChange: true,
    };
    this.router.navigate(['cloud-service-form'], navigationExtras);
  }
  deleteData(data){
      this.service.deleteService(data.id).subscribe(_res=>{
        this.serviceData=this.serviceData.filter(m=>m.id !== data.id);
      })
  }
}
