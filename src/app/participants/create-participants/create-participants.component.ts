import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthServiceService } from 'src/app/auth-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-participants',
  templateUrl: './create-participants.component.html',
  styleUrls: ['./create-participants.component.css']
})
export class CreateParticipantsComponent implements OnInit {
  addParForm:FormGroup;
  flag=true;
  events:any[]=[];
  eventId;
  constructor(private formBuilder: FormBuilder,private service:AuthServiceService,
    private router1:ActivatedRoute) { }

  ngOnInit(): void {
    this.router1.queryParams.subscribe(params => {
      console.log(params.page);
      if(params.page!= undefined){
      this.flag=false;
      this.eventId=params.page;
      }
    });
    this.addParForm = this.formBuilder.group({
      name: [''],
      email: [''],
      phoneNo: [''],
      event:['']
    });
    this.getEvents();
  }
  getEvents(){
    this.service.getAllEventList().subscribe(res=>{
      console.log(res);
      this.events=res.body;
    })
  }
  submit(){
    let obj={
      "name": this.addParForm.controls['name'].value,
     "email": this.addParForm.controls['email'].value,
      "phoneNumber": this.addParForm.controls['phoneNo'].value,
      "registrationType": ""
    }
    console.log(obj);
    console.log(this.addParForm.controls['event'].value);
    if(this.flag){
      console.log("withoutEvent");
    this.service.saveParticipent(this.addParForm.controls['event'].value,obj).subscribe(res=>{
      alert("added successfully");
    })
  }
    else{
      var arr:any[]=[];
      arr.push(obj);
    this.service.saveParticipentnonEvent(this.eventId,arr).subscribe(res=>{
      alert("added successfully");
    })
  }
  }
}
