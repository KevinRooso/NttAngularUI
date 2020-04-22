import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-videos-details',
  templateUrl: './videos-details.component.html',
  styleUrls: ['./videos-details.component.css']
})
export class VideosDetailsComponent implements OnInit {
  safeSrc: SafeResourceUrl;
  videosData: any;
  videosUrl:any;

  vde= "https://www.youtube.com/embed/sU4fhCHAt5Q";

  constructor(private authService: AuthServiceService, private sanitizer: DomSanitizer, private location: Location,  private router1: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.router1.queryParams.subscribe(params => {
      this.getVideosData(params.page);
    });
  }
  getVideosData(id){
    this.authService.getResourceById(id).subscribe((res)=>{
      this.videosData = res.body;
      let vdoUrl=this.videosData.resourceLink.split('/');
      let code="https://www.youtube.com/embed/"+vdoUrl[vdoUrl.length-1];
      console.log("code--",code);
      this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl(code);
      this.videosUrl = this.videosData.resourceLink;
      // console.log("Get videos", this.videosData);
      // console.log("Videos", this.videosUrl)
    })
  }
  getDetails(id){
    this.router.navigate(['/videos-update'], { queryParams: { page: id } });
  }
  BackMe() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
