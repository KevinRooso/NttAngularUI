import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {

  constructor(private actRoute:ActivatedRoute,private service:AuthServiceService) { }
  blog;
  ngOnInit(): void {
    this.actRoute.queryParams.subscribe(params => {
      this.getBlogData(params.page);
    });
  }
  getBlogData(id){
    this.service.getResourceById(id).subscribe((res)=>{
      this.blog = res.body;

    })
  }
}
