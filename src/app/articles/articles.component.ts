import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articleList: any;

  constructor( private authService: AuthServiceService, private router:Router) { }

  ngOnInit(): void {
    this.getAllArticleList();
  }

  getAllArticleList(){
    this.authService.getAllArticle().subscribe((res)=>{
      this.articleList = res.body;
      console.log("res", this.articleList);
    })
  }
  getDetails(id) {
    alert(id);
    this.router.navigate(['/article-details'], { queryParams: { page: id } });
  }
}
