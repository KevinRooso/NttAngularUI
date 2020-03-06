import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-speakers-preview',
  templateUrl: './speakers-preview.component.html',
  styleUrls: ['./speakers-preview.component.css']
})
export class SpeakersPreviewComponent implements OnInit {

  cardData= [
    {img:'https://storage.googleapis.com/dfua-test.appspot.com/images/speakers/chet-haase.jpg',spName:'John Smith', spEmail:'abc@gmail.com',spProfile:'Musician'},
    {img:'https://storage.googleapis.com/dfua-test.appspot.com/images/speakers/chet-haase.jpg',spName:'John Smith', spEmail:'abc@gmail.com',spProfile:'Musician'},
    {img:'https://storage.googleapis.com/dfua-test.appspot.com/images/speakers/chet-haase.jpg',spName:'John Smith', spEmail:'abc@gmail.com',spProfile:'Musician'},
    {img:'https://storage.googleapis.com/dfua-test.appspot.com/images/speakers/chet-haase.jpg',spName:'John Smith', spEmail:'abc@gmail.com',spProfile:'Musician'}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
