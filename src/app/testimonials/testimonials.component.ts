import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css'],
})
export class TestimonialsComponent implements OnInit {
  testimonials: any[] = [];
  blogs;
  // filterBlogs=new BehaviorSubject<any[]>([]);
  filterBlogs: any[] = [];
  searchFilterData;
  searchBlog;
  categoryList: any[] = [];
  cat = '';
  searchTests = '';
  constructor(private service: AuthServiceService, private router: Router) {}

  ngOnInit(): void {
    this.getTestimonials();
  }
  getTestimonials() {
    this.service.getAllTestimonials().subscribe((res) => {
      this.filterBlogs = res.body;
      this.blogs = res.body;
      this.searchFilterData = res.body;

      this.getAllCategory();
    });
  }
  viewTestimonials(id) {
    this.router.navigate(['view-testimonials'], { queryParams: { page: id } });
  }
  getAllCategory() {
    this.service.getCategoryListByGroup('Resources').subscribe((res) => {
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
    this.filterBlogs = this.searchFilterData.filter((m) => {
      // return m.title.includes(this.searchBlog);
      const titleData = m.title.toUpperCase();
      return titleData.includes(this.searchTests.toUpperCase().trimRight());
    });
  }
  cancel() {
    this.filterBlogs = this.blogs;
  }
  editTest(id) {
    this.router.navigate(['/resources/testimonials/create-testimonials', id]);
  }
}
