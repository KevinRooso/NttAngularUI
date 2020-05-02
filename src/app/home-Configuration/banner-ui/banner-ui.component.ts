import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-banner-ui',
  templateUrl: './banner-ui.component.html',
  styleUrls: ['./banner-ui.component.css']
})
export class BannerUiComponent implements OnInit {

  constructor(private service:AuthServiceService,
    private formBuilder:FormBuilder) {

   }
  bannerConfigurationForm: FormGroup;
  bannerBlock;
  bannerSelectedValue;
  selectBlockData:any[]=[];
  bannerSequence;
  eventData:any[]=[];
  show:boolean=false;
  pFlag:boolean=false;
  cFlag:boolean=false;
  @Input('userType') userType: string;
  @Input('blocks') blocks;
  @Input('position') sequence;
  @Input('bannerData') bannerData;
  @Input('formArr') formArr;

  @Output() bannerToEmit = new EventEmitter<any>();
  @Output() removeBanner = new EventEmitter<number>();
  sequenceNumbersBanner: any[] = [1, 2, 3];
  ngOnInit(): void {
    if (this.userType === 'public') {
      this.pFlag = true;
      this.cFlag = false;
    } else {
      this.pFlag = false;
      this.cFlag = true;
    }
    this.bannerConfigurationForm = this.formBuilder.group({
      public: [this.pFlag],
      customer: [this.cFlag],
      datafieldType: ['', Validators.required],
      dataFieldId: ['', Validators.required],
    });
    if(this.bannerData){
      this.setBannerData();
      }

  }
  ngOnChanges() {
    if (this.userType === 'public') {
      this.pFlag = true;
      this.cFlag = false;
    } else {
      this.pFlag = false;
      this.cFlag = true;
    }
    if(this.bannerData){
    this.setBannerData();
    }
  }
  setBannerData(){
    this.show=true;
    this.bannerBlock = this.bannerData.type;
    this.bannerSelectedValue = this.bannerData.id;
    this.bannerConfigurationForm.get(['datafieldType']).setValue(this.bannerBlock);
    this.bannerConfigurationForm.get(['dataFieldId']).setValue(this.bannerSelectedValue);
    const durl = this.blocks.find((x) => x.apiName === this.bannerBlock).url.split('?')[1];

    this.service.getBannerBlockDetail(durl,this.pFlag,this.cFlag).subscribe((res) => {
      this.selectBlockData = res.body;

      this.show = false;
    });
  }
  emitBanner(){
    let obj=this.bannerConfigurationForm.value;
    obj.sequenceNumber=this.sequence;
    if(this.bannerConfigurationForm.valid){
      this.bannerToEmit.emit(obj)
    }
  }
  getSelectedBlockData(value) {
   // const value1 = this.blocks.find((x) => x.apiName === value).url.split('?')[0];
    value = this.blocks.find((x) => x.apiName === value).url.split('?')[1];
    this.show = true;
    this.service.getBannerBlockDetail(value,this.pFlag,this.cFlag).subscribe(
      (res) => {
       this.selectBlockData=res.body;
        this.show = false;
      },
      (_error) => {
        this.show = false;
      }
    );
  }
  removeForm(){
    this.removeBanner.emit(this.sequence);
  }

}
