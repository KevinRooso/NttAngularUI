import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthServiceService } from "src/app/auth-service.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
declare var $;
@Component({
  selector: "app-configuration",
  templateUrl: "./configuration.component.html",
  styleUrls: ["./configuration.component.css"],
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

  bannerData: any[] = [];
  resourceData: any[] = [];
  banner1Block: string = "";
  banner1SelectedValue: string = "";
  banner2Block: string = "";
  banner2SelectedValue: string = "";
  banner3Block: string = "";
  banner3SelectedValue: string = "";

  eventBlockData: string = "";
  articleBlockData: string = "";
  blogBlockData: string = "";
  videoBlockData: string = "";
  whitePaperBlockData: string = "";
  caseStudyBlockData: string = "";
  newsBlockData: string = "";
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
  ];
  sequenceNumbersBanner: any[] = [1, 2, 3];
  sequenceNumbersBannerBlock: any[] = [1, 2, 3, 4, 5, 6, 7];
  filterArrForBannerBlock: any[] = [];
  @ViewChild("eventButton", { static: true }) eventButton;
  constructor(
    private formBuilder: FormBuilder,
    private service: AuthServiceService,
    private router1: ActivatedRoute,
    private router: Router,
    public snackBar: MatSnackBar
  ) {
    this.bannerConfigurationForm1 = formBuilder.group({
      public: [false, Validators.required],
      customer: [false, Validators.required],
      datafieldType: ["", Validators.required],
      dataFieldId: ["", Validators.required],
      sequenceNumber: ["", Validators.required],
    });
    this.bannerConfigurationForm2 = formBuilder.group({
      public: [false, Validators.required],
      customer: [false, Validators.required],
      datafieldType: ["", Validators.required],
      dataFieldId: ["", Validators.required],
      sequenceNumber: ["", Validators.required],
    });
    this.bannerConfigurationForm3 = formBuilder.group({
      public: [false, Validators.required],
      customer: [false, Validators.required],
      datafieldType: ["", Validators.required],
      dataFieldId: ["", Validators.required],
      sequenceNumber: ["", Validators.required],
    });
    this.eventConfigurationForm = formBuilder.group({
      public: [false, Validators.required],
      customer: [false, Validators.required],
      datafieldType: ["event", Validators.required],
      dataFieldId: ["", Validators.required],
      sequenceNumber: [""],
    });
    this.articleConfigurationForm = formBuilder.group({
      public: [false, Validators.required],
      customer: [false, Validators.required],
      datafieldType: ["article", Validators.required],
      dataFieldId: ["", Validators.required],
      sequenceNumber: [""],
    });
    this.blogsConfigurationForm = formBuilder.group({
      public: [false, Validators.required],
      customer: [false, Validators.required],
      datafieldType: ["blog", Validators.required],
      dataFieldId: ["", Validators.required],
      sequenceNumber: [""],
    });
    this.videosConfigurationForm = formBuilder.group({
      public: [false, Validators.required],
      customer: [false, Validators.required],
      datafieldType: ["videos", Validators.required],
      dataFieldId: ["", Validators.required],
      sequenceNumber: [""],
    });
    this.whitePaperConfigurationForm = formBuilder.group({
      public: [false, Validators.required],
      customer: [false, Validators.required],
      datafieldType: ["whitePapers", Validators.required],
      dataFieldId: ["", Validators.required],
      sequenceNumber: [""],
    });
    this.caseStudyConfigurationForm = formBuilder.group({
      public: [false, Validators.required],
      customer: [false, Validators.required],
      datafieldType: ["caseStudy", Validators.required],
      dataFieldId: ["", Validators.required],
      sequenceNumber: [""],
    });
    this.newsConfigurationForm = formBuilder.group({
      public: [false, Validators.required],
      customer: [false, Validators.required],
      datafieldType: ["news", Validators.required],
      dataFieldId: ["", Validators.required],
      sequenceNumber: [""],
    });
  }
  ngOnInit(): void {
    this.getAllData();
  }

  getAllData() {
    this.service.getAllHomeData().subscribe((res) => {
      this.bannerData = res.body.banners;
      this.resourceData = res.body.list;
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
      this.bannerData.forEach((m) => {
        if (m.type == "event") {
          this.eventButton.nativeElement.click();
          this.eventBlockData = this.resourceData[0].id;
        }
        console.log("eventblodat==", this.eventBlockData);
      });
    });
  }
  getGlobalDataForBanner1() {
    this.banner1Block = this.bannerData[0].type;

    console.log("res==", this.banner1Block);
    console.log(
      "res1==",
      this.blocks.find((x) => x.name === this.banner1Block).url
    );
    let durl = this.blocks
      .find((x) => x.name === this.banner1Block)
      .url.split("?")[1];
    this.service.getBannerBlockDetail(durl).subscribe((res) => {
      console.log("datatEs==", res);
      this.selectBlockData1 = res.body;
      console.log(
        "id==",
        this.selectBlockData1.find((x) => x.title === this.bannerData[0].title)
          .id
      );
      this.banner1SelectedValue = this.selectBlockData1.find(
        (x) => x.title === this.bannerData[0].title
      ).id;
      this.bannerConfigurationForm1
        .get(["datafieldType"])
        .setValue(this.banner1Block);
      this.bannerConfigurationForm1
        .get(["dataFieldId"])
        .setValue(this.banner1SelectedValue);
    });
  }

  getGlobalDataForBanner2() {
    this.banner2Block = this.bannerData[1].type;
    console.log("res==", this.banner2Block);
    console.log(
      "res1==",
      this.blocks.find((x) => x.name === this.banner2Block).url
    );
    let durl = this.blocks
      .find((x) => x.name === this.banner1Block)
      .url.split("?")[1];
    this.service.getBannerBlockDetail(durl).subscribe((res) => {
      console.log("datatEs==", res);
      this.selectBlockData2 = res.body;
      console.log("heee==", this.selectBlockData2[2].title);
      console.log("heeeee==", this.bannerData[1].title);
      console.log(
        "id==",
        this.selectBlockData2.find(
          (x) => x.title.trim() == this.bannerData[1].title.trim()
        )
      );
      this.banner2SelectedValue = this.selectBlockData2.find(
        (x) => x.title == this.bannerData[1].title
      ).id;
      this.bannerConfigurationForm2
        .get(["datafieldType"])
        .setValue(this.banner2Block);
      this.bannerConfigurationForm2
        .get(["dataFieldId"])
        .setValue(this.banner2SelectedValue);
    });
  }
  getGlobalDataForBanner3() {
    this.banner3Block = this.bannerData[2].type;
    console.log("res==", this.banner3Block);
    console.log(
      "res1==",
      this.blocks.find((x) => x.name === this.banner3Block).url
    );
    let durl = this.blocks
      .find((x) => x.name === this.banner3Block)
      .url.split("?")[1];
    this.service.getBannerBlockDetail(durl).subscribe((res) => {
      console.log("datatEs==", res);
      this.selectBlockData3 = res.body;
      console.log(
        "id==",
        this.selectBlockData3.find((x) => x.title === this.bannerData[2].title)
          .id
      );
      this.banner3SelectedValue = this.selectBlockData3.find(
        (x) => x.title === this.bannerData[2].title
      ).id;
      this.bannerConfigurationForm3
        .get(["datafieldType"])
        .setValue(this.banner3Block);
      this.bannerConfigurationForm3
        .get(["dataFieldId"])
        .setValue(this.banner3SelectedValue);
    });
  }

  submit() {}
  submitBanner() {
    let flag = true;
    console.log(this.bannerConfigurationForm1.value);

    let obj: any[] = [];
    let obj1 = this.bannerConfigurationForm1.value;
    let obj2 = this.bannerConfigurationForm2.value;
    let obj3 = this.bannerConfigurationForm3.value;
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
    if (obj1.sequenceNumber != "") seq.push(obj1.sequenceNumber);
    if (obj2.sequenceNumber != "") seq.push(obj2.sequenceNumber);
    if (obj2.sequenceNumber != "") seq.push(obj3.sequenceNumber);
    console.log("seqqqq===", seq);
    let data = seq.filter((item, index) => seq.indexOf(item) != index);
    console.log("duplicaac=", data);
    if (data.length > 0) {
      flag = false;
      this.snackBar.open("Duplicate Sequence", "Close", { duration: 5000 });
      // alert("Duplicate Sequence")
    } else {
      console.log(
        "datattyp==",
        this.bannerConfigurationForm1.value.datafieldType
      );

      if (this.bannerConfigurationForm1.value.datafieldType != "")
        obj.push(this.bannerConfigurationForm1.value);
      if (this.bannerConfigurationForm2.value.datafieldType != "")
        obj.push(this.bannerConfigurationForm2.value);
      if (this.bannerConfigurationForm3.value.datafieldType != "")
        obj.push(this.bannerConfigurationForm3.value);
      console.log("obj==", obj);
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
    console.log("myValu==", value, banner);

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
  }
  setBannerData(banner, data) {
    if (banner == "banner1") this.selectBlockData1 = data;
    if (banner == "banner2") this.selectBlockData2 = data;
    if (banner == "banner3") this.selectBlockData3 = data;
  }
  callService(value, banner) {
    this.service.getBannerBlockDetail(value).subscribe((res) => {
      console.log(res);
      if (banner == "banner1") this.selectBlockData1 = res.body;
      if (banner == "banner2") this.selectBlockData2 = res.body;
      if (banner == "banner3") this.selectBlockData3 = res.body;
    });
  }
  getSelectedBlockData1(url) {
    url = url.split("?")[1];
    console.log("urlllevent===", url);

    this.service.getBannerBlockDetail(url).subscribe((res) => {
      console.log(res);
      this.eventData = res.body;
      alert(this.resourceData[0].id);
      // this.eventBlockData = this.resourceData[0].id;
      $('#eventId').val(this.resourceData[0].id);
      alert($('#eventId').val());
    });
  }

  getSelectedBlockData2(url) {
    url = url.split("?")[1];
    this.service.getBannerBlockDetail(url).subscribe((res) => {
      console.log(res);
      this.articleData = res.body;
    });
  }
  getSelectedBlockData3(url) {
    url = url.split("?")[1];
    this.service.getBannerBlockDetail(url).subscribe((res) => {
      console.log(res);
      this.blogData = res.body;
    });
  }
  getSelectedBlockData4(url) {
    url = url.split("?")[1];
    this.service.getBannerBlockDetail(url).subscribe((res) => {
      console.log(res);
      this.videoData = res.body;
    });
  }
  getSelectedBlockData5(url) {
    url = url.split("?")[1];
    this.service.getBannerBlockDetail(url).subscribe((res) => {
      console.log(res);
      this.whitePaperData = res.body;
    });
  }
  getSelectedBlockData6(url) {
    url = url.split("?")[1];
    this.service.getBannerBlockDetail(url).subscribe((res) => {
      console.log(res);
      this.caseStudyData = res.body;
    });
  }
  getSelectedBlockData7(url) {
    url = url.split("?")[1];
    this.service.getBannerBlockDetail(url).subscribe((res) => {
      console.log(res);
      this.newsData = res.body;
    });
  }

  ///-------submit event
  submitEvent() {
    let obj: any[] = [];
    this.filterArrForBannerBlock.push(
      this.eventConfigurationForm.value.sequenceNumber
    );
    let data = this.filterArrForBannerBlock.filter(
      (item, index) => this.filterArrForBannerBlock.indexOf(item) != index
    );

    if (data.length > 0) {
      const index = this.filterArrForBannerBlock.indexOf(data[0]);
      this.filterArrForBannerBlock.splice(index, 1);
      data = [];
    } else {
      obj.push(this.eventConfigurationForm.value);
      this.service.saveEventBlock("event", obj).subscribe((res) => {
        console.log(res);
        this.snackBar.open("Saved Successfully", "Close", { duration: 5000 });
        //alert("SUCCESS!!");
      });
    }
  }
  submitArticle() {
    let obj: any[] = [];
    this.filterArrForBannerBlock.push(
      this.articleConfigurationForm.value.sequenceNumber
    );
    let data = this.filterArrForBannerBlock.filter(
      (item, index) => this.filterArrForBannerBlock.indexOf(item) != index
    );

    if (data.length > 0) {
      const index = this.filterArrForBannerBlock.indexOf(data[0]);
      this.filterArrForBannerBlock.splice(index, 1);
      data = [];
    } else {
      obj.push(this.articleConfigurationForm.value);
      this.service.saveRescourceBlock("article", obj).subscribe((res) => {
        console.log(res);
        this.snackBar.open("Saved Successfully", "Close", { duration: 5000 });
        //alert("SUCCESS!!");
      });
    }
  }
  submitBlog() {
    let obj: any[] = [];
    this.filterArrForBannerBlock.push(
      this.blogsConfigurationForm.value.sequenceNumber
    );
    let data = this.filterArrForBannerBlock.filter(
      (item, index) => this.filterArrForBannerBlock.indexOf(item) != index
    );

    if (data.length > 0) {
      const index = this.filterArrForBannerBlock.indexOf(data[0]);
      this.filterArrForBannerBlock.splice(index, 1);
      data = [];
    } else {
      obj.push(this.blogsConfigurationForm.value);
      this.service.saveRescourceBlock("blog", obj).subscribe((res) => {
        console.log(res);
        this.snackBar.open("Saved Successfully", "Close", { duration: 5000 });
        // alert("SUCCESS!!");
      });
    }
  }
  submitVideo() {
    let obj: any[] = [];
    this.filterArrForBannerBlock.push(
      this.videosConfigurationForm.value.sequenceNumber
    );
    let data = this.filterArrForBannerBlock.filter(
      (item, index) => this.filterArrForBannerBlock.indexOf(item) != index
    );

    if (data.length > 0) {
      const index = this.filterArrForBannerBlock.indexOf(data[0]);
      this.filterArrForBannerBlock.splice(index, 1);
      data = [];
    } else {
      obj.push(this.videosConfigurationForm.value);
      this.service.saveRescourceBlock("video", obj).subscribe((res) => {
        console.log(res);
        this.snackBar.open("Saved Successfully", "Close", { duration: 5000 });
        // alert("SUCCESS!!");
      });
    }
  }
  submitWhitpapers() {
    let obj: any[] = [];
    this.filterArrForBannerBlock.push(
      this.whitePaperConfigurationForm.value.sequenceNumber
    );
    let data = this.filterArrForBannerBlock.filter(
      (item, index) => this.filterArrForBannerBlock.indexOf(item) != index
    );

    if (data.length > 0) {
      const index = this.filterArrForBannerBlock.indexOf(data[0]);
      this.filterArrForBannerBlock.splice(index, 1);
      data = [];
    } else {
      obj.push(this.whitePaperConfigurationForm.value);
      this.service.saveRescourceBlock("whitePapers", obj).subscribe((res) => {
        console.log(res);
        this.snackBar.open("Saved Successfully", "Close", { duration: 5000 });
        // alert("SUCCESS!!");
      });
    }
  }
  submitCases() {
    let obj: any[] = [];
    this.filterArrForBannerBlock.push(
      this.caseStudyConfigurationForm.value.sequenceNumber
    );
    let data = this.filterArrForBannerBlock.filter(
      (item, index) => this.filterArrForBannerBlock.indexOf(item) != index
    );

    if (data.length > 0) {
      const index = this.filterArrForBannerBlock.indexOf(data[0]);
      this.filterArrForBannerBlock.splice(index, 1);
      data = [];
    } else {
      obj.push(this.caseStudyConfigurationForm.value);
      this.service.saveRescourceBlock("caseStudy", obj).subscribe((res) => {
        console.log(res);
        this.snackBar.open("Saved Successfully", "Close", { duration: 5000 });
        //alert("SUCCESS!!");
      });
    }
  }
  submitNews() {
    let obj: any[] = [];
    this.filterArrForBannerBlock.push(
      this.newsConfigurationForm.value.sequenceNumber
    );
    let data = this.filterArrForBannerBlock.filter(
      (item, index) => this.filterArrForBannerBlock.indexOf(item) != index
    );

    if (data.length > 0) {
      const index = this.filterArrForBannerBlock.indexOf(data[0]);
      this.filterArrForBannerBlock.splice(index, 1);
      data = [];
    } else {
      obj.push(this.newsConfigurationForm.value);
      this.service.saveEventBlock("news", obj).subscribe((res) => {
        console.log(res);
        this.snackBar.open("Saved Successfully", "Close", { duration: 5000 });
        //alert("SUCCESS!!");
      });
    }
  }
}
