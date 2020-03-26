import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  id;
  constructor(private formBuilder: FormBuilder,private service:AuthServiceService,
    private router1:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    let mobnum = "^((\\+91-?)|0)?[0-9]{10}$";
    this.router1.queryParams.subscribe(params => {
      console.log(params.page);
      this.id=params.page;
      if(params.page!= undefined){
      this.flag=false;
      this.eventId=params.page;
      }
    });
    this.addParForm = this.formBuilder.group({
      name: ['',Validators.required],
      email: ['',[Validators.required, Validators.email]],
      phoneNo: ['',[Validators.required, Validators.pattern(mobnum)]],
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
    if(this.addParForm.valid){
    let obj={
      "name": this.addParForm.controls['name'].value,
     "email": this.addParForm.controls['email'].value,
      "phoneNumber": this.addParForm.controls['phoneNo'].value,
      "registrationType": ""
    }
    console.log(obj);
    console.log(this.addParForm.controls['event'].value);
    if(this.flag){
      this.service.saveParticipent(this.addParForm.controls['event'].value,obj).subscribe(res=>{
      alert("added successfully");
      this.router.navigate(['participants']);
    })
  }
    else{
      var arr:any[]=[];
      arr.push(obj);

    this.service.saveParticipentnonEvent(this.eventId,arr).subscribe(res=>{
      alert("added successfully");
      if(this.id==undefined)
      this.router.navigate(['participants']);
      else
      this.router.navigate(['/details'], { queryParams: { page: this.eventId } });
    })
  }
    }
  }
}
