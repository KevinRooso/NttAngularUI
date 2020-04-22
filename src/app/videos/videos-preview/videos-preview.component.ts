import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthServiceService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-videos-preview',
  templateUrl: './videos-preview.component.html',
  styleUrls: ['./videos-preview.component.css']
})
export class VideosPreviewComponent implements OnInit {

  videoList: any;
  blogs;
  // filterBlogs=new BehaviorSubject<any[]>([]);
  filterBlogs:any[]=[];
  searchFilterData;
  searchBlog='';
  categoryList:any[]=[];
  cat='';
  constructor( private authService: AuthServiceService, private router:Router) { }

  ngOnInit(): void {
    this.getAllVideos();

    this.getAllCategory();
  }

  getAllVideos(){
    this.authService.getAllVideosList().subscribe((res)=>{
      this.videoList = res.body;
      console.log('res', this.videoList);
      this.filterBlogs=res.body;
      this.blogs=res.body;
      this.searchFilterData=res.body;
    })
  }
  getDetails(id) {
    // alert(id);
    this.router.navigate(['/videos-detail'], { queryParams: { page: id } });
  }
  // showBlogDetail(id){
  //   this.router.navigate(['/blog-detail'], { queryParams: { page: id } });
  // }
  getAllCategory(){
    this.authService.getCategoryList().subscribe(res=>{
      console.log(res);
      this.categoryList=res.body;
    });
  }
  getDataWithCat(){
    this.filterBlogs=this.blogs;
    this.filterBlogs=this.blogs.filter(m=>{
      console.log(m.category.id);
      console.log(this.cat);
       return m.category.id==this.cat;
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
        const titleData=m.title.toUpperCase();
        return titleData.includes(this.searchBlog.toUpperCase());
      })
  }
  cancel(){
    this.filterBlogs= this.blogs;
  }
}
