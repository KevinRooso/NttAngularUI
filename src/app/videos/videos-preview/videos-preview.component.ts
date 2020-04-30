import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthServiceService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-videos-preview',
  templateUrl: './videos-preview.component.html',
  styleUrls: ['./videos-preview.component.css'],
})
export class VideosPreviewComponent implements OnInit {
  videoList: any;
  blogs;
  // filterBlogs=new BehaviorSubject<any[]>([]);
  filterBlogs: any[] = [];
  searchFilterData;
  searchBlog = '';
  categoryList: any[] = [];
  cat: string='cat';
  constructor(private authService: AuthServiceService, private router: Router) {}

  ngOnInit(): void {
    this.getAllVideos();
  }

  getAllVideos() {
    this.authService.getAllVideosList().subscribe((res) => {
      this.videoList = res.body;
      this.filterBlogs = res.body;
      this.blogs = res.body;
      this.searchFilterData = res.body;
      this.getAllCategory();
    });
  }
  getDetails(id) {
    // alert(id);
    this.router.navigate(['/videos-detail'], { queryParams: { page: id } });
  }
  // showBlogDetail(id){
  //   this.router.navigate(['/blog-detail'], { queryParams: { page: id } });
  // }
  getAllCategory() {
    this.authService.getCategoryList().subscribe((res) => {
      let catList: any[]=[];
      catList = res.body;
      catList.forEach(m=>{
        for(let i=0;i<this.filterBlogs.length;i++){
          if(m.id === this.filterBlogs[i].category.id)
            {
             this.categoryList.push(m);
              break;
            }
        }
      })
    });
  }
  getDataWithCat() {
    this.filterBlogs = this.blogs;
    if(this.cat === 'cat'){
      this.filterBlogs = this.blogs;
      return false;
    }
    this.filterBlogs = this.blogs.filter((m) => {
      return m.category.id.toString() === this.cat;
    });
    this.searchFilterData = this.filterBlogs;
  }
  blogSearch() {
    this.filterBlogs = this.searchFilterData.filter((m) => {
      // alert(m.title.toUpperCase());
      // alert(this.searchBlog.toUpperCase());
      const titleData = m.title.toUpperCase();
      return titleData.includes(this.searchBlog.toUpperCase());
    });
  }
  cancel() {
    this.filterBlogs = this.blogs;
  }
}
