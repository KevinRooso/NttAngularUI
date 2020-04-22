import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CommonServiceService } from 'src/app/common-service.service';

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
  cat='';
  dates:any[]=[];
  tagFilterList:any[]=[];
  categoryFilterList:any[]=[];
  eventTypeFilterList:any[]=[];
  filterDate='';
  publishedList:any[]=[];
  activeList:any[]=[];
  draftList:any[]=[];
  publishedList1:any[]=[];
  activeList1:any[]=[];
  draftList1:any[]=[];

  sort='desc?cdate';
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
    private router:Router,
    public commonService:CommonServiceService) { }

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
        console.log('Json Data', this.getEventData);
        this.getEventData.filter(m=>{
          if(this.categoryFilterList.indexOf(m.categoryName)==-1) {
          this.categoryFilterList.push(m.categoryName);
          }
        })

        this.filterBlogs=data.body;
        this.blogs=data.body;
        this.searchFilterData=data.body;
        this.searchFilterData.sort(this.GFG_sortFunctionc1);
        data.body.filter(m=>{
          if(m.eventDate !=null) {
        if(this.dates.indexOf(m.eventDate.substring(0,10).split('-').reverse().join('/'))==-1) {
          this.dates.push(m.eventDate.substring(0,10).split('-').reverse().join('/'))
        }
          }
        })

        this.publishedList=this.getEventData.filter(m=>{
           return m.publish;
         })
         this.publishedList1=this.publishedList;
         this.activeList=this.getEventData.filter(m=>{
          return !m.publish && m.active;
        })
         this.activeList1=this.activeList;
        this.draftList=this.getEventData.filter(m=>{
          return !m.publish && !m.active && (m.draft || !m.draft);
        })
        this.draftList1=this.draftList;
      });
  }
  getTagsDetails(){
    this.authService.getTagsList().subscribe((res)=>{
      console.log('Tag', res.body);
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
      console.log('tag=',res);

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

     const titleData=m.eventDate;
     const d=this.filterDate.split('/').reverse().join('-')
      console.log('d==',d);
      console.log('data=',titleData);

      return titleData.includes(d);
    })
    console.log('filterblogsss==',this.filterBlogs);

  }
  blogSearch(){
    console.log(this.filterBlogs);
      this.publishedList=this.publishedList.filter(m=>{

       // return m.title.includes(this.searchBlog);
       const titleData=m.title.toUpperCase();
        return titleData.includes(this.searchBlog.toUpperCase());
      });
      this.activeList=this.activeList.filter(m=>{

        // return m.title.includes(this.searchBlog);
        const titleData=m.title.toUpperCase();
         return titleData.includes(this.searchBlog.toUpperCase());
       });
       this.draftList=this.draftList.filter(m=>{

        // return m.title.includes(this.searchBlog);
        const titleData=m.title.toUpperCase();
         return titleData.includes(this.searchBlog.toUpperCase());
       })

  }
  cancel(){

   this.publishedList=this.publishedList1;
   this.activeList=this.activeList1;
   this.draftList=this.draftList1;
  }
  emitValue(){
   const date1=this.advanceFilterForm.get(['registrationStartDate']).value;
   const  date2=this.startDate=this.advanceFilterForm.get(['registrationEndDate']).value;
    this.endDate=this.advanceFilterForm.get(['registrationStartDate']).value;
    console.log('startdate==',this.startDate);
    console.log('enddate==',this.endDate);
    console.log('compare==',date1 >date2);
    if(date1 >date2){
      this.advanceFilterForm.get(['registrationEndDate']).setValue(' ');
      console.log('inside if');
    }
   // alert(this.endDate==new Date())
  }
  emitValue1(){
   // this.startDate=this.advanceFilterForm.get(['registrationEndDate']).value;
  }
  filterData(){
    const data=this.sort.split('?');
    if(this.sort=='Sort By'){
      this.filterBlogs=this.blogs;
    }
    if(data[1]=='Title'){
      if(data[0]=='asc'){
      // this.searchFilterData.sort((a,b) => a.title.trim().localeCompare(b.title.trim()));
        this.publishedList.sort((a,b) => a.title.trim().localeCompare(b.title.trim()));
        this.activeList.sort((a,b) => a.title.trim().localeCompare(b.title.trim()));
       this.draftList.sort((a,b) => a.title.trim().localeCompare(b.title.trim()));
     // this.filterBlogs=this.searchFilterData;
    }
    else{
     // this.searchFilterData.sort((a,b) => b.title.trim().localeCompare(a.title.trim()));
      this.publishedList.sort((a,b) => b.title.trim().localeCompare(a.title.trim()));
      this.activeList.sort((a,b) => b.title.trim().localeCompare(a.title.trim()));
      this.draftList.sort((a,b) => b.title.trim().localeCompare(a.title.trim()));
     // this.filterBlogs=this.searchFilterData;
    }
    }

    if(data[1]=='date'){
      if(data[0]=='asc'){
      //   console.log("adtesort==",this.searchFilterData);
      // this.searchFilterData.sort(this.GFG_sortFunction);

      this.publishedList.sort(this.GFG_sortFunction);
      this.activeList.sort(this.GFG_sortFunction);
      this.draftList.sort(this.GFG_sortFunction);

        // console.log("dateaftersort==",this.searchFilterData);

        // this.filterBlogs=this.searchFilterData;
    }
    else{
      // this.searchFilterData.sort(this.GFG_sortFunction1);
      // console.log("dateaftersort==",this.searchFilterData);
      // this.filterBlogs=this.searchFilterData;
      this.publishedList.sort(this.GFG_sortFunction1);
      this.activeList.sort(this.GFG_sortFunction1);
      this.draftList.sort(this.GFG_sortFunction1);
    }
    }
    if(data[1]=='cdate'){
      if(data[0]=='asc'){
      //   console.log("adtesort==",this.searchFilterData);
      // this.searchFilterData.sort(this.GFG_sortFunctionc);
      //   console.log("dateaftersort==",this.searchFilterData);
      //   this.filterBlogs=this.searchFilterData;
      this.publishedList.sort(this.GFG_sortFunctionc);
      this.activeList.sort(this.GFG_sortFunctionc);
      this.draftList.sort(this.GFG_sortFunctionc);
    }
    else{
      // this.searchFilterData.sort(this.GFG_sortFunctionc1);
      // console.log("dateaftersort==",this.searchFilterData);
      // this.filterBlogs=this.searchFilterData;
      this.publishedList.sort(this.GFG_sortFunctionc1);
      this.activeList.sort(this.GFG_sortFunctionc1);
      this.draftList.sort(this.GFG_sortFunctionc1);
    }
    }


    // if(this.sort=="Category"){
    //   this.searchFilterData.sort((a,b) => a.categoryName.localeCompare(b.categoryName));
    //   this.filterBlogs=this.searchFilterData;
    // }
    // if(this.sort=="Date"){
    //   this.searchFilterData.sort((a,b) => a.eventDate.localeCompare(b.eventDate));
    //   this.filterBlogs=this.searchFilterData;
    // }
  }
   GFG_sortFunction(a, b) {
    const dateA = new Date(a.eventDate).getTime();
    const dateB = new Date(b.eventDate).getTime();
    return dateA > dateB ? 1 : -1;
};
GFG_sortFunction1(a, b) {
  const dateA = new Date(a.eventDate).getTime();
  const dateB = new Date(b.eventDate).getTime();
  return dateA < dateB ? 1 : -1;
};

GFG_sortFunctionc(a, b) {
  const dateA = new Date(a.createdAt).getTime();
  const dateB = new Date(b.createdAt).getTime();
  return dateA > dateB ? 1 : -1;
};
GFG_sortFunctionc1(a, b) {
const dateA = new Date(a.createdAt).getTime();
const dateB = new Date(b.createdAt).getTime();
return dateA < dateB ? 1 : -1;
};
}
