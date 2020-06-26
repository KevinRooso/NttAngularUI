import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/auth-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { CmsConstants } from 'src/app/cms-constants';
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
  newBannerData: any[] = [];
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
  errorFlag = false;
  bannerImage1 = '';
  bannerImage2 = '';
  bannerImage3 = '';

  eventId = '';
  globalFlag = true;
  formArr: number[] = [1];
  bannerEmittedData: any = {};
  listData: any = [];
  previewHomePageData: any = {};
  sequences: any = CmsConstants.HomeSequences;

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
  bannerLimit = 0;
  users: any[] = CmsConstants.users;

  blocks: any[] = CmsConstants.blocks;
  sequenceNumbersBanner: any[] = CmsConstants.HomeSequencesBanner;
  sequenceNumbersBannerBlock: any[] = CmsConstants.HomeSequencesBannerBlock;
  filterArrForBannerBlock: any[] = [];

  articleBlockSequnce = '';
  eventBlockSequnce = '';
  blogBlockSequnce = '';
  videoBlockSequnce = '';
  whitePaperBlockSequnce = '';
  caseStudyBlockSequnce = '';
  newsBlockSequnce = '';
  testimonialsBlockSequnce = '';

  constructor(private formBuilder: FormBuilder, private service: AuthServiceService, public snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.bannerLimit = environment.BANNER_LIMIT;

    this.createForms();
  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit() {
    this.getAllData(false);
  }
  getBanner(data: any) {
    this.errorFlag = false;
    this.globalFlag = true;
    this.bannerEmittedData = data;
    let duplicate = false;
    this.newBannerData = this.newBannerData.filter((el) => el.sequenceNumber !== this.bannerEmittedData.sequenceNumber);
    this.newBannerData.forEach((m) => {
      if (m.dataFieldId === this.bannerEmittedData.dataFieldId && m.datafieldType === this.bannerEmittedData.datafieldType) {
        duplicate = true;
      }
    });

    if (!duplicate) {
      this.bannerEmittedData.public = this.pFlag;
      this.bannerEmittedData.customer = this.cFlag;
      this.bannerEmittedData.datafieldType = this.blocks.find((x) => x.apiName === this.bannerEmittedData.datafieldType).name;
      this.newBannerData.push(this.bannerEmittedData);
    } else {
      this.globalFlag = false;
      this.errorFlag = true;
    }
  }
  addNewForm() {
    this.errorFlag = false;
    if (this.globalFlag && this.formArr.length === this.newBannerData.length) {
      this.formArr.push(this.formArr[this.formArr.length - 1] + 1);
    } else {
      this.errorFlag = true;
    }
  }
  removeBanner(seq: number) {
    this.errorFlag = false;
    let flag = false;
    //   for(let i=0;i<this.bannerData.length;i++){
    //     for(let j=0; j<this.newBannerData.length;j++){
    //       if(this.bannerData[i].sequenceNumber === this.newBannerData[j].sequenceNumber){
    //         console.log("insdiefi");
    //         flag=true;
    //       }
    //       else{
    //         flag=false;
    //       }
    //     }
    // }
    const data = this.bannerData.find((m) => m.sequenceNumber === seq);
    if (data !== undefined) {
      flag = true;
    }
    // if(this.newBannerData.length !== this.bannerData.length){
    //   console.log("insdiefi");
    //   flag=true;
    // }

    this.newBannerData = this.newBannerData.filter((el) => el.sequenceNumber !== seq);
    if (flag) {
      this.show = true;
      const reqObj = [];
      for (let i = 0; i < this.newBannerData.length; i++) {
        const bannerObj = {};
        const data1 = this.newBannerData[i];
        bannerObj['customer'] = this.userType !== 'public';
        bannerObj['dataFieldId'] = data1['id'] || data1['dataFieldId'];
        bannerObj['datafieldType'] = data1['type'] || data1['datafieldType'];
        bannerObj['public'] = this.userType === 'public';
        bannerObj['sequenceNumber'] = data1['sequenceNumber'];

        reqObj.push(bannerObj);
      }
      this.service.saveBanner(reqObj).subscribe(
        (_res) => {
          // this.bannerData=res.body;

          this.show = false;
        },
        (_error) => {
          this.show = false;
        }
      );
      this.formArr.splice(this.formArr.indexOf(seq), 1);
      this.bannerData = this.bannerData.filter((el) => el.sequenceNumber !== seq);
    } else {
      this.formArr.splice(this.formArr.indexOf(seq), 1);
    }
  }

  sortArray(a, b) {
    return a.sequenceNumber > b.sequenceNumber ? 1 : -1;
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
      blockSequenceNumber: ['', Validators.required],
    });
    this.articleConfigurationForm = this.formBuilder.group({
      public: [this.pFlag],
      customer: [this.cFlag],
      datafieldType: ['article', Validators.required],
      dataFieldId: ['', Validators.required],
      sequenceNumber: ['1'],
      blockSequenceNumber: ['', Validators.required],
    });
    this.blogsConfigurationForm = this.formBuilder.group({
      public: [this.pFlag],
      customer: [this.cFlag],
      datafieldType: ['blog', Validators.required],
      dataFieldId: ['', Validators.required],
      sequenceNumber: ['1'],
      blockSequenceNumber: ['', Validators.required],
    });
    this.videosConfigurationForm = this.formBuilder.group({
      public: [this.pFlag],
      customer: [this.cFlag],
      datafieldType: ['video', Validators.required],
      dataFieldId: ['', Validators.required],
      sequenceNumber: ['1'],
      blockSequenceNumber: ['', Validators.required],
    });
    this.whitePaperConfigurationForm = this.formBuilder.group({
      public: [this.pFlag],
      customer: [this.cFlag],
      datafieldType: ['whitepaper', Validators.required],
      dataFieldId: ['', Validators.required],
      sequenceNumber: ['1'],
      blockSequenceNumber: ['', Validators.required],
    });
    this.caseStudyConfigurationForm = this.formBuilder.group({
      public: [this.pFlag],
      customer: [this.cFlag],
      datafieldType: ['caseStudy', Validators.required],
      dataFieldId: ['', Validators.required],
      sequenceNumber: ['1'],
      blockSequenceNumber: ['', Validators.required],
    });
    this.newsConfigurationForm = this.formBuilder.group({
      public: [this.pFlag],
      customer: [this.cFlag],
      datafieldType: ['news', Validators.required],
      dataFieldId: ['', Validators.required],
      sequenceNumber: ['1'],
      blockSequenceNumber: ['', Validators.required],
    });
    this.testConfigurationForm = this.formBuilder.group({
      public: [this.pFlag],
      customer: [this.cFlag],
      datafieldType: ['testimonial', Validators.required],
      dataFieldId: ['', Validators.required],
      sequenceNumber: ['1'],
      blockSequenceNumber: ['', Validators.required],
    });
    this.show = false;
  }
  createForm() {
    this.publicFlag = !this.publicFlag;
  }
  getHomeData() {
    if (this.bannerData.length !== 0) {
      this.bannerData.sort(this.sortArray);
      this.formArr = [];
    }
    this.bannerData.forEach((_value, index) => {
      this.formArr.push(index + 1);
    });
    this.resourceData = [...this.listData];
    if (this.bannerData.length === 0 && this.resourceData.length === 0) {
      this.publicFlag = false;
    } else {
      this.resourceData.forEach((m) => {
        if (m.type === 'event') {
          this.eventBlockData = m.id;
          this.eventBlockSequnce = m.blockSequenceNumber;
          this.eventButton.nativeElement.click();
        }
        if (m.type === 'articles') {
          this.articleBlockData = m.id;
          this.articleBlockSequnce = m.blockSequenceNumber;
          this.articleButton.nativeElement.click();
        }
        if (m.type === 'blogs') {
          this.bannerConfigurationForm1.get(['datafieldType']);
          this.blogBlockData = m.id;
          this.blogBlockSequnce = m.blockSequenceNumber;
          this.blogButton.nativeElement.click();
        }
        if (m.type === 'videos') {
          this.videoBlockData = m.id;
          this.videoBlockSequnce = m.blockSequenceNumber;
          this.videoButton.nativeElement.click();
        }
        if (m.type === 'white papers') {
          this.whitePaperBlockData = m.id;
          this.whitePaperBlockSequnce = m.blockSequenceNumber;
          this.whitpaperButton.nativeElement.click();
        }
        if (m.type === 'case studies') {
          this.caseStudyBlockData = m.id;
          this.caseStudyBlockSequnce = m.blockSequenceNumber;
          this.caseButton.nativeElement.click();
        }
        if (m.type === 'news') {
          this.newsBlockData = m.id;
          this.newsBlockSequnce = m.blockSequenceNumber;
          this.newsButton.nativeElement.click();
        }
        if (m.type === 'testimonials') {
          this.testBlockData = m.id;
          this.testimonialsBlockSequnce = m.blockSequenceNumber;
          this.testButton.nativeElement.click();
        }
      });
    }
  }

  getHomePagePreviewData() {
    const previewData = { ...this.previewHomePageData };
    this.homePageData = previewData;
    this.homeBannerData = previewData.banners;
    this.homeListData = previewData.list;
    this.bannerData = this.homeBannerData;
  }

  getAllData(force: boolean) {
    const prevData = this.previewHomePageData;
    let prevCallApi = true;
    let configCallApi = true;
    if (!force) {
      if (prevData && prevData.banners && prevData.list && prevData.banners.length && prevData.list.length) {
        this.getHomePagePreviewData();
        prevCallApi = false;
      }

      if (this.bannerData.length && this.listData.length) {
        this.getHomeData();
        configCallApi = false;
      }
    }
    // dont call API if data is already present
    if (force || configCallApi || prevCallApi) {
      this.show = true;
      this.service.getAllHomeData(this.userType).subscribe((res) => {
        this.bannerData = [...res.body.banners];
        this.newBannerData = [...res.body.banners];
        this.listData = [...res.body.list];
        this.previewHomePageData = { ...res.body };
        this.getHomeData();
        this.getHomePagePreviewData();
        this.show = false;
      });
    }
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
    this.service.getBannerBlockDetail(durl, this.pFlag, this.cFlag).subscribe((res) => {
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
    this.service.getBannerBlockDetail(durl, this.pFlag, this.cFlag).subscribe((res) => {
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

    this.service.getBannerBlockDetail(durl, this.pFlag, this.cFlag).subscribe((res) => {
      this.selectBlockData3 = res.body;
      this.show = false;
    });
  }

  submit() {}
  submitBanner() {
    this.show = true;
    if (this.globalFlag && this.formArr.length === this.newBannerData.length) {
      const reqObj = [];
      for (let i = 0; i < this.newBannerData.length; i++) {
        const bannerObj = {};
        const data = this.newBannerData[i];
        bannerObj['customer'] = this.userType !== 'public';
        bannerObj['dataFieldId'] = data['id'] || data['dataFieldId'];
        bannerObj['datafieldType'] = data['datafieldType'] || this.blocks.find((x) => x.apiName === data['type']).name;
        bannerObj['public'] = this.userType === 'public';
        bannerObj['sequenceNumber'] = data['sequenceNumber'];
        bannerObj['blockSequenceNumber'] = '1';
        reqObj.push(bannerObj);
      }
      this.service.saveBanner(reqObj).subscribe(
        (res) => {
          this.show = false;
          if (res.httpStatus === 'BAD_REQUEST') {
            this.errorFlag = true;
          }
          if (res.httpStatus === 'OK') {
            this.snackBar.open('Saved Successfully', 'Close', { duration: 5000 });
          }
          // alert("Saved Successfully")
        },
        (_error) => {
          this.show = false;
        }
      );
    } else {
      this.show = false;
      this.errorFlag = true;
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
    this.service.getBannerBlockDetail(value, this.pFlag, this.cFlag).subscribe(
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
      this.service.getBannerBlockDetail(url, this.pFlag, this.cFlag).subscribe(
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
      this.service.getBannerBlockDetail(url, this.pFlag, this.cFlag).subscribe(
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
      this.service.getBannerBlockDetail(url, this.pFlag, this.cFlag).subscribe(
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
      this.service.getBannerBlockDetail(url, this.pFlag, this.cFlag).subscribe(
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
      this.service.getBannerBlockDetail(url, this.pFlag, this.cFlag).subscribe(
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
      this.service.getBannerBlockDetail(url, this.pFlag, this.cFlag).subscribe(
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
      this.service.getBannerBlockDetail(url, this.pFlag, this.cFlag).subscribe(
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
      this.service.getBannerBlockDetail(url, this.pFlag, this.cFlag).subscribe(
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
        this.snackBar.open('Try another block sequence number', 'Close', { duration: 5000 });
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
        this.snackBar.open('Try another block sequence number', 'Close', { duration: 5000 });
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
        this.snackBar.open('Try another block sequence number', 'Close', { duration: 5000 });
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
        this.snackBar.open('Try another block sequence number', 'Close', { duration: 5000 });
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
        this.snackBar.open('Try another block sequence number', 'Close', { duration: 5000 });
      }
    );
  }
  submitCases() {
    this.show = true;
    const obj: any[] = [];

    obj.push(this.caseStudyConfigurationForm.value);
    this.service.saveRescourceBlock('casestudy', obj).subscribe(
      (_res) => {
        this.snackBar.open('Saved Successfully', 'Close', { duration: 5000 });
        // alert("SUCCESS!!");
        this.show = false;
      },
      (_error) => {
        this.show = false;
        this.snackBar.open('Try another block sequence number', 'Close', { duration: 5000 });
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
        this.snackBar.open('Try another block sequence number', 'Close', { duration: 5000 });
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
        this.snackBar.open('Try another block sequence number', 'Close', { duration: 5000 });
      }
    );
  }

  getHomepageData() {
    // this.getAllData();
    // if(this.previewHomePageData && this.previewHomePageData.banners.length && this.previewHomePageData.list.length){
    //   this.getHomePagePreviewData(this.previewHomePageData);
    //   return true;
    // }
    // this.show = true;
    // this.service.getAllHomeData(this.userType).subscribe((res) => {
    //   this.getHomePagePreviewData(res.body);
    //   this.show = false;
    // });
  }
}
