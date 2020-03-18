import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-speakers-preview',
  templateUrl: './speakers-preview.component.html',
  styleUrls: ['./speakers-preview.component.css']
})
export class SpeakersPreviewComponent implements OnInit {
  cardData:any[]=[];

  constructor( private authService: AuthServiceService, private router:Router) { }

  ngOnInit(): void {
    this.getSpeakerList();
  }
  getSpeakerList(){
    this.authService.getAllSpeakersList().subscribe((res)=>{
      this.cardData = res.body;
      console.log(this.cardData);
    })
  }
  getDetails(id) {
    alert(id);
    this.router.navigate(['/speaker-details'], { queryParams: { page: id } });
  }
}
