import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-speakers-preview',
  templateUrl: './speakers-preview.component.html',
  styleUrls: ['./speakers-preview.component.css']
})
export class SpeakersPreviewComponent implements OnInit {
  cardData:any[]=[];
  filterBlogs=new BehaviorSubject<any[]>([]);
  searchFilterData;
  searchBlog;
  tagList;
  categoryList:any[]=[];
  cat:string="";
  dates:any[]=[];
  filterDate="";
  constructor( private authService: AuthServiceService, private router:Router) { }

  ngOnInit(): void {
    this.getSpeakerList();
  }
  getSpeakerList(){
    this.authService.getAllSpeakersList().subscribe((res)=>{
      this.cardData = res.body;
      this.filterBlogs=res.body;
      this.searchFilterData=res.body;
      res.body.filter(m=>{
      if(this.dates.indexOf(m.createdAt.substring(0,10).split('-').reverse().join('/'))==-1)
        this.dates.push(m.createdAt.substring(0,10).split('-').reverse().join('/'))
      })
      console.log(this.cardData);
    })
  }
  getDetails(id) {
    // alert(id);
    this.router.navigate(['/speaker-details'], { queryParams: { page: id } });
  }
  getDataWithDate(){
    this.filterBlogs=this.searchFilterData.filter(m=>{

     let titleData=m.createdAt;
     let d=this.filterDate.split('/').reverse().join('-')
      console.log("d==",d);
      console.log("data=",titleData);

      return titleData.includes(d);
    })
    console.log("filterblogsss==",this.filterBlogs);

  }
  blogSearch(){
    console.log(this.filterBlogs);
      this.filterBlogs=this.searchFilterData.filter(m=>{

       // return m.title.includes(this.searchBlog);
       let titleData=m.fullName.toUpperCase();
        return titleData.includes(this.searchBlog.toUpperCase());
      })
  }
}
