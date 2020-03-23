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
  filterBlogs=new BehaviorSubject<any[]>([]);
  searchFilterData;
  searchBlog="";
  categoryList:any[]=[];
  cat:string="";
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
    })
  }
  getDetails(id) {
    // alert(id);
    this.router.navigate(['/article-details'], { queryParams: { page: id } });
  }
  showBlogDetail(id){
    this.router.navigate(['/blog-detail'], { queryParams: { page: id } });
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
        let titleData=m.title.toUpperCase();
        return titleData.includes(this.searchBlog.toUpperCase());
      })
  }
}
