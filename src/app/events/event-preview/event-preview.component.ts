import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-event-preview',
  templateUrl: './event-preview.component.html',
  styleUrls: ['./event-preview.component.css']
})
export class EventPreviewComponent implements OnInit {
  allEventsData: any;
  advanceFilterForm: FormGroup;
  blogs;
  filterBlogs=new BehaviorSubject<any[]>([]);
  searchFilterData;
  searchBlog;
  tagList;
  tagData:any[]=[];
  allData:any[]=[];
  categoryList:any[]=[];
  cat:string="";
  dates:any[]=[];
  tagFilterList:any[]=[];
  categoryFilterList:any[]=[];
  eventTypeFilterList:any[]=[];
  filterDate="";
  sort:string="";
    startDate=new Date();
    endDate=new Date();
    categoryLis:any[]=['Sort By','Title','Date','Category'];
  // cards = [
  //   { title: "Event Title", agenda: "Some quick example text to build on the card title and make up the bulk of the card's content.", date: "Date", category: "Category", img: "https://in.bmscdn.com/nmcms/events/banner/desktop/media-desktop-road-to-ultra-india-2020-2-18-t-18-2-38.jpg" },
  //   { title: "Event Title", agenda: "Some quick example text to build on the card title and make up the bulk of the card's content.", date: "Date", category: "Category", img: "https://in.bmscdn.com/nmcms/events/banner/desktop/media-desktop-road-to-ultra-india-2020-2-18-t-18-2-38.jpg" },
  //   { title: "Event Title", agenda: "Some quick example text to build on the card title and make up the bulk of the card's content.", date: "Date", category: "Category", img: "https://in.bmscdn.com/nmcms/events/banner/desktop/media-desktop-road-to-ultra-india-2020-2-18-t-18-2-38.jpg" },
  //   { title: "Event Title", agenda: "Some quick example text to build on the card title and make up the bulk of the card's content.", date: "Date", category: "Category", img: "https://in.bmscdn.com/nmcms/events/banner/desktop/media-desktop-road-to-ultra-india-2020-2-18-t-18-2-38.jpg" }
  // ];
  category: string[] = [];
  tags: string[] = [];
  getEventData: any;
  eventType: any= [
    {value: '0', viewValue: 'Webinar'},
    {value: '1', viewValue: 'Public'},
    {value: '2', viewValue: 'Customer'}
  ];
  constructor(private authService: AuthServiceService,
    private formBuilder:FormBuilder,
    private router:Router) { }

  ngOnInit(): void {
    this.advanceFilterForm = this.formBuilder.group({
      tagList:[''],
      categoryTypeId:[''],
      eventTypeData:[''],
      registrationStartDate:[''],
      registrationEndDate:['']
    })
    this.getEventslist();
    this.getAllCategory();
    this.getAllTags();
    this.getTagsDetails();
    this.getCategoryDetails();
  }

  getEventslist() {
    this.authService.getAllEventList().subscribe(
      (data) => {
        this.getEventData = data.body;
        console.log("Json Data", this.getEventData);
        this.getEventData.filter(m=>{
          if(this.categoryFilterList.indexOf(m.categoryName)==-1)
          this.categoryFilterList.push(m.categoryName);
        })

        this.filterBlogs=data.body;
        this.blogs=data.body;
        this.searchFilterData=data.body;
        data.body.filter(m=>{
        if(this.dates.indexOf(m.eventDate.substring(0,10).split('-').reverse().join('/'))==-1)
          this.dates.push(m.eventDate.substring(0,10).split('-').reverse().join('/'))
        })
      });
  }
  getTagsDetails(){
    this.authService.getTagsList().subscribe((res)=>{
      console.log("Tag", res.body);
      this.tagData=res.body;
    })
  }
  getCategoryDetails(){
    this.authService.getCategoryList().subscribe((res)=>{
      // console.log("category", res.body);
      this.allData = res.body;
    })
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
  emitValue(){
   let date1=this.advanceFilterForm.get(['registrationStartDate']).value;
   let  date2=this.startDate=this.advanceFilterForm.get(['registrationEndDate']).value;
    this.endDate=this.advanceFilterForm.get(['registrationStartDate']).value;
    console.log("startdate==",this.startDate);
    console.log("enddate==",this.endDate);
    console.log("compare==",date1 >date2);
    if(date1 >date2){
      this.advanceFilterForm.get(['registrationEndDate']).setValue(' ');
      console.log("inside if");
    }
   //alert(this.endDate==new Date())
  }
  emitValue1(){
   // this.startDate=this.advanceFilterForm.get(['registrationEndDate']).value;
  }
  filterData(){
    if(this.sort=="Sort By"){
      this.filterBlogs=this.blogs;
    }
    if(this.sort=="Title"){
      this.searchFilterData.sort((a,b) => a.title.localeCompare(b.title));
      this.filterBlogs=this.searchFilterData;
    }
    if(this.sort=="Category"){
      this.searchFilterData.sort((a,b) => a.categoryName.localeCompare(b.categoryName));
      this.filterBlogs=this.searchFilterData;
    }
    if(this.sort=="Date"){
      this.searchFilterData.sort((a,b) => a.eventDate.localeCompare(b.eventDate));
      this.filterBlogs=this.searchFilterData;
    }
  }
}
