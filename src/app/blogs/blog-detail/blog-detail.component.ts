import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {

  constructor(private actRoute:ActivatedRoute,
    private service:AuthServiceService,
    private route:Router) { }
  blog;
  blogId;
  show:boolean=false;
  imageurl="";
  ngOnInit(): void {

    this.actRoute.queryParams.subscribe(params => {
      this.blogId=params.page;
      this.getBlogData(params.page);
    });
  }
  getBlogData(id){
    this.show=true;
    this.service.getResourceById(id).subscribe((res)=>{
      console.log(res);
      this.blog = res.body;
      this.imageurl=this.blog.thumbnailImageUrl
      this.show=false;
    })
  }
  editBlogRoute(){
    this.route.navigate(['/blog-edit'],{queryParams:{page:this.blogId}});
  }
}
