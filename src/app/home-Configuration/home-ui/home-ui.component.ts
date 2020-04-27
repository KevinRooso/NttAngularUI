import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/auth-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home-ui',
  templateUrl: './home-ui.component.html',
  styleUrls: ['./home-ui.component.css'],
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
  defaultImage = 'https://www.pakshows.pk/img/default-image.jpg';
  defaultProfile = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRq3gK2kpKsUiI3lL-U7uPUl_ET7zfXpPtSE9SghDF0_w4C2_9o&usqp=CAU';

  bannerData: any[] = [];
  resourceData: any[] = [];
  banner1Block = '';
  banner1SelectedValue = '';
  banner2Block = '';
  banner2SelectedValue = '';
  banner3Block = '';
  banner3SelectedValue = '';
  banner1Sequence;
  banner2Sequence;
  banner3Sequence;
  show = false;

  eventBlockData = '';
  articleBlockData = '';
  blogBlockData = '';
  videoBlockData = '';
  whitePaperBlockData = '';
  caseStudyBlockData = '';
  newsBlockData = '';
  testBlockData = '';
  publicFlag = true;
  pFlag = true;
  cFlag = false;

  bannerImage1 = '';
  bannerImage2 = '';
  bannerImage3 = '';

  eventId = '';
  // tslint:disable-next-line:no-input-rename
  @Input('userType') userType: string;
  @ViewChild('eventButton', { static: false }) eventButton;
  @ViewChild('articleButton', { static: false }) articleButton;
  @ViewChild('blogButton', { static: false }) blogButton;
  @ViewChild('videoButton', { static: false }) videoButton;
  @ViewChild('whitepaperButton', { static: false }) whitpaperButton;
  @ViewChild('caseButton', { static: false }) caseButton;
  @ViewChild('newsButton', { static: false }) newsButton;
  @ViewChild('testButton', { static: false }) testButton;

  users: any[] = [
    { id: 1, type: 'Customer' },
    { id: 2, type: 'Employee' },
    { id: 3, type: 'Public' },
  ];

  blocks: any[] = [
    { url: 'event?api/public/events', name: 'event', apiName: 'event' },
    { url: 'article?api/public/resources/articles', name: 'article', apiName: 'articles' },
    { url: 'blog?api/public/resources/blogs', name: 'blog', apiName: 'blogs' },
    { url: 'video?api/public/resources/videos', name: 'video', apiName: 'videos' },
    {
      url: 'whitepaper?api/public/resources/whitepapers',
      name: 'whitepaper',
      apiName: 'white papers',
    },
    {
      url: 'casestudy?api/public/resources/case-studies',
      name: 'casestudy',
      apiName: 'case studies',
    },
    { url: 'news?api/public/news', name: 'news', apiName: 'news' },
    { url: 'testimonial?api/public/resources/testimonials', name: 'testimonial', apiName: 'testimonials' },
  ];
  sequenceNumbersBanner: any[] = [1, 2, 3];
  sequenceNumbersBannerBlock: any[] = [1, 2, 3, 4, 5, 6, 7];
  filterArrForBannerBlock: any[] = [];

  constructor(private formBuilder: FormBuilder, private service: AuthServiceService, public snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.getHomepageData();
    this.createForms();
    this.getAllData();
  }
  createForms() {
    this.show = true;
    if (this.userType === 'public') {
      this.pFlag = true;
      this.cFlag = false;
    } else {
      this.pFlag = false;
      this.cFlag = true;
    }
    this.bannerConfigurationForm1 = this.formBuilder.group({
      public: [this.pFlag],
      customer: [this.cFlag],
      datafieldType: ['', Validators.required],
      dataFieldId: ['', Validators.required],
      sequenceNumber: ['', Validators.required],
    });
    this.bannerConfigurationForm2 = this.formBuilder.group({
      public: [this.pFlag],
      customer: [this.cFlag],
      datafieldType: ['', Validators.required],
      dataFieldId: ['', Validators.required],
      sequenceNumber: ['', Validators.required],
    });
    this.bannerConfigurationForm3 = this.formBuilder.group({
      public: [this.pFlag],
      customer: [this.cFlag],
      datafieldType: ['', Validators.required],
      dataFieldId: ['', Validators.required],
      sequenceNumber: ['', Validators.required],
    });
    this.eventConfigurationForm = this.formBuilder.group({
      public: [this.pFlag],
      customer: [this.cFlag],
      datafieldType: ['event', Validators.required],
      dataFieldId: ['', Validators.required],
      sequenceNumber: ['1'],
    });
    this.articleConfigurationForm = this.formBuilder.group({
      public: [this.pFlag],
      customer: [this.cFlag],
      datafieldType: ['article', Validators.required],
      dataFieldId: ['', Validators.required],
      sequenceNumber: ['1'],
    });
    this.blogsConfigurationForm = this.formBuilder.group({
      public: [this.pFlag],
      customer: [this.cFlag],
      datafieldType: ['blog', Validators.required],
      dataFieldId: ['', Validators.required],
      sequenceNumber: ['1'],
    });
    this.videosConfigurationForm = this.formBuilder.group({
      public: [this.pFlag],
      customer: [this.cFlag],
      datafieldType: ['video', Validators.required],
      dataFieldId: ['', Validators.required],
      sequenceNumber: ['1'],
    });
    this.whitePaperConfigurationForm = this.formBuilder.group({
      public: [this.pFlag],
      customer: [this.cFlag],
      datafieldType: ['whitepaper', Validators.required],
      dataFieldId: ['', Validators.required],
      sequenceNumber: ['1'],
    });
    this.caseStudyConfigurationForm = this.formBuilder.group({
      public: [this.pFlag],
      customer: [this.cFlag],
      datafieldType: ['caseStudy', Validators.required],
      dataFieldId: ['', Validators.required],
      sequenceNumber: ['1'],
    });
    this.newsConfigurationForm = this.formBuilder.group({
      public: [this.pFlag],
      customer: [this.cFlag],
      datafieldType: ['news', Validators.required],
      dataFieldId: ['', Validators.required],
      sequenceNumber: ['1'],
    });
    this.testConfigurationForm = this.formBuilder.group({
      public: [this.pFlag],
      customer: [this.cFlag],
      datafieldType: ['testimonial', Validators.required],
      dataFieldId: ['', Validators.required],
      sequenceNumber: ['1'],
    });
    this.show = false;
  }
  createForm() {
    this.publicFlag = !this.publicFlag;
  }
  getAllData() {
    this.show = true;
    this.service.getAllHomeData(this.userType).subscribe((res) => {
      this.bannerData = res.body.banners;
      this.resourceData = res.body.list;
      if (this.bannerData.length === 0 && this.resourceData.length === 0) {
        this.publicFlag = false;
      } else {
        this.bannerImage1 = this.bannerData.find((x) => x.sequenceNumber === 1).thumbnailImageUrl;

        this.bannerImage2 = this.bannerData.find((x) => x.sequenceNumber === 2).thumbnailImageUrl;

        this.bannerImage3 = this.bannerData.find((x) => x.sequenceNumber === 3).thumbnailImageUrl;

        if (this.bannerData.length === 1) {
          this.getGlobalDataForBanner1();
        }
        if (this.bannerData.length === 2) {
          this.getGlobalDataForBanner1();
          this.getGlobalDataForBanner2();
        }
        if (this.bannerData.length === 3) {
          this.getGlobalDataForBanner1();
          this.getGlobalDataForBanner2();
          this.getGlobalDataForBanner3();
        }
        this.resourceData.forEach((m) => {
          if (m.type === 'event') {
            this.eventBlockData = m.id;
            this.eventButton.nativeElement.click();
          }
          if (m.type === 'articles') {
            this.articleBlockData = m.id;
            this.articleButton.nativeElement.click();
          }
          if (m.type === 'blogs') {
            this.blogBlockData = m.id;
            this.blogButton.nativeElement.click();
          }
          if (m.type === 'videos') {
            this.videoBlockData = m.id;
            this.videoButton.nativeElement.click();
          }
          if (m.type === 'white papers') {
            this.whitePaperBlockData = m.id;
            this.whitpaperButton.nativeElement.click();
          }
          if (m.type === 'case studies') {
            this.caseStudyBlockData = m.id;
            this.caseButton.nativeElement.click();
          }
          if (m.type === 'news') {
            this.newsBlockData = m.id;
            this.newsButton.nativeElement.click();
          }
          if (m.type === 'testimonials') {
            this.testBlockData = m.id;
            this.testButton.nativeElement.click();
          }
        });
      }
      this.show = false;
    });
  }
  getGlobalDataForBanner1() {
    this.show = true;
    this.banner1Block = this.bannerData[0].type;
    this.banner1SelectedValue = this.bannerData[0].id;
    // this.bannerImage1=this.bannerData[0].thumbnailImageUrl;
    this.bannerConfigurationForm1.get(['datafieldType']).setValue(this.banner1Block);
    this.bannerConfigurationForm1.get(['dataFieldId']).setValue(this.banner1SelectedValue);
    this.bannerConfigurationForm1.get(['sequenceNumber']).setValue(this.bannerData[0].sequenceNumber);
    this.banner1Sequence = this.bannerData[0].sequenceNumber;
    const durl = this.blocks.find((x) => x.apiName === this.banner1Block).url.split('?')[1];
    this.service.getBannerBlockDetail(durl).subscribe((res) => {
      this.selectBlockData1 = res.body;

      this.show = false;
    });
  }

  getGlobalDataForBanner2() {
    this.show = true;
    this.banner2Block = this.bannerData[1].type;
    this.banner2SelectedValue = this.bannerData[1].id;
    //  this.bannerImage2=this.bannerData[1].thumbnailImageUrl;

    this.bannerConfigurationForm2.get(['datafieldType']).setValue(this.banner2Block);
    this.bannerConfigurationForm2.get(['dataFieldId']).setValue(this.banner2SelectedValue);
    this.bannerConfigurationForm2.get(['sequenceNumber']).setValue(this.bannerData[1].sequenceNumber);
    this.banner2Sequence = this.bannerData[1].sequenceNumber;
    const durl = this.blocks.find((x) => x.apiName === this.banner2Block).url.split('?')[1];
    this.service.getBannerBlockDetail(durl).subscribe((res) => {
      this.selectBlockData2 = res.body;
      this.show = false;
    });
  }
  getGlobalDataForBanner3() {
    this.show = true;
    this.banner3Block = this.bannerData[2].type;
    this.banner3SelectedValue = this.bannerData[2].id;
    // this.bannerImage3=this.bannerData[2].thumbnailImageUrl;
    this.bannerConfigurationForm3.get(['datafieldType']).setValue(this.banner3Block);
    this.bannerConfigurationForm3.get(['dataFieldId']).setValue(this.banner3SelectedValue);
    this.bannerConfigurationForm3.get(['sequenceNumber']).setValue(this.bannerData[2].sequenceNumber);
    this.banner3Sequence = this.bannerData[2].sequenceNumber;
    const durl = this.blocks.find((x) => x.apiName === this.banner3Block).url.split('?')[1];

    this.service.getBannerBlockDetail(durl).subscribe((res) => {
      this.selectBlockData3 = res.body;
      this.show = false;
    });
  }

  submit() {}
  submitBanner() {
    this.show = true;
    let flag = true;

    const obj: any[] = [];
    const obj1 = this.bannerConfigurationForm1.value;
    const obj2 = this.bannerConfigurationForm2.value;
    const obj3 = this.bannerConfigurationForm3.value;
    // tslint:disable-next-line:no-unused-expression
    this.blocks.find((x) => x.apiName === this.bannerConfigurationForm1.get(['datafieldType']).value).name;
    obj1.datafieldType = this.blocks.find((x) => x.apiName === this.bannerConfigurationForm1.get(['datafieldType']).value).name;
    obj2.datafieldType = this.blocks.find((x) => x.apiName === this.bannerConfigurationForm2.get(['datafieldType']).value).name;
    obj3.datafieldType = this.blocks.find((x) => x.apiName === this.bannerConfigurationForm3.get(['datafieldType']).value).name;
    const seq = [];
    if (obj1.sequenceNumber !== '' && obj1.sequenceNumber !== undefined) {
      seq.push(obj1.sequenceNumber);
    }
    if (obj2.sequenceNumber !== '' && obj2.sequenceNumber !== undefined) {
      seq.push(obj2.sequenceNumber);
    }
    if (obj2.sequenceNumber !== '' && obj3.sequenceNumber !== undefined) {
      seq.push(obj3.sequenceNumber);
    }
    const data = seq.filter((item, index) => seq.indexOf(item) !== index);

    if (data.length > 0) {
      flag = false;
      this.show = false;
      this.snackBar.open('Duplicate Sequence', 'Close', { duration: 5000 });
      // alert("Duplicate Sequence")
    } else {
      if (this.bannerConfigurationForm1.value.datafieldType !== '') {
        obj.push(this.bannerConfigurationForm1.value);
      }
      if (this.bannerConfigurationForm2.value.datafieldType !== '') {
        obj.push(this.bannerConfigurationForm2.value);
      }
      if (this.bannerConfigurationForm3.value.datafieldType !== '') {
        obj.push(this.bannerConfigurationForm3.value);
      }
    }
    if (flag) {
      this.service.saveBanner(obj).subscribe((_res) => {
        this.show = false;
        this.snackBar.open('Saved Successfully', 'Close', { duration: 5000 });
        // alert("Saved Successfully")
      });
    }
  }
  getSelectedBlockData(value, banner) {
    const value1 = this.blocks.find((x) => x.apiName === value).url.split('?')[0];
    value = this.blocks.find((x) => x.apiName === value).url.split('?')[1];
    if (value1 === 'event') {
      if (this.eventData.length !== 0) {
        this.setBannerData(banner, this.eventData);
      } else {
        this.callService(value, banner);
      }
    }
    // if(value1=='Event'){
    //   if(this.eventData.length!=0){
    //     this.setBannerData(banner,this.eventData)
    //   }
    //   else
    // this.callService(value,banner);
    // }
    if (value1 === 'article') {
      if (this.eventData.length !== 0) {
        this.setBannerData(banner, this.articleData);
      } else {
        this.callService(value, banner);
      }
    }

    if (value1 === 'blog') {
      if (this.eventData.length !== 0) {
        this.setBannerData(banner, this.blogData);
      } else {
        this.callService(value, banner);
      }
    }
    if (value1 === 'video') {
      if (this.eventData.length !== 0) {
        this.setBannerData(banner, this.videoData);
      } else {
        this.callService(value, banner);
      }
    }
    if (value1 === 'whitepaper') {
      if (this.eventData.length !== 0) {
        this.setBannerData(banner, this.whitePaperData);
      } else {
        this.callService(value, banner);
      }
    }
    if (value1 === 'caseStudies') {
      if (this.eventData.length !== 0) {
        this.setBannerData(banner, this.caseStudyData);
      } else {
        this.callService(value, banner);
      }
    }
    if (value1 === 'news') {
      if (this.eventData.length !== 0) {
        this.setBannerData(banner, this.newsData);
      } else {
        this.callService(value, banner);
      }
    }
    if (value1 === 'testimonials') {
      if (this.eventData.length !== 0) {
        this.setBannerData(banner, this.testData);
      } else {
        this.callService(value, banner);
      }
    }
  }
  setBannerData(banner, data) {
    if (banner === 'banner1') {
      this.selectBlockData1 = data;
    }
    if (banner === 'banner2') {
      this.selectBlockData2 = data;
    }
    if (banner === 'banner3') {
      this.selectBlockData3 = data;
    }
  }
  callService(value, banner) {
    this.show = true;
    this.service.getBannerBlockDetail(value).subscribe(
      (res) => {
        if (banner === 'banner1') {
          this.selectBlockData1 = res.body;
        }
        if (banner === 'banner2') {
          this.selectBlockData2 = res.body;
        }
        if (banner === 'banner3') {
          this.selectBlockData3 = res.body;
        }
        this.show = false;
      },
      (_error) => {
        this.show = false;
      }
    );
  }
  getSelectedBlockData1(url) {
    url = url.split('?')[1];
    if (this.eventData.length === 0) {
      this.show = true;
      this.service.getBannerBlockDetail(url).subscribe(
        (res) => {
          this.eventData = res.body;
          this.show = false;
        },
        (_error) => {
          this.show = false;
        }
      );
    }
  }

  getSelectedBlockData2(url) {
    url = url.split('?')[1];

    if (this.articleData.length === 0) {
      this.show = true;
      this.service.getBannerBlockDetail(url).subscribe(
        (res) => {
          this.articleData = res.body;
          this.show = false;
        },
        (_error) => {
          this.show = false;
        }
      );
    }
  }
  getSelectedBlockData3(url) {
    url = url.split('?')[1];

    if (this.blogData.length === 0) {
      this.show = true;
      this.service.getBannerBlockDetail(url).subscribe(
        (res) => {
          this.blogData = res.body;
          this.show = false;
        },
        (_error) => {
          this.show = false;
        }
      );
    }
  }
  getSelectedBlockData4(url) {
    url = url.split('?')[1];

    if (this.videoData.length === 0) {
      this.show = true;
      this.service.getBannerBlockDetail(url).subscribe(
        (res) => {
          this.videoData = res.body;
          this.show = false;
        },
        (_error) => {
          this.show = false;
        }
      );
    }
  }
  getSelectedBlockData5(url) {
    url = url.split('?')[1];

    if (this.whitePaperData.length === 0) {
      this.show = true;
      this.service.getBannerBlockDetail(url).subscribe(
        (res) => {
          this.whitePaperData = res.body;
          this.show = false;
        },
        (_error) => {
          this.show = false;
        }
      );
    }
  }
  getSelectedBlockData6(url) {
    url = url.split('?')[1];

    if (this.caseStudyData.length === 0) {
      this.show = true;
      this.service.getBannerBlockDetail(url).subscribe(
        (res) => {
          this.caseStudyData = res.body;
          this.show = false;
        },
        (_error) => {
          this.show = false;
        }
      );
    }
  }
  getSelectedBlockData7(url) {
    url = url.split('?')[1];

    if (this.newsData.length === 0) {
      this.show = true;
      this.service.getBannerBlockDetail(url).subscribe(
        (res) => {
          this.newsData = res.body;
          this.show = false;
        },
        (_error) => {
          this.show = false;
        }
      );
    }
  }
  getSelectedBlockData8(url) {
    url = url.split('?')[1];

    if (this.testData.length === 0) {
      this.show = true;
      this.service.getBannerBlockDetail(url).subscribe(
        (res) => {
          this.testData = res.body;
          this.show = false;
        },
        (_error) => {
          this.show = false;
        }
      );
    }
  }

  /// -------submit event
  submitEvent() {
    this.show = true;

    const obj: any[] = [];

    obj.push(this.eventConfigurationForm.value);

    this.service.saveEventBlock('event', obj).subscribe(
      (_res) => {
        this.snackBar.open('Saved Successfully', 'Close', { duration: 5000 });
        this.show = false;
      },
      (_error) => {
        this.show = false;
        this.snackBar.open('Oops, Something Went Wrong', 'Close', { duration: 5000 });
      }
    );
  }
  submitArticle() {
    this.show = true;
    const obj: any[] = [];

    obj.push(this.articleConfigurationForm.value);
    this.service.saveRescourceBlock('article', obj).subscribe(
      (_res) => {
        this.snackBar.open('Saved Successfully', 'Close', { duration: 5000 });
        this.show = false;
      },
      (_error) => {
        this.show = false;
        this.snackBar.open('Oops, Something Went Wrong', 'Close', { duration: 5000 });
      }
    );
  }
  submitBlog() {
    this.show = true;
    const obj: any[] = [];

    obj.push(this.blogsConfigurationForm.value);
    this.service.saveRescourceBlock('blog', obj).subscribe(
      (_res) => {
        this.snackBar.open('Saved Successfully', 'Close', { duration: 5000 });
        // alert("SUCCESS!!");
        this.show = false;
      },
      (_error) => {
        this.show = false;
        this.snackBar.open('Oops, Something Went Wrong', 'Close', { duration: 5000 });
      }
    );
  }
  submitVideo() {
    this.show = true;
    const obj: any[] = [];

    obj.push(this.videosConfigurationForm.value);
    this.service.saveRescourceBlock('video', obj).subscribe(
      (_res) => {
        this.snackBar.open('Saved Successfully', 'Close', { duration: 5000 });
        // alert("SUCCESS!!");
        this.show = false;
      },
      (_error) => {
        this.show = false;
        this.snackBar.open('Oops, Something Went Wrong', 'Close', { duration: 5000 });
      }
    );
  }
  submitWhitpapers() {
    this.show = true;
    const obj: any[] = [];

    obj.push(this.whitePaperConfigurationForm.value);
    this.service.saveRescourceBlock('whitepaper', obj).subscribe(
      (_res) => {
        this.snackBar.open('Saved Successfully', 'Close', { duration: 5000 });
        // alert("SUCCESS!!");
        this.show = false;
      },
      (_error) => {
        this.show = false;
        this.snackBar.open('Oops, Something Went Wrong', 'Close', { duration: 5000 });
      }
    );
  }
  submitCases() {
    this.show = true;
    const obj: any[] = [];

    obj.push(this.caseStudyConfigurationForm.value);
    this.service.saveRescourceBlock('caseStudy', obj).subscribe(
      (_res) => {
        this.snackBar.open('Saved Successfully', 'Close', { duration: 5000 });
        // alert("SUCCESS!!");
        this.show = false;
      },
      (_error) => {
        this.show = false;
        this.snackBar.open('Oops, Something Went Wrong', 'Close', { duration: 5000 });
      }
    );
  }
  submitNews() {
    this.show = true;
    const obj: any[] = [];

    obj.push(this.newsConfigurationForm.value);
    this.service.saveEventBlock('news', obj).subscribe(
      (_res) => {
        this.snackBar.open('Saved Successfully', 'Close', { duration: 5000 });
        // alert("SUCCESS!!");
        this.show = false;
      },
      (_error) => {
        this.show = false;
        this.snackBar.open('Oops, Something Went Wrong', 'Close', { duration: 5000 });
      }
    );
  }
  submitTest() {
    this.show = true;
    const obj: any[] = [];

    obj.push(this.testConfigurationForm.value);
    this.service.saveEventBlock('testimonial', obj).subscribe(
      (_res) => {
        this.snackBar.open('Saved Successfully', 'Close', { duration: 5000 });
        this.show = false;
      },
      (_error) => {
        this.show = false;
        this.snackBar.open('Oops, Something Went Wrong', 'Close', { duration: 5000 });
      }
    );
  }
  getHomepageData() {
    // this.getAllData();

    this.show = true;
    this.service.getAllHomeData(this.userType).subscribe((res) => {
      this.homePageData = res.body;
      this.homeBannerData = res.body.banners;
      this.homeListData = res.body.list;
      this.bannerData = this.homeBannerData;
      this.bannerImage1 = this.bannerData.find((x) => x.sequenceNumber === 1).thumbnailImageUrl;

      this.bannerImage2 = this.bannerData.find((x) => x.sequenceNumber === 2).thumbnailImageUrl;

      this.bannerImage3 = this.bannerData.find((x) => x.sequenceNumber === 3).thumbnailImageUrl;
      this.show = false;
    });
  }
}
