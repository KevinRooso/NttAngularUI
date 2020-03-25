import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-case-studies',
  templateUrl: './case-studies.component.html',
  styleUrls: ['./case-studies.component.css']
})
export class CaseStudiesComponent implements OnInit {

  constructor( private service:AuthServiceService,
    private router:Router) { }
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
    })
  }
  viewCases(id){
    this.router.navigate(['view-cases'],{queryParams:{page:id}})
  }
}
