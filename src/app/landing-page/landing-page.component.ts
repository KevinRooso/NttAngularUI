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

  // data:any[]=[];
  userdeviceData: any[];

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
    this.userDevice();
    this.resourceDownload();
    this.eventStatusDetails();
    this.eventTargetUserTypeDetails();
    this.users();

    this.eventCategoryTypeDetails();
  }

  // --------------------------Resources Graphs------------------------//

  resourceDownload() {
    this.service.getresourceDownloadDetails().subscribe((res) => {
      const userdeviceData = res.body;

      this.canvas = document.getElementById('resourceDownload');
      this.ctx = this.canvas.getContext('2d');
      // const myChart = new Chart(this.ctx, {
      // tslint:disable-next-line:no-unused-expression
      new Chart(this.ctx, {
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
    this.service.getUserDevices().subscribe((res) => {
      const userdeviceData = res.body;

      this.canvas = document.getElementById('userDeviceChart');
      this.ctx = this.canvas.getContext('2d');
      // tslint:disable-next-line:no-unused-expression
      new Chart(this.ctx, {
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
    this.service.getUsers().subscribe((res) => {
      const userdeviceData = res.body;

      this.canvas = document.getElementById('users');
      this.ctx = this.canvas.getContext('2d');
      // tslint:disable-next-line:no-unused-expression
      new Chart(this.ctx, {
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
    this.service.geteventStatusDetails().subscribe((res) => {
      const userdeviceData = res.body;

      this.canvas = document.getElementById('eventStatus');
      this.ctx = this.canvas.getContext('2d');
      // tslint:disable-next-line:no-unused-expression
      new Chart(this.ctx, {
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
    this.service.geteventTargetUserTypeDetails().subscribe((res) => {
      const userdeviceData = res.body;

      this.canvas = document.getElementById('eventTargetUserType');
      this.ctx = this.canvas.getContext('2d');
      // tslint:disable-next-line:no-unused-expression
      new Chart(this.ctx, {
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
    this.service.geteventCategoryTypeDetails().subscribe((res) => {
      const userdeviceData = res.body;
      // tslint:disable-next-line:no-unused-expression
      new Chart('eventCategoryType', {
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
}
