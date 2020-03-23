import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-whitepaper-detail',
  templateUrl: './whitepaper-detail.component.html',
  styleUrls: ['./whitepaper-detail.component.css']
})
export class WhitepaperDetailComponent implements OnInit {

  whitePaperData:any;
  constructor(private authService: AuthServiceService, private router1: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.router1.queryParams.subscribe(params => {
      this.getArticleData(params.page);
    });
  }
  getArticleData(id){
    this.authService.getResourceById(id).subscribe((res)=>{
      this.whitePaperData = res.body;
      console.log("Get Articles", this.whitePaperData);
    })
  }
  // editSpeaker(id){
  //   alert(id);
  //   this.router.navigate(['/speaker-update'], { queryParams: { page: id } });
  // }
  getDetails(id){
    // alert(id);
    this.router.navigate(['/white-edit'], { queryParams: { page: id } });
  }
}