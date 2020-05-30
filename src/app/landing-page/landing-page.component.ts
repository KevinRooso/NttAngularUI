import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit, AfterViewInit {
  // title = 'chartjsangular';

  canvas: any;
  ctx: any;

  canvas1: any;
  ctx1: any;

  // canvas2 : any;
  // ctx2    : any;

  canvas3: any;
  ctx3: any;

  color1old: any;
  color2old: any;
  color3old: any;
  color4old: any;

  color1new: any;
  color2new: any;
  color3new: any;
  color4new: any;

  userdevchart = null;
  userchart = null;
  evstatuschart = null;
  evTarchart = null;
  evCategorychart = null;

  resdat = 'resdat';
  userdat = 'userdat';
  eventsdat = 'eventsdat';

  show = false;

  // data:any[]=[];
  userdeviceData: any[];
  reschart = null;

  constructor(private service: AuthServiceService) {
    this.color1old = '#32e6c5';
    this.color2old = '#9a58ed';
    this.color3old = '#27cdf2';
    this.color4old = '#f56953';

    this.color1new = '#1ad5b3';
    this.color2new = '#b788f2';
    this.color3new = '#0cc4ed';
    this.color4new = '#f56953';
  }

  ngOnInit() {
    // this.userDevice();
    // this.resourceDownload();
    // this.eventStatusDetails();
    // this.eventTargetUserTypeDetails();
    // this.users();
    // this.eventCategoryTypeDetails();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.userDevice();
      this.resourceDownload();
      this.eventStatusDetails();
      this.eventTargetUserTypeDetails();
      this.users();

      this.eventCategoryTypeDetails();
    });
  }

  // --------------------------Resources Graphs------------------------//

  resourceDownload() {
    let resParam;
    if (this.resdat === 'resdat') {
      resParam = '';
    } else {
      resParam = this.resdat;
    }

    this.show = true;
    this.service.getresourceDownloadDetails(resParam).subscribe((res) => {
      this.show = false;
      const userdeviceData = res.body;

      this.canvas = document.getElementById('resourceDownload');
      this.ctx = this.canvas.getContext('2d');
      // const myChart = new Chart(this.ctx, {
      // tslint:disable-next-line:no-unused-expression
      if (this.reschart !== null) {
        this.reschart.destroy();
      }
      this.reschart = new Chart(this.ctx, {
        type: 'bar',
        fontSize: 1,
        data: {
          labels: ['Article ', 'Casestudy', 'Whitepaper'],
          datasets: [
            {
              label: 'No. of resources',
              maxBarThickness: 30,
              data: [userdeviceData.totalArticleDownload, userdeviceData.totalCaseStudyDownload, userdeviceData.totalWhitepaperDownload],
              backgroundColor: [this.color1new, this.color2new, this.color3new, this.color4new],
              borderWidth: 1,
            },
          ],
        },
        options: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Resources Download',
          },
          responsive: false,
          display: true,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  stepSize: 5,
                },
              },
            ],
          },
        },
      });
    });
  }

  // -----------------------------Users Graphs---------------------------------//

  userDevice() {
    let userParam;
    if (this.userdat === 'userdat') {
      userParam = '';
    } else {
      userParam = this.userdat;
    }

    this.show = true;
    this.service.getUserDevices(userParam).subscribe((res) => {
      this.show = false;
      const userdeviceData = res.body;

      this.canvas = document.getElementById('userDeviceChart');
      this.ctx = this.canvas.getContext('2d');
      // tslint:disable-next-line:no-unused-expression
      if (this.userdevchart !== null) {
        this.userdevchart.destroy();
      }
      this.userdevchart = new Chart(this.ctx, {
        type: 'pie',
        data: {
          labels: ['Android ', 'iOS '],
          datasets: [
            {
              data: [userdeviceData.androidDevice, userdeviceData.iosDevice],
              backgroundColor: [this.color1new, this.color2new],
              hoverBorderColor: 'white',
              hoverBorderWidth: 5,
              cutoutPercentage: 15,
              borderWidth: 1,
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: 'User Devices',
          },
          responsive: false,
          display: true,
          legend: {
            position: 'right',
          },
        },
      });
    });
  }

  // Users

  users() {
    let userParam;
    if (this.userdat === 'userdat') {
      userParam = '';
    } else {
      userParam = this.userdat;
    }
    this.show = true;
    this.service.getUsers(userParam).subscribe((res) => {
      this.show = false;
      const userdeviceData = res.body;

      this.canvas = document.getElementById('users');
      this.ctx = this.canvas.getContext('2d');
      // tslint:disable-next-line:no-unused-expression
      if (this.userchart !== null) {
        this.userchart.destroy();
      }
      this.userchart = new Chart(this.ctx, {
        type: 'bar',
        data: {
          labels: ['Public ', 'Customer', 'Employee'],
          datasets: [
            {
              label: 'Number of users',
              maxBarThickness: 30,
              data: [userdeviceData.totalPublicUser, userdeviceData.totalCustomerUser, userdeviceData.totalEmployeeUser],
              backgroundColor: [this.color1new, this.color2new, this.color3new, this.color4new],
              borderWidth: 1,
            },
          ],
        },
        options: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: ' Number of users ',
          },
          responsive: false,
          display: true,
          scales: {
            yAxes: [
              {
                ticks: {
                  stepSize: 5,
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });
    });
  }

  // -------------------------------Events Graphs----------------------------------------//

  // Event Status
  eventStatusDetails() {
    let eventParam;
    if (this.eventsdat === 'eventsdat') {
      eventParam = '';
    } else {
      eventParam = this.eventsdat;
    }
    this.show = true;
    this.service.geteventStatusDetails(eventParam).subscribe((res) => {
      this.show = false;
      const userdeviceData = res.body;

      this.canvas = document.getElementById('eventStatus');
      this.ctx = this.canvas.getContext('2d');
      // tslint:disable-next-line:no-unused-expression
      if (this.evstatuschart !== null) {
        this.evstatuschart.destroy();
      }
      this.evstatuschart = new Chart(this.ctx, {
        type: 'pie',
        data: {
          labels: ['Published', 'Unpublished', 'Drafted', 'Expired'],
          datasets: [
            {
              data: [
                userdeviceData.totalPublishEvent,
                userdeviceData.totalActiveEvent,
                userdeviceData.totalDraftEvent,
                userdeviceData.totalExpiredEvent,
              ],
              backgroundColor: [this.color1new, this.color2new, this.color3new, this.color4new],
              hoverBorderColor: 'white',
              hoverBorderWidth: 5,
              cutoutPercentage: 15,
              borderWidth: 1,
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: 'Status',
          },
          responsive: false,
          display: true,
          legend: {
            position: 'right',
          },
        },
      });
    });
  }

  // Event Target Users
  eventTargetUserTypeDetails() {
    let eventParam;
    if (this.eventsdat === 'eventsdat') {
      eventParam = '';
    } else {
      eventParam = this.eventsdat;
    }
    this.show = true;
    this.service.geteventTargetUserTypeDetails(eventParam).subscribe((res) => {
      this.show = false;
      const userdeviceData = res.body;

      this.canvas = document.getElementById('eventTargetUserType');
      this.ctx = this.canvas.getContext('2d');
      // tslint:disable-next-line:no-unused-expression
      if (this.evTarchart !== null) {
        this.evTarchart.destroy();
      }
      this.evTarchart = new Chart(this.ctx, {
        type: 'bar',
        data: {
          labels: ['Public ', 'Customer', 'Employee'],
          datasets: [
            {
              label: 'No. of target users',
              maxBarThickness: 30,
              data: [userdeviceData.totalPublicEvent, userdeviceData.totalCustomerEvent, userdeviceData.totalEmployeeEvent],
              backgroundColor: [this.color1new, this.color2new, this.color3new, this.color4new],
              borderWidth: 1,
            },
          ],
        },
        options: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Target Users',
          },
          responsive: false,
          display: true,
          scales: {
            yAxes: [
              {
                ticks: {
                  stepSize: 10,
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });
    });
  }

  // Event Category
  eventCategoryTypeDetails() {
    let eventParam;
    if (this.eventsdat === 'eventsdat') {
      eventParam = '';
    } else {
      eventParam = this.eventsdat;
    }
    this.show = true;
    this.service.geteventCategoryTypeDetails(eventParam).subscribe((res) => {
      this.show = false;
      const userdeviceData = res.body;
      // tslint:disable-next-line:no-unused-expression
      if (this.evCategorychart !== null) {
        this.evCategorychart.destroy();
      }
      this.evCategorychart = new Chart('eventCategoryType', {
        type: 'doughnut',
        options: {
          responsive: true,
          title: {
            display: true,
            text: 'Categories',
          },
          legend: {
            position: 'right',
          },
          animation: {
            animateScale: true,
            animareRotate: true,
          },
        },
        data: {
          datasets: [
            {
              data: [
                userdeviceData.CloudComputing,
                userdeviceData.CloudComputingHybricloudDisasterRecovery,
                userdeviceData.Datacenter,
                userdeviceData.General,
              ],
              backgroundColor: [this.color1new, this.color2new, this.color3new, this.color4new],
              hoverBorderColor: 'white',
              hoverBorderWidth: 5,
              cutoutPercentage: 15,
              labels: 'Dataset 1',
            },
          ],
          labels: ['Computing', 'Recovery', 'Datacenter', 'General'],
        },
      });
    });
  }

  // Resource Graph Duration
  getResGraphData() {
    this.resourceDownload();
  }

  // User Graph Duration
  getUserGraphData() {
    this.userDevice();
    this.users();
  }

  // Event Graph Duration
  getEventGraphData() {
    this.eventStatusDetails();
    this.eventTargetUserTypeDetails();
    this.eventCategoryTypeDetails();
  }
}
