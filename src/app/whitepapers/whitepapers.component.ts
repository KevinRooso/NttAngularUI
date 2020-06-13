import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-whitepapers',
  templateUrl: './whitepapers.component.html',
  styleUrls: ['./whitepapers.component.css'],
})
export class WhitepapersComponent implements OnInit {
  whitePaperList: any;
  blogs;
  filterBlogs: any[] = [];
  searchFilterData;
  searchBlog = '';
  categoryList: any[] = [];
  cat = '';
  publishedList: any[] = [];
  draftList: any[] = [];
  publishedList1: any[] = [];
  draftList1: any[] = [];

  constructor(private authService: AuthServiceService, private router: Router, private location: Location) {}

  ngOnInit(): void {
    this.getAllArticleList();
  }
  getAllArticleList() {
    this.authService.getAllWhitepaper().subscribe((res) => {
      this.whitePaperList = res.body;

      this.filterBlogs = res.body;
      this.blogs = res.body;
      this.getAllCategory();
      this.searchFilterData = res.body;
      this.publishedList = this.whitePaperList.filter((m) => {
        return m.isPublish;
      });
      this.publishedList1 = this.publishedList;
      this.draftList = this.whitePaperList.filter((m) => {
        return !m.isPublish && m.isDraft;
      });
      this.draftList1 = this.draftList;
    });
  }
  getDetails(id) {
    this.router.navigate(['/white-details'], { queryParams: { page: id } });
  }
  getAllCategory() {
    this.authService.getCategoryListByGroup('Resources').subscribe((res) => {
      this.categoryList = res.body;
    });
  }
  getDataWithCat() {
    this.filterBlogs = this.blogs;
    this.filterBlogs = this.blogs.filter((m) => {
      return m.category.id === this.cat;
    });
    this.searchFilterData = this.filterBlogs;
  }
  blogSearch() {
    this.publishedList = this.publishedList.filter((m) => {
      const titleData = m.title.toUpperCase();
      return titleData.includes(this.searchBlog.toUpperCase());
    });
    this.draftList = this.draftList.filter((m) => {
      const titleData = m.title.toUpperCase();
      return titleData.includes(this.searchBlog.toUpperCase());
    });
    if (this.searchBlog === '') {
      this.publishedList = this.publishedList1;
      this.draftList = this.draftList1;
    }
  }
  BackMe() {
    this.location.back(); // <-- go back to previous location on cancel
  }
  cancel() {
    this.publishedList = this.publishedList1;
    this.draftList = this.draftList1;
  }
}
