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
  categoryList:any[]=[];
  cat:string="";
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
  }

  getEventslist() {
    this.authService.getAllEventList().subscribe(
      (data) => {
        this.getEventData = data.body;
        console.log("Json Data", this.getEventData);
        this.filterBlogs=data.body;
        this.blogs=data.body;
        this.searchFilterData=data.body;
      });
  }
  getDetails(id) {
    alert(id);
    this.router.navigate(['/details'], { queryParams: { page: id } });
  }
  getAllCategory(){
    this.authService.getCategoryList().subscribe(res=>{
      console.log(res);
      this.categoryList=res.body;
    });
  }
  getDataWithCat(){
    this.filterBlogs=this.blogs;
    this.filterBlogs=this.blogs.filter(m=>{
       return m.categoryName==this.cat;
    })
    this.searchFilterData=this.filterBlogs;
  }
  blogSearch(){
    console.log(this.filterBlogs);
      this.filterBlogs=this.searchFilterData.filter(m=>{
        console.log( m.title);
        console.log( this.searchBlog);
       // return m.title.includes(this.searchBlog);
       let titleData=m.title.toUpperCase();
        return titleData.includes(this.searchBlog.toUpperCase());
      })
  }
}
