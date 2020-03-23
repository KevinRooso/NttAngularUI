import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-whitepapers',
  templateUrl: './whitepapers.component.html',
  styleUrls: ['./whitepapers.component.css']
})
export class WhitepapersComponent implements OnInit {
  whitePaperList:any;
  constructor( private authService: AuthServiceService, private router:Router) { }

  ngOnInit(): void {
    this.getAllArticleList();
  }
  getAllArticleList(){
    this.authService.getAllWhitepaper().subscribe((res)=>{
      this.whitePaperList = res.body;
      console.log("res", this.whitePaperList);
    })
  }
  getDetails(id) {
    // alert(id);
    this.router.navigate(['/white-details'], { queryParams: { page: id } });
  }

}
