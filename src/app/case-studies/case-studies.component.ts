import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-case-studies',
  templateUrl: './case-studies.component.html',
  styleUrls: ['./case-studies.component.css'],
})
export class CaseStudiesComponent implements OnInit {
  cases;
  // filterCases=new BehaviorSubject<any[]>([]);
  filterCases: any[] = [];
  searchFilterData;
  searchCases;
  categoryList: any[] = [];
  cat = '';
  tag = '';
  tags: any[] = [];
  constructor(private service: AuthServiceService, private router: Router) {}

  caseStudies: any[] = [];
  caseid;
  ngOnInit(): void {
    this.getCasestudies();
    this.getAllCategory();
    this.getTags();
  }
  getCasestudies() {
    this.service.getCasestudies().subscribe((res) => {
      this.caseid = res.body.id;
      this.caseStudies = res.body;
      this.filterCases = res.body;
      this.cases = res.body;
      this.searchFilterData = res.body;
    });
  }
  getTags() {
    this.service.getTagsList().subscribe((res) => {
      this.tags = res.body;
    });
  }
  viewCases(id) {
    this.router.navigate(['view-cases'], { queryParams: { page: id } });
  }
  getAllCategory() {
    this.service.getCategoryList().subscribe((res) => {
      this.categoryList = res.body;
    });
  }
  getDataWithCat() {
    this.filterCases = this.cases;
    this.filterCases = this.cases.filter((m) => {
      return m.category.id === this.cat;
    });
    this.searchFilterData = this.filterCases;
  }
  blogSearch() {
    this.filterCases = this.searchFilterData.filter((m) => {
      // return m.title.includes(this.searchBlog);
      const titleData = m.title.toUpperCase();
      return titleData.includes(this.searchCases.toUpperCase());
    });
  }
  getDataWithTag() {
    this.filterCases = this.searchFilterData.filter((m) => {
      let flag = false;
      m.resourceTags.forEach((ele) => {
        if (ele.id === this.tag) {
          flag = true;
        }
      });
      return flag;
    });
  }

  cancel() {
    this.filterCases = this.cases;
  }
}
