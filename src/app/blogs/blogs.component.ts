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
  cat: string="cat";
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
    });
  }
  showBlogDetail(id) {
    this.router.navigate(['/blog-detail'], { queryParams: { page: id } });
  }
  getAllCategory() {
    this.service.getCategoryList().subscribe((res) => {
      let catList:any[]=[];
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
    if (this.cat === 'cat') {
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
      // return m.title.includes(this.searchBlog);
      const titleData = m.title.toUpperCase();
      return titleData.includes(this.searchBlog.toUpperCase()) || m.shortDescription.toUpperCase().includes(this.searchBlog.toUpperCase());
    });
  }
  cancel() {
    this.filterBlogs = this.blogs;
  }
}
