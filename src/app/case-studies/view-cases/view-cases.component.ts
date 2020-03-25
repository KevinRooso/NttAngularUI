import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-view-cases',
  templateUrl: './view-cases.component.html',
  styleUrls: ['./view-cases.component.css']
})
export class ViewCasesComponent implements OnInit {

  constructor(private actRoute:ActivatedRoute,
    private service:AuthServiceService,
    private route:Router) { }
  cases;
  caseId;
  ngOnInit(): void {
    this.actRoute.queryParams.subscribe(params => {
      this.caseId=params.page;
      this.getBlogData(params.page);
    });
  }
  getBlogData(id){
    this.service.getResourceById(id).subscribe((res)=>{
      console.log(res);

      this.cases = res.body;

    })
  }
  editcaseRoute(){
    this.route.navigate(['/edit-cases'],{queryParams:{page:this.caseId}});
  }
}
