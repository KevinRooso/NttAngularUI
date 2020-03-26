import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-case-studies',
  templateUrl: './case-studies.component.html',
  styleUrls: ['./case-studies.component.css']
})
export class CaseStudiesComponent implements OnInit {

  cases;
  filterCases=new BehaviorSubject<any[]>([]);
  searchFilterData;
  searchCases;
  categoryList:any[]=[];
  cat:string="";
  constructor(private service:AuthServiceService,private router:Router) { }

  caseStudies:any[]=[];
  caseid;
  ngOnInit(): void {
    this.getCasestudies();
  }
  getCasestudies(){
    this.service.getCasestudies().subscribe(res=>{
      console.log(res);
      this.caseid=res.body.id;
        this.caseStudies=res.body;
        this.filterCases=res.body;
      this.cases=res.body;
      this.searchFilterData=res.body;
    })
  }
  viewCases(id){
    this.router.navigate(['view-cases'],{queryParams:{page:id}})
  }
  getAllCategory(){
    this.service.getCategoryList().subscribe(res=>{
      console.log(res);
      this.categoryList=res.body;
    });
  }
  getDataWithCat(){
    this.filterCases=this.cases;
    this.filterCases=this.cases.filter(m=>{
       return m.category.id==this.cat;
    })
    this.searchFilterData=this.filterCases;
  }
  blogSearch(){
    console.log(this.filterCases);
      this.filterCases=this.searchFilterData.filter(m=>{
        console.log( m.title);
        console.log( this.searchCases);
        //return m.title.includes(this.searchBlog);
        let titleData=m.title.toUpperCase();
        return titleData.includes(this.searchCases.toUpperCase());
      })
  }
}
