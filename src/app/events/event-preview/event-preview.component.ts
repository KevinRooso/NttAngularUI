import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-event-preview',
  templateUrl: './event-preview.component.html',
  styleUrls: ['./event-preview.component.css']
})
export class EventPreviewComponent implements OnInit {
  allEventsData: any;
  blogs;
  filterBlogs=new BehaviorSubject<any[]>([]);
  searchFilterData;
  searchBlog;
  tagList;
  categoryList:any[]=[];
  cat:string="";
  dates:any[]=[];
  filterDate="";
  // cards = [
  //   { title: "Event Title", agenda: "Some quick example text to build on the card title and make up the bulk of the card's content.", date: "Date", category: "Category", img: "https://in.bmscdn.com/nmcms/events/banner/desktop/media-desktop-road-to-ultra-india-2020-2-18-t-18-2-38.jpg" },
  //   { title: "Event Title", agenda: "Some quick example text to build on the card title and make up the bulk of the card's content.", date: "Date", category: "Category", img: "https://in.bmscdn.com/nmcms/events/banner/desktop/media-desktop-road-to-ultra-india-2020-2-18-t-18-2-38.jpg" },
  //   { title: "Event Title", agenda: "Some quick example text to build on the card title and make up the bulk of the card's content.", date: "Date", category: "Category", img: "https://in.bmscdn.com/nmcms/events/banner/desktop/media-desktop-road-to-ultra-india-2020-2-18-t-18-2-38.jpg" },
  //   { title: "Event Title", agenda: "Some quick example text to build on the card title and make up the bulk of the card's content.", date: "Date", category: "Category", img: "https://in.bmscdn.com/nmcms/events/banner/desktop/media-desktop-road-to-ultra-india-2020-2-18-t-18-2-38.jpg" }
  // ];
  category: string[] = [];
  tags: string[] = [];
  getEventData: any;
  constructor(private authService: AuthServiceService, private router:Router) { }

  ngOnInit(): void {
    this.getEventslist();
    this.getAllCategory();
    this.getAllTags();
  }

  getEventslist() {
    this.authService.getAllEventList().subscribe(
      (data) => {
        this.getEventData = data.body;
        console.log("Json Data", this.getEventData);
        this.filterBlogs=data.body;
        this.blogs=data.body;
        this.searchFilterData=data.body;
        data.body.filter(m=>{
        if(this.dates.indexOf(m.eventDate.substring(0,10).split('-').reverse().join('/'))==-1)
          this.dates.push(m.eventDate.substring(0,10).split('-').reverse().join('/'))
        })
      });
  }
  getDetails(id) {
    // alert(id);
    this.router.navigate(['/details'], { queryParams: { page: id } });
  }
  getAllTags(){
    this.authService.getTagsList().subscribe(res=>{
      console.log("tag=",res);

        this.tagList=res.body;
    })
  }
  getAllCategory(){
    this.authService.getCategoryList().subscribe(res=>{
      console.log(res);
      this.categoryList=res.body;
    });
  }
  getDataWithCat(){
   this.filterBlogs=this.blogs.filter(m=>{
       return m.categoryName==this.cat;
    })
    this.searchFilterData=this.filterBlogs;
  }
  getDataWithDate(){
    this.filterBlogs=this.searchFilterData.filter(m=>{

     let titleData=m.eventDate;
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
       let titleData=m.title.toUpperCase();
        return titleData.includes(this.searchBlog.toUpperCase());
      })
  }
  cancel(){
    this.filterBlogs=this.blogs;
  }
}
