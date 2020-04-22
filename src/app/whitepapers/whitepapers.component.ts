import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Location} from '@angular/common';

@Component({
  selector: 'app-whitepapers',
  templateUrl: './whitepapers.component.html',
  styleUrls: ['./whitepapers.component.css']
})
export class WhitepapersComponent implements OnInit {
  whitePaperList:any;
  blogs;
  // filterBlogs=new BehaviorSubject<any[]>([]);
  filterBlogs:any[]=[];
  searchFilterData;
  searchBlog='';
  categoryList:any[]=[];
  cat='';

  constructor( private authService: AuthServiceService, private router:Router, private location: Location,) { }

  ngOnInit(): void {
    this.getAllArticleList();
    this.getAllCategory();
  }
  getAllArticleList(){
    this.authService.getAllWhitepaper().subscribe((res)=>{
      this.whitePaperList = res.body;
      console.log('res', this.whitePaperList);
      this.filterBlogs=res.body;
      this.blogs=res.body;
      this.searchFilterData=res.body;
    })
  }
  getDetails(id) {
    this.router.navigate(['/white-details'], { queryParams: { page: id } });
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
      console.log(m.category.id);
      console.log(this.cat);
       return m.category.id==this.cat;
    })
    this.searchFilterData=this.filterBlogs;
  }
  blogSearch(){
    console.log(this.filterBlogs);
      this.filterBlogs=this.searchFilterData.filter(m=>{
        console.log( m.title);
        console.log( this.searchBlog);
        // alert(m.title.toUpperCase());
        // alert(this.searchBlog.toUpperCase());
        const titleData=m.title.toUpperCase();
        return titleData.includes(this.searchBlog.toUpperCase());
      })
  }
  BackMe() {
    this.location.back(); // <-- go back to previous location on cancel
  }
   cancel(){
    this.filterBlogs=this.blogs;
  }
}
