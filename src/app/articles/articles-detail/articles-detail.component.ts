import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location} from '@angular/common';

@Component({
  selector: 'app-articles-detail',
  templateUrl: './articles-detail.component.html',
  styleUrls: ['./articles-detail.component.css']
})
export class ArticlesDetailComponent implements OnInit {
  articleData: any;

  constructor(private authService: AuthServiceService, private location: Location,  private router1: ActivatedRoute, private router: Router) { }
 show:boolean=false;
  ngOnInit(): void {
    this.show=true;
    this.router1.queryParams.subscribe(params => {
      this.getArticleData(params.page);
    });
  }
  getArticleData(id){

    this.authService.getResourceById(id).subscribe((res)=>{
      this.articleData = res.body;
      this.show=false;
      console.log("Get Articles", this.articleData);
    })
  }

  getDetails(id){
    // alert(id);
    this.router.navigate(['/article-edit'], { queryParams: { page: id } });
  }
  BackMe() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
