import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-list-cloud-services',
  templateUrl: './list-cloud-services.component.html',
  styleUrls: ['./list-cloud-services.component.css'],
})
export class ListCloudServicesComponent implements OnInit {
  constructor(private router: Router,
    private service:AuthServiceService,
    private router1:ActivatedRoute) {}

  serviceData:any[]=[];
  detailPage:boolean=false;
  detailData:any={};
  parent:any=null;
  bradArray:any[]=[];
  ngOnInit(): void {
    this.router1.queryParams.subscribe((params) => {
       console.log("data=",params);
       console.log("data=",JSON.parse(params.page));
      if((Object.keys(params).length === 0 && params.constructor === Object) || JSON.parse(params.page)==null){
        this.getAllData();

      }
      else{

        this.bradArray=JSON.parse(params.page1);
        console.log("jsonnn",JSON.parse(params.page1));

        if(JSON.parse(params.page)!=null)
        this.getDetailData(JSON.parse(params.page));
      }

    });


  }
  getAllData(){
    this.bradArray=[];
    this.service.getProductAndService(0).subscribe(res=>{
      console.log("res=",res);
      this.detailPage=false;
      this.serviceData=res.body;
      if(this.serviceData.length==1 && this.serviceData[0].isLastService){
        this.detailPage=true;
        this.parent=this.serviceData[0];
        this.detailData=this.serviceData[0];
      }
    })
  }
  openSubmitModel(){
    console.log("obj=",this.parent);
      let obj={
        'page':JSON.stringify(this.parent),
            'page1':JSON.stringify(this.bradArray),
            'page2':JSON.stringify(null)
      }
    let navigationExtras: NavigationExtras = {
      queryParams: obj
  };
  this.router.navigate(['cloud-service-form'], navigationExtras);
  }
  getDetailData(obj){
    this.parent=obj;
    this.detailPage=false;
    this.bradArray.push(obj);
    let newArr=this.bradArray;
    this.bradArray=[];
    for(let i=0;i<newArr.length;i++){
        if(obj.id==newArr[i].id){
          this.bradArray.push(newArr[i]);
        break;
        }
        else
        this.bradArray.push(newArr[i]);
    }
    if(obj.isLastService){
      this.detailPage=true;
      this.detailData=obj;
    }
    else
    this.service.getProductAndService(obj.id).subscribe(res=>{
      this.serviceData=res.body;
      console.log("res=",this.serviceData);
    })
  }
  editForm(data){
    console.log("obj=",this.parent);
      let obj={
            'page':JSON.stringify(this.parent),
            'page1':JSON.stringify(this.bradArray),
            'page2':JSON.stringify(data)
      }
    let navigationExtras: NavigationExtras = {
      queryParams: obj
  };
  this.router.navigate(['cloud-service-form'], navigationExtras);
  }
}
