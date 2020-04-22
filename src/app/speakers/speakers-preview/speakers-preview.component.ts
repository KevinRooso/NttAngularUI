import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-speakers-preview',
  templateUrl: './speakers-preview.component.html',
  styleUrls: ['./speakers-preview.component.css'],
})
export class SpeakersPreviewComponent implements OnInit {
  cardData: any;
  filterBlogs = new BehaviorSubject<any[]>([]);
  searchFilterData;
  searchBlog = '';
  tagList;
  categoryList: any[] = [];
  cat = '';
  dates: any[] = [];
  filterDate = '';
  sort = 'desc?cdate';
  constructor(private authService: AuthServiceService, private router: Router) {}

  ngOnInit(): void {
    this.getSpeakerList();
  }
  getSpeakerList() {
    this.authService.getAllSpeakersList().subscribe((res) => {
      this.cardData = res.body;
      this.filterBlogs = res.body;
      this.searchFilterData = res.body;
      this.searchFilterData.sort(this.GFG_sortFunction1);
      res.body.filter((m) => {
        if (this.dates.indexOf(m.createdAt.substring(0, 10).split('-').reverse().join('/')) == -1) {
          this.dates.push(m.createdAt.substring(0, 10).split('-').reverse().join('/'));
        }
      });
      console.log(this.cardData);
    });
  }
  getDetails(id) {
    // alert(id);
    this.router.navigate(['/speaker-details'], { queryParams: { page: id } });
  }
  getDataWithDate() {
    this.filterBlogs = this.searchFilterData.filter((m) => {
      const titleData = m.createdAt;
      const d = this.filterDate.split('/').reverse().join('-');
      console.log('d==', d);
      console.log('data=', titleData);

      return titleData.includes(d);
    });
    console.log('filterblogsss==', this.filterBlogs);
  }
  blogSearch() {
    // console.log(this.filterBlogs);
    //   this.filterBlogs=this.searchFilterData.filter(m=>{
    //     let flag=false;
    //    let titleData="";
    //    let origanizationName="";
    //    if(m['fullName'] !=null){
    //       titleData=m['fullName'].toUpperCase();
    //     flag=titleData.includes(this.searchBlog.toUpperCase()) ;
    //    }
    //   if(m['origanizationName'] !=null){
    //      origanizationName=m['origanizationName'].toUpperCase();
    //    flag= origanizationName.includes(this.searchBlog.toUpperCase());
    //   }
    //   return flag;
    //   })
    const keyword = this.searchBlog.toLowerCase();
    this.filterBlogs = this.searchFilterData.filter(
      (x) => x.fullName.toLowerCase().includes(keyword) || x.origanizationName.toLowerCase().includes(keyword)
    );
  }
  cancel() {
    this.filterBlogs = this.cardData;
  }
  filterData() {
    const data = this.sort.split('?');
    if (this.sort == 'Sort By') {
      this.filterBlogs = this.cardData;
    }

    if (data[1] == 'cdate') {
      if (data[0] == 'asc') {
        console.log('adtesort==', this.searchFilterData);
        this.searchFilterData.sort(this.GFG_sortFunction);

        console.log('dateaftersort==', this.searchFilterData);

        this.filterBlogs = this.searchFilterData;
      } else {
        this.searchFilterData.sort(this.GFG_sortFunction1);
        console.log('dateaftersort==', this.searchFilterData);
        this.filterBlogs = this.searchFilterData;
      }
    }
  }
  GFG_sortFunction(a, b) {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateA > dateB ? 1 : -1;
  }
  GFG_sortFunction1(a, b) {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateA < dateB ? 1 : -1;
  }

  getSkills(skills) {
    const arrSkills = skills.split(',');
    if (arrSkills.length > 3) {
      return arrSkills[0] + ',' + arrSkills[1] + ',' + arrSkills[2];
    } else {
      return skills;
    }
  }
}
