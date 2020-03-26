import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthServiceService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  videoList: any;
  blogs;
  filterBlogs=new BehaviorSubject<any[]>([]);
  searchFilterData;
  searchBlog="";
  dates:any[]=[];
  cat:string="";
  constructor( private authService: AuthServiceService, private router:Router) { }

  ngOnInit(): void {
    this.getAllnews();

    this.getAllCategory();
  }

  getAllnews(){
    this.authService.getAllNews().subscribe((res)=>{
      this.videoList = res.body;
      console.log("res", this.videoList);
      this.filterBlogs=res.body;
      this.blogs=res.body;
      this.searchFilterData=res.body;
    })
  }
  getDetails(id) {
    // alert(id);
    this.router.navigate(['/view-news'], { queryParams: { page: id } });
  }
  // showBlogDetail(id){
  //   this.router.navigate(['/blog-detail'], { queryParams: { page: id } });
  // }
  getAllCategory(){
    this.authService.getDates().subscribe(res=>{
      console.log(res);
      this.dates=res.body;
    });
  }
  getDataWithCat(){
    this.filterBlogs=this.blogs;
    this.filterBlogs=this.blogs.filter(m=>{
      console.log(this.cat);
       return m.year==this.cat;
    })
    this.searchFilterData=this.filterBlogs;
  }
  blogSearch(){
    console.log(this.filterBlogs);
      this.filterBlogs=this.searchFilterData.filter(m=>{
        console.log( m.title);
        console.log( this.searchBlog);
        // alert(m.title.toUpperCase());
        // alert(this.searchBlog.toUpperCase());
        let titleData=m.title.toUpperCase();
        return titleData.includes(this.searchBlog.toUpperCase());
      })
  }
}
