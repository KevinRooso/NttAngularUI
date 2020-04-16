import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthServiceService } from "src/app/auth-service.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
declare var $;
@Component({
  selector: 'app-home-ui',
  templateUrl: './home-ui.component.html',
  styleUrls: ['./home-ui.component.css']
})
export class HomeUiComponent implements OnInit {

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
  testConfigurationForm: FormGroup;
  selectBlockData1: any[] = [];
  selectBlockData2: any[] = [];
  selectBlockData3: any[] = [];
  eventData: any[] = [];
  articleData: any[] = [];
  blogData: any[] = [];
  videoData: any[] = [];
  whitePaperData: any[] = [];
  caseStudyData: any[] = [];
  newsData: any[] = [];
  testData: any[] = [];
  homePageData: any[] = [];
  homeBannerData: any[] = [];
  homeListData: any[] = [];

  bannerData: any[] = [];
  resourceData: any[] = [];
  banner1Block: string = "";
  banner1SelectedValue: string = "";
  banner2Block: string = "";
  banner2SelectedValue: string = "";
  banner3Block: string = "";
  banner3SelectedValue: string = "";
  banner1Sequence;
  banner2Sequence;
  banner3Sequence;
  show = false;

  eventBlockData: string = "";
  articleBlockData: string = "";
  blogBlockData: string = "";
  videoBlockData: string = "";
  whitePaperBlockData: string = "";
  caseStudyBlockData: string = "";
  newsBlockData: string = "";
  testBlockData: string = "";
  publicFlag:boolean=true;
  pFlag:boolean=true;
  cFlag:boolean=false;

  eventId:string="";
  @Input('userType') userType: string;
  @ViewChild("eventButton", { static: false }) eventButton;
  @ViewChild("articleButton", { static: false }) articleButton;
  @ViewChild("blogButton", { static: false }) blogButton;
  @ViewChild("videoButton", { static: false }) videoButton;
  @ViewChild("whitepaperButton", { static: false }) whitpaperButton;
  @ViewChild("caseButton", { static: false }) caseButton;
  @ViewChild("newsButton", { static: false }) newsButton;
  @ViewChild("testButton", { static: false }) testButton;

  users: any[] = [
    { id: 1, type: "Customer" },
    { id: 2, type: "Employee" },
    { id: 3, type: "Public" },
  ];

  blocks: any[] = [
    { url: "event?api/public/events", name: "event" },
    { url: "articles?api/public/resources/articles", name: "articles" },
    { url: "blogs?api/public/resources/blogs", name: "blogs" },
    { url: "videos?api/public/resources/videos", name: "videos" },
    {
      url: "whitepapers?api/public/resources/whitepapers",
      name: "whitepapers",
    },
    {
      url: "caseStudies?api/public/resources/case-studies",
      name: "caseStudies",
    },
    { url: "news?api/public/news", name: "News" },
    { url: "testimonials?api/public/resources/testimonials", name: "Testimonials" },
  ];
  sequenceNumbersBanner: any[] = [1, 2, 3];
  sequenceNumbersBannerBlock: any[] = [1, 2, 3, 4, 5, 6, 7];
  filterArrForBannerBlock: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private service: AuthServiceService,
    private router1: ActivatedRoute,
    private router: Router,
    public snackBar: MatSnackBar
  ) {

  }
  ngOnInit(): void {
    console.log("usertype==",this.userType);

    this.getHomepageData();
    this.createForms();
    this.getAllData();
  }
  createForms(){
    if(this.userType=="public"){
      this.pFlag=true;
      this.cFlag=false;
    }
    else{
      this.pFlag=false;
      this.cFlag=true;
    }
    this.bannerConfigurationForm1 = this.formBuilder.group({
      public: [this.pFlag],
      customer: [this.cFlag],
      datafieldType: ["", Validators.required],
      dataFieldId: ["", Validators.required],
      sequenceNumber: ["", Validators.required],
    });
    this.bannerConfigurationForm2 = this.formBuilder.group({
      public: [this.pFlag],
      customer: [this.cFlag],
      datafieldType: ["", Validators.required],
      dataFieldId: ["", Validators.required],
      sequenceNumber: ["", Validators.required],
    });
    this.bannerConfigurationForm3 = this.formBuilder.group({
      public: [this.pFlag],
      customer: [this.cFlag],
      datafieldType: ["", Validators.required],
      dataFieldId: ["", Validators.required],
      sequenceNumber: ["", Validators.required],
    });
    this.eventConfigurationForm = this.formBuilder.group({
      public: [this.pFlag],
      customer: [this.cFlag],
      datafieldType: ["event", Validators.required],
      dataFieldId: ["", Validators.required],
      sequenceNumber: [""],
    });
    this.articleConfigurationForm = this.formBuilder.group({
      public: [this.pFlag],
      customer: [this.cFlag],
      datafieldType: ["article", Validators.required],
      dataFieldId: ["", Validators.required],
      sequenceNumber: [""],
    });
    this.blogsConfigurationForm = this.formBuilder.group({
      public: [this.pFlag],
      customer: [this.cFlag],
      datafieldType: ["blog", Validators.required],
      dataFieldId: ["", Validators.required],
      sequenceNumber: [""],
    });
    this.videosConfigurationForm = this.formBuilder.group({
      public: [this.pFlag],
      customer: [this.cFlag],
      datafieldType: ["videos", Validators.required],
      dataFieldId: ["", Validators.required],
      sequenceNumber: [""],
    });
    this.whitePaperConfigurationForm = this.formBuilder.group({
      public: [this.pFlag],
      customer: [this.cFlag],
      datafieldType: ["whitePapers", Validators.required],
      dataFieldId: ["", Validators.required],
      sequenceNumber: [""],
    });
    this.caseStudyConfigurationForm = this.formBuilder.group({
      public: [this.pFlag],
      customer: [this.cFlag],
      datafieldType: ["caseStudy", Validators.required],
      dataFieldId: ["", Validators.required],
      sequenceNumber: [""],
    });
    this.newsConfigurationForm = this.formBuilder.group({
      public: [this.pFlag],
      customer: [this.cFlag],
      datafieldType: ["news", Validators.required],
      dataFieldId: ["", Validators.required],
      sequenceNumber: [""],
    });
    this.testConfigurationForm = this.formBuilder.group({
      public: [this.pFlag],
      customer: [this.cFlag],
      datafieldType: ["testimonials", Validators.required],
      dataFieldId: ["", Validators.required],
      sequenceNumber: [""],
    });
  }
  createForm(){
    this.publicFlag=!this.publicFlag;
  }
  getAllData() {
    this.service.getAllHomeData(this.userType).subscribe((res) => {

      this.bannerData = res.body.banners;
      this.resourceData = res.body.list;
      if(this.bannerData.length==0 && this.resourceData.length==0){
          this.publicFlag=false;
      }
      else
     {
       if (this.bannerData.length == 1) {
        this.getGlobalDataForBanner1();
      }
      if (this.bannerData.length == 2) {
        this.getGlobalDataForBanner1();
        this.getGlobalDataForBanner2();
      }
      if (this.bannerData.length == 3) {
        this.getGlobalDataForBanner1();
        this.getGlobalDataForBanner2();
        this.getGlobalDataForBanner3();
      }
      this.resourceData.forEach((m) => {
        if (m.type == "event") {
          this.eventBlockData = m.id;
          this.eventButton.nativeElement.click();

        }
        if (m.type == "articles") {
          this.articleBlockData = m.id;
          this.articleButton.nativeElement.click();

        }
        if (m.type == "blogs") {
          this.blogBlockData = m.id;
          this.blogButton.nativeElement.click();

        }
        if (m.type == "videos") {
          this.videoBlockData = m.id;
          this.videoButton.nativeElement.click();

        }
        if (m.type == "whitepapers") {
          this.whitePaperBlockData = m.id;
          this.whitpaperButton.nativeElement.click();

        }
        if (m.type == "case studies") {
          this.caseStudyBlockData = m.id;
          this.caseButton.nativeElement.click();

        }
        if (m.type == "news") {
          this.newsBlockData = m.id;
          this.newsButton.nativeElement.click();

        }
        if (m.type == "testimonials") {
          this.testBlockData = m.id;
          this.testButton.nativeElement.click();

        }
      });

    }
    });
  }
  getGlobalDataForBanner1() {
    this.banner1Block = this.bannerData[0].type;
    this.banner1SelectedValue = this.bannerData[0].id;
    this.bannerConfigurationForm1
    .get(["datafieldType"])
    .setValue(this.banner1Block);
  this.bannerConfigurationForm1
    .get(["dataFieldId"])
    .setValue(this.banner1SelectedValue);
    this.bannerConfigurationForm1
    .get(["sequenceNumber"])
    .setValue("1");
    this.banner1Sequence=1;
    let durl = this.blocks
      .find((x) => x.name === this.banner1Block)
      .url.split("?")[1];
    this.service.getBannerBlockDetail(durl).subscribe((res) => {
      this.selectBlockData1 = res.body;



    });
  }

  getGlobalDataForBanner2() {
    this.banner2Block = this.bannerData[1].type;
    this.banner2SelectedValue = this.bannerData[1].id;
    this.bannerConfigurationForm2
    .get(["datafieldType"])
    .setValue(this.banner2Block);
  this.bannerConfigurationForm2
    .get(["dataFieldId"])
    .setValue(this.banner2SelectedValue);
    this.bannerConfigurationForm2
    .get(["sequenceNumber"])
    .setValue("2");
    this.banner2Sequence=2;
    let durl = this.blocks
      .find((x) => x.name === this.banner1Block)
      .url.split("?")[1];
    this.service.getBannerBlockDetail(durl).subscribe((res) => {
      this.selectBlockData2 = res.body;



    });
  }
  getGlobalDataForBanner3() {
    this.banner3Block = this.bannerData[2].type;
    this.banner3SelectedValue=this.bannerData[2].id;
    this.bannerConfigurationForm3
        .get(["datafieldType"])
        .setValue(this.banner3Block);
      this.bannerConfigurationForm3
        .get(["dataFieldId"])
        .setValue(this.banner3SelectedValue);
        this.bannerConfigurationForm3
    .get(["sequenceNumber"])
    .setValue("3");
    this.banner3Sequence=3;
    let durl = this.blocks.find((x) => x.name === this.banner3Block)
      .url.split("?")[1];

    this.service.getBannerBlockDetail(durl).subscribe((res) => {

      this.selectBlockData3 = res.body;

    });
  }

  submit() {}
  submitBanner() {
    let flag = true;

    let obj: any[] = [];
    let obj1 = this.bannerConfigurationForm1.value;
    let obj2 = this.bannerConfigurationForm2.value;
    let obj3 = this.bannerConfigurationForm3.value;
    console.log(obj1);
    console.log(obj2);
    console.log(obj3);

    obj1.datafieldType = this.bannerConfigurationForm1
      .get(["datafieldType"])
      .value.split("?")[0];
    obj2.datafieldType = this.bannerConfigurationForm2
      .get(["datafieldType"])
      .value.split("?")[0];
    obj3.datafieldType = this.bannerConfigurationForm3
      .get(["datafieldType"])
      .value.split("?")[0];
    let seq = [];
    if (obj1.sequenceNumber != "" && obj1.sequenceNumber != undefined) seq.push(obj1.sequenceNumber);
    if (obj2.sequenceNumber != "" && obj2.sequenceNumber != undefined) seq.push(obj2.sequenceNumber);
    if (obj2.sequenceNumber != "" && obj3.sequenceNumber != undefined) seq.push(obj3.sequenceNumber);
    console.log("seqqq==",seq);
    let data = seq.filter((item, index) => seq.indexOf(item) != index);

    if (data.length > 0) {
      flag = false;
      this.snackBar.open("Duplicate Sequence", "Close", { duration: 5000 });
      // alert("Duplicate Sequence")
    } else {


      if (this.bannerConfigurationForm1.value.datafieldType != "")
        obj.push(this.bannerConfigurationForm1.value);
      if (this.bannerConfigurationForm2.value.datafieldType != "")
        obj.push(this.bannerConfigurationForm2.value);
      if (this.bannerConfigurationForm3.value.datafieldType != "")
        obj.push(this.bannerConfigurationForm3.value);

    }
    if (flag) {
      this.service.saveBanner(obj).subscribe((res) => {
        console.log(res);
        this.snackBar.open("Saved Successfully", "Close", { duration: 5000 });
        //alert("Saved Successfully")
      });
    }

  }
  getSelectedBlockData(value, banner) {

    let value1 = this.blocks.find((x) => x.name === value).url.split("?")[0];
    value = this.blocks.find((x) => x.name === value).url.split("?")[1];

    if (value1 == "event") {
      if (this.eventData.length != 0) {
        this.setBannerData(banner, this.eventData);
      } else this.callService(value, banner);
    }
    // if(value1=='Event'){
    //   if(this.eventData.length!=0){
    //     this.setBannerData(banner,this.eventData)
    //   }
    //   else
    // this.callService(value,banner);
    // }
    if (value1 == "articles") {
      if (this.eventData.length != 0) {
        this.setBannerData(banner, this.articleData);
      } else this.callService(value, banner);
    }

    if (value1 == "blogs") {
      if (this.eventData.length != 0) {
        this.setBannerData(banner, this.blogData);
      } else this.callService(value, banner);
    }
    if (value1 == "videos") {
      if (this.eventData.length != 0) {
        this.setBannerData(banner, this.videoData);
      } else this.callService(value, banner);
    }
    if (value1 == "whitepapers") {
      if (this.eventData.length != 0) {
        this.setBannerData(banner, this.whitePaperData);
      } else this.callService(value, banner);
    }
    if (value1 == "caseStudies") {
      if (this.eventData.length != 0) {
        this.setBannerData(banner, this.caseStudyData);
      } else this.callService(value, banner);
    }
    if (value1 == "news") {
      if (this.eventData.length != 0) {
        this.setBannerData(banner, this.newsData);
      } else this.callService(value, banner);
    }
    if (value1 == "testimonials") {
      if (this.eventData.length != 0) {
        this.setBannerData(banner, this.testData);
      } else this.callService(value, banner);
    }
  }
  setBannerData(banner, data) {
    if (banner == "banner1") this.selectBlockData1 = data;
    if (banner == "banner2") this.selectBlockData2 = data;
    if (banner == "banner3") this.selectBlockData3 = data;
  }
  callService(value, banner) {
    this.service.getBannerBlockDetail(value).subscribe((res) => {
     if (banner == "banner1") this.selectBlockData1 = res.body;
      if (banner == "banner2") this.selectBlockData2 = res.body;
      if (banner == "banner3") this.selectBlockData3 = res.body;
    });
  }
  getSelectedBlockData1(url) {
    url = url.split("?")[1];

    this.service.getBannerBlockDetail(url).subscribe((res) => {
      this.eventData = res.body;
     // alert(this.resourceData[0].id);
      // this.eventBlockData = this.resourceData[0].id;
      $('#eventId').val(this.resourceData[0].id);
     // alert($('#eventId').val());
    });
  }

  getSelectedBlockData2(url) {
    url = url.split("?")[1];
    this.service.getBannerBlockDetail(url).subscribe((res) => {
     this.articleData = res.body;
    });
  }
  getSelectedBlockData3(url) {
    url = url.split("?")[1];
    this.service.getBannerBlockDetail(url).subscribe((res) => {
      this.blogData = res.body;
    });
  }
  getSelectedBlockData4(url) {
    url = url.split("?")[1];
    this.service.getBannerBlockDetail(url).subscribe((res) => {
      this.videoData = res.body;
    });
  }
  getSelectedBlockData5(url) {
    url = url.split("?")[1];

    this.service.getBannerBlockDetail(url).subscribe((res) => {
    this.whitePaperData = res.body;
    });
  }
  getSelectedBlockData6(url) {
    url = url.split("?")[1];
    this.service.getBannerBlockDetail(url).subscribe((res) => {
      this.caseStudyData = res.body;
    });
  }
  getSelectedBlockData7(url) {
    url = url.split("?")[1];
    this.service.getBannerBlockDetail(url).subscribe((res) => {
     this.newsData = res.body;
    });
  }

  getSelectedBlockData8(url) {
    url = url.split("?")[1];

    this.service.getBannerBlockDetail(url).subscribe((res) => {
      this.testData = res.body;
    });
  }

  ///-------submit event
  submitEvent() {
    console.log("event");

    let obj: any[] = [];

      obj.push(this.eventConfigurationForm.value);
      console.log(obj);

      this.service.saveEventBlock("event", obj).subscribe((res) => {
       this.snackBar.open("Saved Successfully", "Close", { duration: 5000 });
        //alert("SUCCESS!!");
      });

  }
  submitArticle() {
    console.log("article");
    let obj: any[] = [];

      obj.push(this.articleConfigurationForm.value);
      console.log(obj);
      this.service.saveRescourceBlock("article", obj).subscribe((res) => {
        this.snackBar.open("Saved Successfully", "Close", { duration: 5000 });
        //alert("SUCCESS!!");
      });

  }
  submitBlog() {
    let obj: any[] = [];

      obj.push(this.blogsConfigurationForm.value);
      console.log(obj);
      this.service.saveRescourceBlock("blog", obj).subscribe((res) => {
        this.snackBar.open("Saved Successfully", "Close", { duration: 5000 });
        // alert("SUCCESS!!");
      });

  }
  submitVideo() {
    let obj: any[] = [];

      obj.push(this.videosConfigurationForm.value);
      console.log(obj);
      this.service.saveRescourceBlock("video", obj).subscribe((res) => {
        this.snackBar.open("Saved Successfully", "Close", { duration: 5000 });
        // alert("SUCCESS!!");
      });

  }
  submitWhitpapers() {
    let obj: any[] = [];

      obj.push(this.whitePaperConfigurationForm.value);
      console.log(obj);
      this.service.saveRescourceBlock("whitePapers", obj).subscribe((res) => {
        console.log("resss=",res);

       this.snackBar.open("Saved Successfully", "Close", { duration: 5000 });
        // alert("SUCCESS!!");
      });

  }
  submitCases() {
    let obj: any[] = [];

      obj.push(this.caseStudyConfigurationForm.value);
      console.log(obj);
      this.service.saveRescourceBlock("caseStudy", obj).subscribe((res) => {
       this.snackBar.open("Saved Successfully", "Close", { duration: 5000 });
        //alert("SUCCESS!!");
      });

  }
  submitNews() {
    let obj: any[] = [];

      obj.push(this.newsConfigurationForm.value);
      console.log(obj);
      this.service.saveEventBlock("news", obj).subscribe((res) => {
        this.snackBar.open("Saved Successfully", "Close", { duration: 5000 });
        //alert("SUCCESS!!");
      });

  }
  submitTest() {
    let obj: any[] = [];
    console.log("testtt==",this.testConfigurationForm.value);

      obj.push(this.testConfigurationForm.value);
      console.log(obj);
      this.service.saveEventBlock("testimonials", obj).subscribe((res) => {
        console.log("res==",res);

         this.snackBar.open("Saved Successfully", "Close", { duration: 5000 });
        //alert("SUCCESS!!");
      });

  }
  getHomepageData(){
    this.show = true;
    this.service.getAllHomeData(this.userType).subscribe((res) => {
      this.homePageData = res.body;
      this.homeBannerData = res.body.banners;
      this.homeListData = res.body.list;
      console.log("HomeData",this.homePageData);
      console.log("BannerData",this.homeBannerData);
      console.log("ListData",this.homeListData);
    });
    this.show= false;
  }
}
