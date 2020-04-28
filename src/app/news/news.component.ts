import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthServiceService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit {
  newsList: any;
  blogs;
  filterBlogs = new BehaviorSubject<any[]>([]);
  searchFilterData;
  searchBlog = '';
  dates: any[] = [];
  cat = '';
  sort = 'desc?date';
  constructor(private authService: AuthServiceService, private router: Router) {}

  ngOnInit(): void {
    this.getAllnews();

    this.getAllCategory();
  }

  getAllnews() {
    this.authService.getAllNews().subscribe((res) => {
      this.newsList = res.body;
      this.filterBlogs = res.body;
      this.filterBlogs = res.body;
      this.blogs = res.body;
      this.searchFilterData = res.body;
      this.searchFilterData.sort(this.GFG_sortFunction1);
    });
  }
  getDetails(id) {
    this.router.navigate(['/view-news'], { queryParams: { page: id } });
  }
  // showBlogDetail(id){
  //   this.router.navigate(['/blog-detail'], { queryParams: { page: id } });
  // }
  getAllCategory() {
    this.authService.getDates().subscribe((res) => {
      this.dates = res.body;
    });
  }
  getDataWithCat() {
    this.filterBlogs = this.blogs;
    this.filterBlogs = this.blogs.filter((m) => {
      return m.year === this.cat;
    });
    this.searchFilterData = this.filterBlogs;
  }
  blogSearch() {
    this.newsList = this.searchFilterData.filter((m) => {
      const titleData = m.title.toUpperCase();
      return titleData.includes(this.searchBlog.toUpperCase());
    });
  }
  cancel() {
    this.newsList = this.blogs;
  }
  filterData() {
    const data = this.sort.split('?');
    if (this.sort === 'Sort By') {
      this.filterBlogs = this.blogs;
    }

    if (data[1] === 'date') {
      if (data[0] === 'asc') {
        //   console.log("adtesort==",this.searchFilterData);
        this.searchFilterData.sort(this.GFG_sortFunction);
        // console.log("dateaftersort==",this.searchFilterData);

        this.filterBlogs = this.searchFilterData;
      } else {
        this.searchFilterData.sort(this.GFG_sortFunction1);
        // console.log("dateaftersort==",this.searchFilterData);
        this.filterBlogs = this.searchFilterData;
      }
    }
  }
  GFG_sortFunction(a, b) {
    const dateA = new Date(a.updatedAt).getTime();
    const dateB = new Date(b.updatedAt).getTime();
    return dateA > dateB ? 1 : -1;
  }
  GFG_sortFunction1(a, b) {
    const dateA = new Date(a.updatedAt).getTime();
    const dateB = new Date(b.updatedAt).getTime();
    return dateA < dateB ? 1 : -1;
  }
}
