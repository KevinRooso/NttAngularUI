import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthServiceService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-create-participants',
  templateUrl: './create-participants.component.html',
  styleUrls: ['./create-participants.component.css']
})
export class CreateParticipantsComponent implements OnInit {
  addParForm:FormGroup;
  events:any[]=[];
  constructor(private formBuilder: FormBuilder,private service:AuthServiceService) { }

  ngOnInit(): void {
    this.addParForm = this.formBuilder.group({

    });
    this.getEvents();
  }
  getEvents(){
    this.service.getAllEventList().subscribe(res=>{
      console.log(res);
      this.events=res.body;
    })
  }
}
