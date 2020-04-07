import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  checkError:any;
  submitted: boolean = false;
  participant="Add Participant";
  constructor(private formBuilder: FormBuilder,private service:AuthServiceService,
    private router1:ActivatedRoute,private router:Router, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    let mobnum = "^((\\+91-?)|0)?[0-9]{10}$";
    this.router1.queryParams.subscribe(params => {
      console.log(params.page);
      this.id=params.page;
      if(params.page!= undefined){
      this.flag=false;
      this.participant=this.participant+" for : "+params.name;
      this.eventId=params.page;
      }
    });
    this.addParForm = this.formBuilder.group({
      name: ['',Validators.required],
      email: ['',[Validators.required, Validators.email]],
      phoneNo: ['',[Validators.required, Validators.pattern(mobnum)]],
      event:['',Validators.required]
    });
    this.getEvents();

    this.checkError = (controlName: string, errorName: string, checkSubmitted:boolean) => {
      if(checkSubmitted){
        if(this.submitted){
          return this.addParForm.controls[controlName].hasError(errorName);
        }
      } else {
        return this.addParForm.controls[controlName].hasError(errorName);
      }

    }
  }
  getEvents(){
    this.service.getAllEventList().subscribe(res=>{
      console.log(res);
      this.events=res.body;
    })
  }
  submit(){
      if(!this.flag){
        this.addParForm.controls['event'].setValidators(null);
        this.addParForm.controls['event'].updateValueAndValidity();
      }
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
      //alert("added successfully");
      this.snackBar.open('Participants successfully created check me', 'Close', {duration: 5000});
      this.submitted = false;
      //this.router.navigate(['participants']);
    })
  }
    else{
      var arr:any[]=[];
      arr.push(obj);

    this.service.saveParticipent(this.eventId,obj).subscribe(res=>{
      this.snackBar.open('Participants successfully added in event', 'Close', {duration: 5000});
      this.submitted = false;
      // if(this.id==undefined)
      // this.router.navigate(['participants']);
      // else
      // this.router.navigate(['/details'], { queryParams: { page: this.eventId } });
    })
  }
    }
    else{
     // alert("Please fill all mandatory field");
     this.snackBar.open('Please fill all mandatory input field', 'Close', {duration: 5000});
    }
  }
}
