import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  newsConfigurationForm: FormGroup;
  selectBlockData1:any[]=[];
  selectBlockData2:any[]=[];
  selectBlockData3:any[]=[];
  eventData:any[]=[];
  articleData:any[]=[];
  blogData:any[]=[];
  videoData:any[]=[];
  whitePaperData:any[]=[];
  caseStudyData:any[]=[];
  newsData:any[]=[];

  users: any[] = [
    { id: 1, type: 'Customer' },
    { id: 2, type: 'Employee' },
    { id: 3, type: 'Public' }
  ]

  blocks: any[] = [
    { url: 'Event?api/public/events', name: 'Event' },
    { url: 'Article?api/public/resources/articles', name: 'Article' },
    { url: 'Blogs?api/public/resources/blogs', name: 'Blogs' },
    { url: 'Videos?api/public/resources/videos', name: 'Videos' },
    { url: 'Whitepapers?api/public/resources/whitepapers', name: 'Whitepapers' },
    { url: 'CaseStudies?api/public/resources/case-studies', name: 'CaseStudies' },
    { url: 'News?api/public/news', name: 'News' },
  ]
  sequenceNumbersBanner: any[] = [1, 2, 3];
  sequenceNumbersBannerBlock: any[] = [1, 2, 3,4,5,6,7]
  filterArrForBannerBlock:any[]=[];

  constructor(private formBuilder: FormBuilder, private service: AuthServiceService,
    private router1: ActivatedRoute, private router: Router
    , public snackBar: MatSnackBar) {

    this.bannerConfigurationForm1 = formBuilder.group({
      public:[false,Validators.required],
      customer: [false,Validators.required],
      datafieldType: ['',Validators.required],
      dataFieldId: ['',Validators.required],
      sequenceNumber: ['',Validators.required]
    });
    this.bannerConfigurationForm2 = formBuilder.group({
      public:[false,Validators.required],
      customer: [false,Validators.required],
      datafieldType: ['',Validators.required],
      dataFieldId: ['',Validators.required],
      sequenceNumber: ['',Validators.required]
    });
    this.bannerConfigurationForm3 = formBuilder.group({
      public:[false,Validators.required],
      customer: [false,Validators.required],
      datafieldType: ['',Validators.required],
      dataFieldId: ['',Validators.required],
      sequenceNumber: ['',Validators.required]
    });
    this.eventConfigurationForm = formBuilder.group({
      public:[false,Validators.required],
      customer: [false,Validators.required],
      datafieldType: ['event',Validators.required],
      dataFieldId: ['',Validators.required],
      sequenceNumber: ['']
    });
    this.articleConfigurationForm = formBuilder.group({
      public:[false,Validators.required],
      customer: [false,Validators.required],
      datafieldType: ['article',Validators.required],
      dataFieldId: ['',Validators.required],
      sequenceNumber: ['']
    });
    this.blogsConfigurationForm = formBuilder.group({
      public:[false,Validators.required],
      customer: [false,Validators.required],
      datafieldType: ['blog',Validators.required],
      dataFieldId: ['',Validators.required],
      sequenceNumber: ['']
    });
    this.videosConfigurationForm = formBuilder.group({
      public:[false,Validators.required],
      customer: [false,Validators.required],
      datafieldType: ['videos',Validators.required],
      dataFieldId: ['',Validators.required],
      sequenceNumber: ['']
    });
    this.whitePaperConfigurationForm = formBuilder.group({
      public:[false,Validators.required],
      customer: [false,Validators.required],
      datafieldType: ['whitePapers',Validators.required],
      dataFieldId: ['',Validators.required],
      sequenceNumber: ['']
    });
    this.caseStudyConfigurationForm = formBuilder.group({
      public:[false,Validators.required],
      customer: [false,Validators.required],
      datafieldType: ['caseStudy',Validators.required],
      dataFieldId: ['',Validators.required],
      sequenceNumber: ['']
    });
    this.newsConfigurationForm = formBuilder.group({
      public:[false,Validators.required],
      customer: [false,Validators.required],
      datafieldType: ['news',Validators.required],
      dataFieldId: ['',Validators.required],
      sequenceNumber: ['']
    });
  }
  ngOnInit(): void {
    //this.getSelectedBlockData1(this.blocks[0].url);
    // this.getSelectedBlockData2(this.blocks[1].url);
    // this.getSelectedBlockData3(this.blocks[2].url);
    // this.getSelectedBlockData4(this.blocks[3].url);
    // this.getSelectedBlockData5(this.blocks[4].url);
    // this.getSelectedBlockData6(this.blocks[5].url);
    // this.getSelectedBlockData7(this.blocks[6].url);
  }

  submit() {

  }
  submitBanner(){
    let flag=true;
    console.log(this.bannerConfigurationForm1.value);

    let obj:any[]=[];
    let obj1=this.bannerConfigurationForm1.value
    let obj2=this.bannerConfigurationForm2.value
    let obj3=this.bannerConfigurationForm3.value
      obj1.datafieldType=this.bannerConfigurationForm1.get(['datafieldType']).value.split('?')[0];
      obj2.datafieldType=this.bannerConfigurationForm2.get(['datafieldType']).value.split('?')[0];
      obj3.datafieldType=this.bannerConfigurationForm3.get(['datafieldType']).value.split('?')[0];
   let seq=[];
   if(obj1.sequenceNumber!="")
   seq.push(obj1.sequenceNumber);
   if(obj2.sequenceNumber!="")
   seq.push(obj2.sequenceNumber);
   if(obj2.sequenceNumber!="")
   seq.push(obj3.sequenceNumber);
    console.log("seqqqq===",seq);
   let data= seq.filter((item, index) => seq.indexOf(item) != index)
   console.log("duplicaac=",data);
    if(data.length>0){
      flag=false;
      this.snackBar.open('Duplicate Sequence', 'Close', {duration: 5000});
     // alert("Duplicate Sequence")
    }else{
      if(this.bannerConfigurationForm1.value.datafieldType!="")
      obj.push(this.bannerConfigurationForm1.value);
      if(this.bannerConfigurationForm2.value.datafieldType!="")
    obj.push(this.bannerConfigurationForm2.value);
    if(this.bannerConfigurationForm3.value.datafieldType!="")
    obj.push(this.bannerConfigurationForm3.value);
    console.log(obj);
  }
    if(flag){

    this.service.saveBanner(obj).subscribe(res=>{
      console.log(res);
      this.snackBar.open('Saved Successfully', 'Close', {duration: 5000});
      //alert("Saved Successfully")
    })
  }
  }
  getSelectedBlockData(value,banner){
    let value1=value.split('?')[0];
    value=value.split('?')[1];

    if(value1=='Event'){
     if(this.eventData.length!=0){
        this.setBannerData(banner,this.eventData)
      }
      else
    this.callService(value,banner);
    }
    if(value1=='Event'){
      if(this.eventData.length!=0){
        this.setBannerData(banner,this.eventData)
      }
      else
    this.callService(value,banner);
    }
    if(value1=='Article'){
      if(this.eventData.length!=0){
        this.setBannerData(banner,this.articleData)
      }
      else
    this.callService(value,banner);
    }

    if(value1=='Blogs'){
      if(this.eventData.length!=0){
        this.setBannerData(banner,this.blogData)
      }
      else
    this.callService(value,banner);
    }
    if(value1=='Videos'){
      if(this.eventData.length!=0){
        this.setBannerData(banner,this.videoData)
      }
      else
    this.callService(value,banner);
    }
    if(value1=='Whitepapers'){
      if(this.eventData.length!=0){
        this.setBannerData(banner,this.whitePaperData)
      }
      else
    this.callService(value,banner);
    }
    if(value1=='CaseStudies'){
      if(this.eventData.length!=0){
        this.setBannerData(banner,this.caseStudyData)
      }
      else
    this.callService(value,banner);
    }
    if(value1=='News'){
      if(this.eventData.length!=0){
        this.setBannerData(banner,this.newsData)
      }
      else
    this.callService(value,banner);
    }
  }
  setBannerData(banner,data){
    if(banner=='banner1')
    this.selectBlockData1=data;
    if(banner=='banner2')
    this.selectBlockData2=data;
    if(banner=='banner3')
    this.selectBlockData3=data;
  }
  callService(value,banner){
    this.service.getBannerBlockDetail(value).subscribe(res=>{
      console.log(res);
      if(banner=='banner1')
      this.selectBlockData1=res.body;
      if(banner=='banner2')
      this.selectBlockData2=res.body;
      if(banner=='banner3')
      this.selectBlockData3=res.body;
    })
  }
  getSelectedBlockData1(url){
    url=url.split('?')[1];
    console.log("urlllevent===",url);

   this.service.getBannerBlockDetail(url).subscribe(res=>{
      console.log(res);
      this.eventData=res.body;
    })
  }

  getSelectedBlockData2(url){
    url=url.split('?')[1];
   this.service.getBannerBlockDetail(url).subscribe(res=>{
      console.log(res);
      this.articleData=res.body;
    })
  }
  getSelectedBlockData3(url){
    url=url.split('?')[1];
   this.service.getBannerBlockDetail(url).subscribe(res=>{
      console.log(res);
      this.blogData=res.body;
    })
  }
  getSelectedBlockData4(url){
    url=url.split('?')[1];
   this.service.getBannerBlockDetail(url).subscribe(res=>{
      console.log(res);
      this.videoData=res.body;
    })
  }
  getSelectedBlockData5(url){
    url=url.split('?')[1];
   this.service.getBannerBlockDetail(url).subscribe(res=>{
      console.log(res);
      this.whitePaperData=res.body;
    })
  }
  getSelectedBlockData6(url){
    url=url.split('?')[1];
   this.service.getBannerBlockDetail(url).subscribe(res=>{
      console.log(res);
      this.caseStudyData=res.body;
    })
  }
  getSelectedBlockData7(url){
    url=url.split('?')[1];
   this.service.getBannerBlockDetail(url).subscribe(res=>{
      console.log(res);
      this.newsData=res.body;
    })
  }

  ///-------submit event
  submitEvent(){
    let obj:any[]=[];
    this.filterArrForBannerBlock.push(this.eventConfigurationForm.value.sequenceNumber)
    let data= this.filterArrForBannerBlock.filter((item, index) => this.filterArrForBannerBlock.indexOf(item) != index)


    if(data.length>0){

      const index = this.filterArrForBannerBlock.indexOf(data[0]);
        this.filterArrForBannerBlock.splice(index, 1);
      data=[];

    }
    else{
    obj.push(this.eventConfigurationForm.value);
     this.service.saveEventBlock('event',obj).subscribe(res=>{
       console.log(res);
       this.snackBar.open('Saved Successfully', 'Close', {duration: 5000});
        //alert("SUCCESS!!");
     })
    }
  }
  submitArticle(){
    let obj:any[]=[];
    this.filterArrForBannerBlock.push(this.articleConfigurationForm.value.sequenceNumber)
    let data= this.filterArrForBannerBlock.filter((item, index) => this.filterArrForBannerBlock.indexOf(item) != index)

    if(data.length>0){

      const index = this.filterArrForBannerBlock.indexOf(data[0]);
        this.filterArrForBannerBlock.splice(index, 1);
      data=[];
    }
    else{
      obj.push(this.articleConfigurationForm.value);
     this.service.saveRescourceBlock('article',obj).subscribe(res=>{
       console.log(res);
       this.snackBar.open('Saved Successfully', 'Close', {duration: 5000});
       //alert("SUCCESS!!");
     })
    }
  }
  submitBlog(){
    let obj:any[]=[];
    this.filterArrForBannerBlock.push(this.blogsConfigurationForm.value.sequenceNumber)
    let data= this.filterArrForBannerBlock.filter((item, index) => this.filterArrForBannerBlock.indexOf(item) != index)

    if(data.length>0){

      const index = this.filterArrForBannerBlock.indexOf(data[0]);
        this.filterArrForBannerBlock.splice(index, 1);
      data=[];
    }
    else{
      obj.push(this.blogsConfigurationForm.value);
     this.service.saveRescourceBlock('blog',obj).subscribe(res=>{
       console.log(res);
       this.snackBar.open('Saved Successfully', 'Close', {duration: 5000});
      // alert("SUCCESS!!");
     })
    }
  }
  submitVideo(){
    let obj:any[]=[];
    this.filterArrForBannerBlock.push(this.videosConfigurationForm.value.sequenceNumber)
    let data= this.filterArrForBannerBlock.filter((item, index) => this.filterArrForBannerBlock.indexOf(item) != index)

    if(data.length>0){

      const index = this.filterArrForBannerBlock.indexOf(data[0]);
        this.filterArrForBannerBlock.splice(index, 1);
      data=[];
    }
    else{
      obj.push(this.videosConfigurationForm.value);
     this.service.saveRescourceBlock('video',obj).subscribe(res=>{
       console.log(res);
       this.snackBar.open('Saved Successfully', 'Close', {duration: 5000});
      // alert("SUCCESS!!");
     })
    }
  }
  submitWhitpapers(){
    let obj:any[]=[];
    this.filterArrForBannerBlock.push(this.whitePaperConfigurationForm.value.sequenceNumber)
    let data= this.filterArrForBannerBlock.filter((item, index) => this.filterArrForBannerBlock.indexOf(item) != index)

    if(data.length>0){
  const index = this.filterArrForBannerBlock.indexOf(data[0]);
        this.filterArrForBannerBlock.splice(index, 1);
      data=[];
    }
    else{
      obj.push(this.whitePaperConfigurationForm.value);
     this.service.saveRescourceBlock('whitePapers',obj).subscribe(res=>{
       console.log(res);
       this.snackBar.open('Saved Successfully', 'Close', {duration: 5000});
      // alert("SUCCESS!!");
     })
    }
  }
  submitCases(){
    let obj:any[]=[];
    this.filterArrForBannerBlock.push(this.caseStudyConfigurationForm.value.sequenceNumber)
    let data= this.filterArrForBannerBlock.filter((item, index) => this.filterArrForBannerBlock.indexOf(item) != index)

    if(data.length>0){

     const index = this.filterArrForBannerBlock.indexOf(data[0]);
        this.filterArrForBannerBlock.splice(index, 1);
      data=[];
    }
    else{
      obj.push(this.caseStudyConfigurationForm.value);
     this.service.saveRescourceBlock('caseStudy',obj).subscribe(res=>{
       console.log(res);
       this.snackBar.open('Saved Successfully', 'Close', {duration: 5000});
       //alert("SUCCESS!!");
     })
    }
  }
  submitNews(){
    let obj:any[]=[];
    this.filterArrForBannerBlock.push(this.newsConfigurationForm.value.sequenceNumber)
    let data= this.filterArrForBannerBlock.filter((item, index) => this.filterArrForBannerBlock.indexOf(item) != index)

    if(data.length>0){

      const index = this.filterArrForBannerBlock.indexOf(data[0]);
      this.filterArrForBannerBlock.splice(index, 1);
    data=[];
    }
    else{
    obj.push(this.newsConfigurationForm.value);
     this.service.saveEventBlock('news',obj).subscribe(res=>{
       console.log(res);
       this.snackBar.open('Saved Successfully', 'Close', {duration: 5000});
       //alert("SUCCESS!!");
     })
    }
  }
}
