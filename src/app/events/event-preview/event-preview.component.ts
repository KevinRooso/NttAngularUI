import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-preview',
  templateUrl: './event-preview.component.html',
  styleUrls: ['./event-preview.component.css']
})
export class EventPreviewComponent implements OnInit {
  allEventsData: any;
  // cards = [
  //   { title: "Event Title", agenda: "Some quick example text to build on the card title and make up the bulk of the card's content.", date: "Date", category: "Category", img: "https://in.bmscdn.com/nmcms/events/banner/desktop/media-desktop-road-to-ultra-india-2020-2-18-t-18-2-38.jpg" },
  //   { title: "Event Title", agenda: "Some quick example text to build on the card title and make up the bulk of the card's content.", date: "Date", category: "Category", img: "https://in.bmscdn.com/nmcms/events/banner/desktop/media-desktop-road-to-ultra-india-2020-2-18-t-18-2-38.jpg" },
  //   { title: "Event Title", agenda: "Some quick example text to build on the card title and make up the bulk of the card's content.", date: "Date", category: "Category", img: "https://in.bmscdn.com/nmcms/events/banner/desktop/media-desktop-road-to-ultra-india-2020-2-18-t-18-2-38.jpg" },
  //   { title: "Event Title", agenda: "Some quick example text to build on the card title and make up the bulk of the card's content.", date: "Date", category: "Category", img: "https://in.bmscdn.com/nmcms/events/banner/desktop/media-desktop-road-to-ultra-india-2020-2-18-t-18-2-38.jpg" }
  // ];
  category: string[] = [];
  tags: string[] = [];
  getEventData: any;
  constructor(private authService: AuthServiceService, private router:Router) { }

  ngOnInit(): void {
    this.getEventslist();
  }

  getEventslist() {
    this.authService.getAllEventList().subscribe(
      (data) => {
        this.getEventData = data.body;
        console.log("Json Data", this.getEventData);
        this.category.push(this.getEventData.categoryTypeId.name);
        for (let i of this.getEventData.tags) {
          this.tags.push(i.name);
        }
        this.category.push(this.getEventData.categoryTypeId.name);
        // this.tags.push(this.getEventData.tags.name);
        // for (let [key, value] of Object.entries(this.getEventData.categoryTypeId)) {
        //   console.log(key);
        //   this.category.push(value);
        //   // console.log(`${key}: ${value}`);
        // }
      });
  }
  getDetails(id) {
    alert(id);
    this.router.navigate(['/details'], { queryParams: { page: id } });
  }
}
