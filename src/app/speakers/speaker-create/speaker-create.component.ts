import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, NgForm, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-speaker-create',
  templateUrl: './speaker-create.component.html',
  styleUrls: ['./speaker-create.component.css']
})
export class SpeakerCreateComponent implements OnInit {

  createSpeakerForm: FormGroup;
  public imagePath;
  imgURL: any;
  public message: string;

  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  constructor(private formbuilder: FormBuilder, private router: Router ) {
    this.createSpeakerForm=formbuilder.group({
      title: new FormControl('', Validators.required),
      //agenda: new FormControl('', Validators.required),
      //category: new FormControl('', Validators.required),
      //tags: new FormControl('', Validators.required),
      //venue: new FormControl('', Validators.required),
     // participants: new FormControl('', Validators.required),
      //speakers: new FormControl('', Validators.required)
      // image: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void { }

  generateEvent(createSpeakerForm){
    if (createSpeakerForm.valid){
      this.router.navigate(['/home']);
    }else{
      alert("Please Enter Required field first");
    }
  }


}
