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
  cat = 'cat';
  publishList: any[] = [];
  draftList: any[] = [];
  publishList1: any[] = [];
  draftList1: any[] = [];
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

      this.publishList = this.videoList.filter((a) => {
        return a.isPublish;
      });
      this.publishList1 = this.publishList;
      this.draftList = this.videoList.filter((a) => {
        return !a.isPublish && a.isDraft;
      });
      this.draftList1 = this.draftList;
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
      let catList: any[] = [];
      catList = res.body;
      catList.forEach((m) => {
        for (let i = 0; i < this.filterBlogs.length; i++) {
          if (this.filterBlogs[i].category !== null) {
            if (m.id === this.filterBlogs[i].category.id) {
              this.categoryList.push(m);
              break;
            }
          }
        }
      });
    });
  }
  getDataWithCat() {
    this.publishList = this.publishList1;
    this.draftList = this.draftList1;
    this.filterBlogs = this.blogs;
    if (this.cat === 'cat') {
      this.publishList = this.publishList1;
      this.draftList = this.draftList1;
    } else {
      this.publishList = this.publishList.filter((m) => {
        if (m.category !== null) {
          return m.category.id.toString() === this.cat;
        }
      });
      this.draftList = this.draftList.filter((m) => {
        if (m.category !== null) {
          return m.category.id.toString() === this.cat;
        }
      });
    }
  }
  blogSearch() {
    this.publishList = this.publishList.filter((m) => {
      // alert(m.title.toUpperCase());
      // alert(this.searchBlog.toUpperCase());
      const titleData = m.title.toUpperCase();
      return titleData.includes(this.searchBlog.toUpperCase());
    });
    this.draftList = this.draftList.filter((m) => {
      // alert(m.title.toUpperCase());
      // alert(this.searchBlog.toUpperCase());
      const titleData = m.title.toUpperCase();
      return titleData.includes(this.searchBlog.toUpperCase());
    });
  }
  cancel() {
    this.publishList = this.publishList1;
    this.draftList = this.draftList1;
  }
}
