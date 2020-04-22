import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articleList: any;
  blogs;
  // filterBlogs=new BehaviorSubject<any[]>([]);
  filterBlogs:any[]=[];
  searchFilterData;
  searchBlog="";
  categoryList:any[]=[];
  cat:string="";
  filterDate="";
  dates:any[]=[];
  sort:string="desc?date";
  constructor( private authService: AuthServiceService, private router:Router) { }

  ngOnInit(): void {
    this.getAllArticleList();

    this.getAllCategory();
  }

  getAllArticleList(){
    this.authService.getAllArticle().subscribe((res)=>{
      this.articleList = res.body;
      console.log("res", this.articleList);
      this.filterBlogs=res.body;
      this.blogs=res.body;
      this.searchFilterData=res.body;
      this.searchFilterData.sort(this.GFG_sortFunction1);
      res.body.filter(m=>{
        if(this.dates.indexOf(m.createdAt.substring(0,10).split('-').reverse().join('/'))==-1)
          this.dates.push(m.createdAt.substring(0,10).split('-').reverse().join('/'))
        })

    })
  }
  getDetails(id) {
    // alert(id);
    this.router.navigate(['/article-details'], { queryParams: { page: id } });
  }
  // showBlogDetail(id){
  //   this.router.navigate(['/blog-detail'], { queryParams: { page: id } });
  // }
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

     let titleData=m.createdAt;
     let d=this.filterDate.split('/').reverse().join('-')

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

  filterData(){
    let data=this.sort.split('?');
    if(this.sort=="Sort By"){
      this.filterBlogs=this.blogs;
    }


    if(data[1]=="date"){
      if(data[0]=='asc'){
      //   console.log("adtesort==",this.searchFilterData);
       this.searchFilterData.sort(this.GFG_sortFunction);
        // console.log("dateaftersort==",this.searchFilterData);

         this.filterBlogs=this.searchFilterData;
    }
    else{
       this.searchFilterData.sort(this.GFG_sortFunction1);
      // console.log("dateaftersort==",this.searchFilterData);
       this.filterBlogs=this.searchFilterData;

    }
    }

  }
   GFG_sortFunction(a, b) {
    var dateA = new Date(a.updatedAt).getTime();
    var dateB = new Date(b.updatedAt).getTime();
    return dateA > dateB ? 1 : -1;
};
GFG_sortFunction1(a, b) {
  var dateA = new Date(a.updatedAt).getTime();
  var dateB = new Date(b.updatedAt).getTime();
  return dateA < dateB ? 1 : -1;
};

// GFG_sortFunctionc(a, b) {
//   var dateA = new Date(a.createdAt).getTime();
//   var dateB = new Date(b.createdAt).getTime();
//   return dateA > dateB ? 1 : -1;
// };
// GFG_sortFunctionc1(a, b) {
// var dateA = new Date(a.createdAt).getTime();
// var dateB = new Date(b.createdAt).getTime();
// return dateA < dateB ? 1 : -1;
// }
}
