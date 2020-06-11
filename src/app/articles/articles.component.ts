import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
})
export class ArticlesComponent implements OnInit {
  articleList: any;
  blogs;
  // filterBlogs=new BehaviorSubject<any[]>([]);
  filterBlogs: any[] = [];
  searchFilterData;
  searchBlog = '';
  categoryList: any[] = [];
  cat = '';
  filterDate = '';
  dates: any[] = [];
  sort = 'desc?date';
  publishedList: any[] = [];
  draftList: any[] = [];
  publishedList1: any[] = [];
  draftList1: any[] = [];
  constructor(private authService: AuthServiceService, private router: Router) {}

  ngOnInit(): void {
    this.getAllArticleList();
  }

  getAllArticleList() {
    this.authService.getAllArticle().subscribe((res) => {
      this.articleList = res.body;

      this.filterBlogs = res.body;
      this.blogs = res.body;
      this.searchFilterData = res.body;
      this.getAllCategory();
      this.searchFilterData.sort(this.GFG_sortFunction1);
      res.body.filter((m) => {
        if (this.dates.indexOf(m.createdAt.substring(0, 10).split('-').reverse().join('/')) === -1) {
          this.dates.push(m.createdAt.substring(0, 10).split('-').reverse().join('/'));
        }
      });
      this.publishedList = this.articleList.filter((m) => {
        return m.isPublish;
      });
      this.publishedList1 = this.publishedList;

      this.draftList = this.articleList.filter((m) => {
        return !m.isPublish && m.isDraft;
      });
      this.draftList1 = this.draftList;
    });
  }
  getDetails(id) {
    // alert(id);
    this.router.navigate(['/article-details'], { queryParams: { page: id } });
  }
  // showBlogDetail(id){
  //   this.router.navigate(['/blog-detail'], { queryParams: { page: id } });
  // }
  getAllCategory() {
    this.authService.getCategoryList().subscribe((res) => {
      this.categoryList = res.body;
    });
  }
  getDataWithCat() {
    this.filterBlogs = this.blogs.filter((m) => {
      return m.categoryName === this.cat;
    });
    this.searchFilterData = this.filterBlogs;
  }
  getDataWithDate() {
    this.filterBlogs = this.searchFilterData.filter((m) => {
      const titleData = m.createdAt;
      const d = this.filterDate.split('/').reverse().join('-');

      return titleData.includes(d);
    });
  }
  blogSearch() {
    this.publishedList = this.publishedList.filter((m) => {
      // return m.title.includes(this.searchBlog);
      const titleData = m.title.toUpperCase();
      return titleData.includes(this.searchBlog.toUpperCase());
    });
    this.draftList = this.draftList.filter((m) => {
      // return m.title.includes(this.searchBlog);
      const titleData = m.title.toUpperCase();
      return titleData.includes(this.searchBlog.toUpperCase());
    });
    if (this.searchBlog === '') {
      this.publishedList = this.publishedList1;
      this.draftList = this.draftList1;
    }
  }
  cancel() {
    this.publishedList = this.publishedList1;
    this.draftList = this.draftList1;
  }

  filterData() {
    const data = this.sort.split('?');
    if (this.sort === 'Sort By') {
      this.filterBlogs = this.blogs;
    }

    if (data[1] === 'date') {
      if (data[0] === 'asc') {
        //   console.log("adtesort==",this.searchFilterData);
        // this.searchFilterData.sort(this.GFG_sortFunction);
        this.publishedList.sort(this.GFG_sortFunction);
        this.draftList.sort(this.GFG_sortFunction);
        // console.log("dateaftersort==",this.searchFilterData);

        // this.filterBlogs = this.searchFilterData;
      } else {
        // this.searchFilterData.sort(this.GFG_sortFunction1);
        // console.log("dateaftersort==",this.searchFilterData);
        // this.filterBlogs = this.searchFilterData;
        this.publishedList.sort(this.GFG_sortFunction1);
        this.draftList.sort(this.GFG_sortFunction1);
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

  // GFG_sortFunctionc(a, b) {
  //   var dateA = new Date(a.createdAt).getTime();
  //   var dateB = new Date(b.createdAt).getTime();
  //   return dateA > dateB ? 1 : -1;
  // };
  // GFG_sortFunctionc1(a, b) {
  // var dateA = new Date(a.createdAt).getTime();
  // var dateB = new Date(b.createdAt).getTime();
  // return dateA < dateB ? 1 : -1;
  // }
}
