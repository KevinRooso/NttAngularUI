import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit {
  testimonials:any[]=[];
  blogs;
  filterBlogs=new BehaviorSubject<any[]>([]);
  searchFilterData;
  searchBlog;
  categoryList:any[]=[];
  cat:string="";
  searchTests;
  constructor(private service:AuthServiceService,
    private router:Router) { }

  ngOnInit(): void {
    this.getTestimonials();
    this.getAllCategory();
  }
  getTestimonials(){
      this.service.getAllTestimonials().subscribe(res=>{
        console.log(res);
          this.filterBlogs=res.body;
      this.blogs=res.body;
      this.searchFilterData=res.body;
      })
  }
  viewTestimonials(id){
    this.router.navigate(['view-testimonials'],{queryParams:{page:id}})
  }
  getAllCategory(){
    this.service.getCategoryList().subscribe(res=>{
      console.log(res);
      this.categoryList=res.body;
    });
  }
  getDataWithCat(){
    this.filterBlogs=this.blogs;
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
        return titleData.includes(this.searchTests.toUpperCase());
      })
  }

}
