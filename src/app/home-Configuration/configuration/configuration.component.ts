import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  bannerConfigurationForm1: FormGroup;
  bannerConfigurationForm2: FormGroup;
  bannerConfigurationForm3: FormGroup;
  eventConfigurationForm: FormGroup;
  articleConfigurationForm: FormGroup;
  blogsConfigurationForm: FormGroup;
  videosConfigurationForm: FormGroup;
  whitePaperConfigurationForm: FormGroup;
  caseStudyConfigurationForm: FormGroup;

  users: any[] = [
    { id: 1, type: 'Customer' },
    { id: 2, type: 'Employee' },
    { id: 3, type: 'Public' }
  ]

  blocks: any[] = [
    { id: 0, name: 'Event' },
    { id: 1, name: 'Article' },
    { id: 2, name: 'Blogs' },
    { id: 3, name: 'Videos' },
    { id: 4, name: 'Whitepapers' },
    { id: 5, name: 'CaseStudies' },
  ]
  sequenceNumbersBanner: any[] = [1, 2, 3]

  constructor(private formBuilder: FormBuilder, private service: AuthServiceService,
    private router1: ActivatedRoute, private router: Router) {

    this.bannerConfigurationForm1 = formBuilder.group({
      customer: [''],
      datafieldType: [''],
      dataFieldId: [''],
      sequenceNumber: ['']
    });
    this.bannerConfigurationForm2 = formBuilder.group({
      customer: [''],
      datafieldType: [''],
      dataFieldId: [''],
      sequenceNumber: ['']
    });
    this.bannerConfigurationForm3 = formBuilder.group({
      customer: [''],
      datafieldType: [''],
      dataFieldId: [''],
      sequenceNumber: ['']
    });
    this.eventConfigurationForm = formBuilder.group({
      customer: [''],
      datafieldType: [''],
      dataFieldId: [''],
      sequenceNumber: ['']
    });
    this.articleConfigurationForm = formBuilder.group({
      customer: [''],
      datafieldType: [''],
      dataFieldId: [''],
      sequenceNumber: ['']
    });
    this.blogsConfigurationForm = formBuilder.group({
      customer: [''],
      datafieldType: [''],
      dataFieldId: [''],
      sequenceNumber: ['']
    });
    this.videosConfigurationForm = formBuilder.group({
      customer: [''],
      datafieldType: [''],
      dataFieldId: [''],
      sequenceNumber: ['']
    });
    this.whitePaperConfigurationForm = formBuilder.group({
      customer: [''],
      datafieldType: [''],
      dataFieldId: [''],
      sequenceNumber: ['']
    });
    this.caseStudyConfigurationForm = formBuilder.group({
      customer: [''],
      datafieldType: [''],
      dataFieldId: [''],
      sequenceNumber: ['']
    });
  }
  ngOnInit(): void {
  }

  submit() {

  }
}
