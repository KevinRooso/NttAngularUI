import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  blogs;
  filterBlogs:any[]=[];
  searchFilterData;
  searchBlog;
  categoryList:any[]=[];
  cat:string="cat";
  constructor(private service:AuthServiceService,private router:Router) { }

  ngOnInit(): void {
    this.getBlogs();
    this.getAllCategory();
  }
  getBlogs(){
    this.service.getAllBlogs().subscribe(res=>{
      console.log(res);
      this.filterBlogs=res.body;
      this.blogs=res.body;
      this.searchFilterData=res.body;

    })
  }
  showBlogDetail(id){
    this.router.navigate(['/blog-detail'], { queryParams: { page: id } });
  }
  getAllCategory(){
    this.service.getCategoryList().subscribe(res=>{
      console.log(res);
      this.categoryList=res.body;
    });
  }
  getDataWithCat(){
    this.filterBlogs=this.blogs;
    if(this.cat=="cat")
      {
        this.filterBlogs=this.blogs;
        return false;
      }
    this.filterBlogs=this.blogs.filter(m=>{
       return m.category.id==this.cat;
    })
    this.searchFilterData=this.filterBlogs;
  }
  blogSearch(){
    console.log(this.filterBlogs);
      this.filterBlogs=this.searchFilterData.filter(m=>{
        console.log( m.title);
        console.log( this.searchBlog);
        //return m.title.includes(this.searchBlog);
        let titleData=m.title.toUpperCase();
        return titleData.includes(this.searchBlog.toUpperCase()) || m.shortDescription.toUpperCase().includes(this.searchBlog.toUpperCase());
      })
  }
  cancel(){
    this.filterBlogs=this.blogs;
  }
}
