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
  // cat: string='cat';
  cat: 'cat';
  tag = 'tag';
  tags: any[] = [];
  constructor(private service: AuthServiceService, private router: Router) {}

  caseStudies: any[] = [];
  caseid;
  ngOnInit(): void {
    this.getCasestudies();
  }
  getCasestudies() {
    this.service.getCasestudies().subscribe((res) => {
      this.caseid = res.body.id;
      this.caseStudies = res.body;
      this.filterCases = res.body;
      this.cases = res.body;
      this.searchFilterData = res.body;
      this.getAllCategory();
      this.getTags();
    });
  }
  getTags() {
    this.service.getTagsList().subscribe((res) => {
      let tagList: any[] = [];
      tagList = res.body;
      tagList.forEach((m) => {
        for (let i = 0; i < this.caseStudies.length; i++) {
          for (let j = 0; i < this.caseStudies[i].resourceTags.length; j++) {
            if (m.id === this.caseStudies[i].resourceTags[j].id) {
              this.tags.push(m);
              break;
            }
          }
        }
      });
    });
  }
  viewCases(id) {
    this.router.navigate(['view-cases'], { queryParams: { page: id } });
  }
  getAllCategory() {
    this.service.getCategoryList().subscribe((res) => {
      let catList: any[] = [];
      catList = res.body;
      catList.forEach((m) => {
        for (let i = 0; i < this.caseStudies.length; i++) {
          if (m.id === this.caseStudies[i].category.id) {
            this.categoryList.push(m);
            break;
          }
        }
      });
    });
  }
  getDataWithCat() {
    this.filterCases = this.cases;
    if (this.cat === 'cat') {
      this.filterCases = this.cases;
      return false;
    }
    this.filterCases = this.cases.filter((m) => {
      return m.category.id.toString() === this.cat;
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
    if (this.tag === 'tag') {
      this.filterCases = this.cases;
      return false;
    }
    this.filterCases = this.searchFilterData.filter((m) => {
      let flag = false;
      m.resourceTags.forEach((ele) => {
        if (ele.id.toString() === this.tag) {
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
