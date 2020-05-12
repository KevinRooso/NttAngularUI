import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
})
export class BlogsComponent implements OnInit {
  blogs;
  filterBlogs: any[] = [];
  searchFilterData;
  searchBlog;
  categoryList: any[] = [];
  cat = 'cat';
  publishedList: any[] = [];
  draftList: any[] = [];
  publishedList1: any[] = [];
  draftList1: any[] = [];
  constructor(private service: AuthServiceService, private router: Router) {}

  ngOnInit(): void {
    this.getBlogs();
  }
  getBlogs() {
    this.service.getAllBlogs().subscribe((res) => {
      this.filterBlogs = res.body;

      this.blogs = res.body;
      this.searchFilterData = res.body;
      this.getAllCategory();
      this.publishedList = this.filterBlogs.filter((m) => {
        return m.isPublish;
      });
      this.publishedList1 = this.publishedList;
      this.draftList = this.filterBlogs.filter((m) => {
        return !m.isPublish && m.isDraft;
      });
      this.draftList1 = this.draftList;
    });
  }
  showBlogDetail(id) {
    this.router.navigate(['/blog-detail'], { queryParams: { page: id } });
  }
  getAllCategory() {
    this.service.getCategoryList().subscribe((res) => {
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
    this.publishedList=this.publishedList1;
    this.draftList=this.draftList1;
    this.filterBlogs = this.blogs;
    if(this.cat==='cat'){
      this.publishedList=this.publishedList1;
      this.draftList=this.draftList1;
    }
    this.publishedList = this.publishedList.filter((m) => {
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
  blogSearch() {
    this.publishedList = this.publishedList.filter((m) => {
      // return m.title.includes(this.searchBlog);
      const titleData = m.title.toUpperCase();
      return titleData.includes(this.searchBlog.toUpperCase()) || m.shortDescription.toUpperCase().includes(this.searchBlog.toUpperCase());
    });
    this.draftList = this.draftList.filter((m) => {
      // return m.title.includes(this.searchBlog);
      const titleData = m.title.toUpperCase();
      return titleData.includes(this.searchBlog.toUpperCase()) || m.shortDescription.toUpperCase().includes(this.searchBlog.toUpperCase());
    });
  }
  cancel() {
    this.publishedList = this.publishedList1;
    this.draftList = this.draftList1;
  }
}
