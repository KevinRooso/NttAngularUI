import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, NgForm, Validators} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-speaker-edit',
  templateUrl: './speaker-edit.component.html',
  styleUrls: ['./speaker-edit.component.css']
})
export class SpeakerEditComponent implements OnInit {
  editSpeakerForm: FormGroup;

  // public imagePath;
  // imgURL: any;
  // public message: string;
  // preview(files) {
  //   if (files.length === 0)
  //     return;
  //   var mimeType = files[0].type;
  //   if (mimeType.match(/image\/*/) == null) {
  //     this.message = "Only images are supported.";
  //     return;
  //   }
  //   var reader = new FileReader();
  //   this.imagePath = files;
  //   reader.readAsDataURL(files[0]);
  //   reader.onload = (_event) => {
  //     this.imgURL = reader.result;
  //   }
  // }

  constructor(private formbuilder: FormBuilder, private router: Router ) {
    this.editSpeakerForm=formbuilder.group({

    })
  }

  ngOnInit(): void { }

  editSpeakerDetails(editSpeakerForm){

  }


}

