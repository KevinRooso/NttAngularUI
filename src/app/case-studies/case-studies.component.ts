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
  searchCases = null;
  categoryList: any[] = [];
  cat = 'cat';
  tag = 'tag';
  tags: any[] = [];
  publishedList: any[] = [];
  draftList: any[] = [];
  publishedList1: any[] = [];
  draftList1: any[] = [];
  constructor(private service: AuthServiceService, private router: Router) {}

  caseStudies: any[] = [];
  caseid;
  ngOnInit(): void {
    this.getCasestudies();
  }
  getCasestudies() {
    this.service.getCasestudies().subscribe((res) => {
      this.filterCases = res.body;
      this.caseid = res.body.id;
      this.caseStudies = res.body;
      this.cases = res.body;
      this.searchFilterData = res.body;
      this.getAllCategory();
      this.getTags();

      this.publishedList = this.filterCases.filter((m) => {
        return m.isPublish;
      });
      this.publishedList1 = this.publishedList;
      this.draftList = this.filterCases.filter((m) => {
        return !m.isPublish && m.isDraft;
      });
      this.draftList1 = this.draftList;
    });
  }
  getTags() {
    let respoTagList: any[] = [];
    this.caseStudies.forEach((m) => {
      if (m !== null) {
        respoTagList = respoTagList.concat(m.resourceTags);
      }
    });
    respoTagList = respoTagList.filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i);
    this.tags = respoTagList;
  }
  viewCases(id) {
    this.router.navigate(['view-cases'], { queryParams: { page: id } });
  }
  getAllCategory() {
    this.service.getCategoryListByGroup('Resources').subscribe((res) => {
      let catList: any[] = [];
      catList = res.body;
      catList.forEach((m) => {
        for (let i = 0; i < this.caseStudies.length; i++) {
          if (this.caseStudies[i].category !== null) {
            if (m.id === this.caseStudies[i].category.id) {
              this.categoryList.push(m);
              break;
            }
          }
        }
      });
    });
  }
  getDataWithCat() {
    // this.filterCases = this.cases;
    // if (this.cat === 'cat') {
    //   this.filterCases = this.cases;
    //   return false;
    // }
    // this.filterCases = this.cases.filter((m) => {
    //   return m.category.id.toString() === this.cat;
    // });
    // this.searchFilterData = this.filterCases;

    this.publishedList = this.publishedList1;
    this.draftList = this.draftList1;
    this.filterCases = this.cases;
    if (this.cat === 'cat') {
      this.publishedList = this.publishedList1;
      this.draftList = this.draftList1;
    } else {
      this.publishedList = this.publishedList1.filter((m) => {
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
    this.publishedList = this.publishedList.filter((m) => {
      let titleData = '';
      if (m.title) {
        titleData = m.title.toUpperCase();
      }
      if (this.searchCases) {
        return titleData.includes(this.searchCases.toUpperCase().trimRight());
      }
    });
    this.draftList = this.draftList.filter((m) => {
      let titleData = '';
      if (m.title) {
        titleData = m.title.toUpperCase();
      }
      if (this.searchCases) {
        return titleData.includes(this.searchCases.toUpperCase().trimRight());
      }
    });
    if (this.searchCases === '' || this.searchCases === null) {
      this.publishedList = this.publishedList1;
      this.draftList = this.draftList1;
    }
  }
  getDataWithTag() {
    // if (this.tag === 'tag') {
    //   this.filterCases = this.cases;
    //   return false;
    // }
    // this.filterCases = this.searchFilterData.filter((m) => {
    //   let flag = false;
    //   m.resourceTags.forEach((ele) => {
    //     if (ele.id.toString() === this.tag) {
    //       flag = true;
    //     }
    //   });
    //   return flag;
    // });
    this.publishedList = this.publishedList1;
    this.draftList = this.draftList1;
    this.filterCases = this.cases;
    if (this.tag === 'tag') {
      this.publishedList = this.publishedList1;
      this.draftList = this.draftList1;
    } else {
      this.publishedList = this.publishedList.filter((m) => {
        if (m.resourceTags.length > 0) {
          let flag = false;
          m.resourceTags.forEach((ele) => {
            if (ele.id.toString() === this.tag) {
              flag = true;
            }
          });
          return flag;
        }
      });
      this.draftList = this.draftList.filter((m) => {
        if (m.resourceTags.length > 0) {
          let flag = false;
          m.resourceTags.forEach((ele) => {
            if (ele.id.toString() === this.tag) {
              flag = true;
            }
          });
          return flag;
        }
      });
    }
  }

  cancel() {
    this.publishedList = this.publishedList1;
    this.draftList = this.draftList1;
  }
}
