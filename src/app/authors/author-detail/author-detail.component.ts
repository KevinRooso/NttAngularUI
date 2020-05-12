import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.css'],
})
export class AuthorDetailComponent implements OnInit {
  authorData: any;

  constructor(
    private authService: AuthServiceService,
    private router1: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.router1.queryParams.subscribe((params) => {
      this.getAuthorData(params.page);
    });
  }

  getAuthorData(id) {
    this.authService.getSpeakerDetail(id).subscribe((res) => {
      this.authorData = res.body;
    });
  }
  editAuthor(id) {
    // alert(id);
    this.router.navigate(['/author-create'], { queryParams: { page: id } });
  }
  Back() {
    this.location.back(); // <-- go back to previous location on cancel
  }
}
