import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-news-view',
  templateUrl: './news-view.component.html',
  styleUrls: ['./news-view.component.css'],
})
export class NewsViewComponent implements OnInit {
  resourceTags: any;
  constructor(private actRoute: ActivatedRoute, private service: AuthServiceService, private route: Router) {}
  news: any = {};
  newsId;
  ngOnInit(): void {
    this.actRoute.params.subscribe((params) => {
      this.newsId = params.page;
      this.getBlogData(params.page);
    });
  }
  getBlogData(id) {
    this.service.getNewsById(id).subscribe((res) => {
      this.news = res.body;

      this.resourceTags = res.body.newsTags;
    });
  }
  editcaseRoute() {
    this.route.navigate(['/edit-news'], { queryParams: { page: this.newsId } });
  }
}
