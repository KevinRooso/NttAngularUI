import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import  {Chart} from 'chart.js';
import { AuthServiceService } from '../auth-service.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  // title = 'chartjsangular';

  canvas  : any;
  ctx     : any;

  canvas1 : any;
  ctx1    : any;

  // canvas2 : any;
  // ctx2    : any;

  canvas3 : any;
  ctx3    : any;
  LineChart=[];
  data=[];

  constructor( private service:AuthServiceService, private queryString:ActivatedRoute) { }


  ngOnInit() {
    this.eventCategoryTypeDetails();
    this.userDevice();
    this.resourceDownload();
    this.eventStatusDetails();
    this.eventTargetUserTypeDetails();
    this.users();

    // this.eventCategoryTypeDetailsTest();

    this.canvas = document.getElementById('respie');
    this.ctx = this.canvas.getContext('2d');
    let myChart = new Chart(this.ctx, {
      type: 'pie',
      data: {
          labels: ["New", "Progress", "Hold"],
          datasets: [{
              label: '# of Votes',
              data: [1,8,20],
              backgroundColor: [
                '#753BBD',
                '#0FC8F2',
                '#2CD5B6',
                '#E6442B'
            ],
              borderWidth: 1
          }]
      },
      options: {
        title:{
          display:true,
          text:'Resource'
        },
        responsive: false,
        display:true
      }
    });




    new Chart('resdoughnut',{
      type:'doughnut',
      options:{
        responsive:true,
        title:{
          display:true,
          text:'Doughnut Chart'
        }, legend:{
          position:'top',
        }, animation:{
          animateScale:true,
          animareRotate:true
        }
      },
      data:{
        datasets:[{
          data:[45,10,5,25,15],
          backgroundColor:["red","orange","yellow","green","blue"],
          labels:'Dataset 1'
        }],
        labels:['Red','Orange','Yellow','Green','Blue']
      }
    });
    new Chart('doughnut',{
      type:'doughnut',
      options:{
        responsive:true,
        title:{
          display:true,
          text:'Doughnut Chart'
        }, legend:{
          position:'top',
        }, animation:{
          animateScale:true,
          animareRotate:true
        }
      },
      data:{
        datasets:[{
          data:[45,10,5,25,15],
          backgroundColor:["red","orange","yellow","green","blue"],
          labels:'Dataset 1'
        }],
        labels:['Red','Orange','Yellow','Green','Blue']
      }
    });

    new Chart('userdoughnut',{
      type:'doughnut',
      options:{
        responsive:true,
        title:{
          display:true,
          text:'Doughnut Chart'
        }, legend:{
          position:'top',
        }, animation:{
          animateScale:true,
          animareRotate:true
        }
      },
      data:{
        datasets:[{
          data:[45,10,5,25,15],
          backgroundColor:["red","orange","yellow","green"],
          labels:'Dataset 1'
        }],
        labels:['Red','Orange','Yellow','Green']
      }
    });
    new Chart('doughnut',{
      type:'doughnut',
      options:{
        responsive:true,
        title:{
          display:true,
          text:'Doughnut Chart'
        }, legend:{
          position:'top',
        }, animation:{
          animateScale:true,
          animareRotate:true
        }
      },
    });
  }

//Resources Graphs

  resourceDownload(){
    this.service.getresourceDownloadDetails()
    .subscribe(res =>{
      console.log(res.body)

      let userdeviceData=res.body;

      this.canvas = document.getElementById('resourceDownload');
      this.ctx = this.canvas.getContext('2d');
      let myChart = new Chart(this.ctx, {
        type: 'bar',
        fontSize:1,
        data: {
            labels: [ "Article ","Casestudy","Whitepaper"],
            datasets: [{
              label:"No. of resources",
              maxBarThickness: 30,
            // borderColor: "blue",
            // hoverBackgroundColor: "rgba(255,99,132,0.4)",
            // hoverBorderColor: "rgba(255,99,132,1)",


                data: [(userdeviceData.totalArticleDownload ),(userdeviceData.totalCaseStudyDownload ),
                  (userdeviceData.totalWhitepaperDownload)],
                backgroundColor: [
                  '#2CD5B6',
                  '#0FC8F2',
                  '#753BBD',
                  '#E6442B'
              ],
                borderWidth: 1
            },]
        },
        options: {
          legend: {
            label: {

                // This more specific font property overrides the global property


            }
        },
          title:{
            display:true,
            text:'Resources Download'
          },
          responsive: false,
          display:true,
          scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true,
                    stepSize:5,
                }
            }]
        }
        }
      });
    })
  }

  //Users Graphs

  userDevice(){
    this.service.getUserDevices()
    .subscribe(res =>{
      console.log(res.body)

      let userdeviceData=res.body;

      this.canvas = document.getElementById('userDeviceChart');
      this.ctx = this.canvas.getContext('2d');
      let myChart = new Chart(this.ctx, {
        type: 'pie',
        data: {
            labels: ["Android ", "iOS "],
            datasets: [{
                data: [(userdeviceData.androidDevice ), (userdeviceData.iosDevice )],
                backgroundColor: [
                    '#2CD5B6',
                    '#0FC8F2',
                ],
                borderWidth: 1
            }]
        },
        options: {
          title:{
            display:true,
            text:'User Devices'
          },
          responsive: false,
          display:true
        }
      });
    })
  }

  users(){
    this.service.getUsers()
    .subscribe(res =>{
      console.log(res.body)

      let userdeviceData=res.body;

      this.canvas = document.getElementById('users');
      this.ctx = this.canvas.getContext('2d');
      let myChart = new Chart(this.ctx, {
        type: 'bar',
        data: {
            labels: ["Public ","Customer","Employee"],
            datasets: [{
              label:"No. of users",
              maxBarThickness: 30,
                data: [(userdeviceData.totalPublicUser),
                  (userdeviceData.totalCustomerUser ),(userdeviceData.totalEmployeeUser )],
                backgroundColor: [
                    '#2CD5B6',
                    '#0FC8F2',
                    '#753BBD',
                    '#E6442B'
                ],
                borderWidth: 1
            }]
        },
        options: {
          title:{
            display:true,
            text:' No. of Users '
          },
          responsive: false,
          display:true,
          scales: {
            yAxes: [{
                ticks: {
                  stepSize: 5,
                    beginAtZero:true
                }
            }]
        }
        }
      });
    })
  }


//---------Events Graphs---------//

//Event Status
  eventStatusDetails(){
    this.service.geteventStatusDetails()
    .subscribe(res =>{
      console.log(res.body)

      let userdeviceData=res.body;

      this.canvas = document.getElementById('eventStatus');
      this.ctx = this.canvas.getContext('2d');
      let myChart = new Chart(this.ctx, {
        type: 'pie',
        data: {
            labels: [ "Publish","Active","Draft"],
            datasets: [{
                data: [(userdeviceData.totalPublishEvent ),
                  (userdeviceData.totalActiveEvent ),(userdeviceData.totalDraftEvent )],
                backgroundColor: [
                  '#753BBD',
                  '#0FC8F2',
                  '#2CD5B6',
                  '#E6442B'
              ],
                borderWidth: 1
            },
          ]
        },
        options: {
          title:{
            display:true,
            text:'Status'
          },
          responsive: false,
          display:true
        }
      });
    })
  }

  //Event Target Users
  eventTargetUserTypeDetails(){
    this.service.geteventTargetUserTypeDetails()
    .subscribe(res =>{
      console.log(res.body)

      let userdeviceData=res.body;

      this.canvas = document.getElementById('eventTargetUserType');
      this.ctx = this.canvas.getContext('2d');
      let myChart = new Chart(this.ctx, {
        type: 'bar',
        data: {
            labels: [ "Public ","Customer","Employee"],
            datasets: [{
              label:"No. of target users",
              maxBarThickness: 30,
                data: [ (userdeviceData.totalPublicEvent),
                  (userdeviceData.totalCustomerEvent ),(userdeviceData.totalEmployeeEvent )],
                backgroundColor: [
                  '#2CD5B6',
                  '#0FC8F2',
                  '#753BBD',
                  '#E6442B'
              ],
                borderWidth: 1
            }]
        },
        options: {
          title:{
            display:true,
            text:'Target Users'
          },
          responsive: false,
          display:true,
          scales: {
            yAxes: [{
                ticks: {
                  stepSize:10,
                    beginAtZero:true
                }
            }]
        }
        }
      });
    })
  }

//Event Category

  eventCategoryTypeDetails(){
    this.service.geteventCategoryTypeDetails()
    .subscribe(res =>{
      console.log(res.body)

      let userdeviceData=res.body;

      this.canvas = document.getElementById('eventCategoryType');
      this.ctx = this.canvas.getContext('2d');
      let myChart = new Chart(this.ctx, {
        type: 'bar',
        data: {
            labels: ["Computing","Recovery","Datacenter ","General"],
            datasets: [{
              label:"No. of categories",
              maxBarThickness: 30,
                // data: [(userdeviceData.Datacenter),(userdeviceData.General)],
                data: [(userdeviceData.CloudComputing),(userdeviceData.CloudComputingHybricloudDisasterRecovery),
                  (userdeviceData.Datacenter),(userdeviceData.General)],
                backgroundColor: [
                  '#2CD5B6',
                  '#0FC8F2',
                  '#753BBD',
                  '#E6442B'
              ],
                borderWidth: 1
            }]
        },
        options: {
          title:{
            display:true,
            text:'Categories'
          },
          responsive: false,
          display:true,
          scales: {
            xAxes: [{
              // gridLines: {
              //     color: "rgba(0, 0, 0, 0)",
              // }
          }],
            yAxes: [{
            //   gridLines: {
            //     color: "rgba(0, 0, 0, 0)",
            // },
                ticks: {
                  stepSize:10,
                    beginAtZero:true
                }
            }]
        }
        }
      });
    })
  }
  //--------------test----------//
  // eventCategoryTypeDetailsTest(){
  //   this.service.geteventCategoryTypeDetails()
  //   .subscribe(res =>{
  //     console.log(res.body)

  //     let userdeviceData=res.body;

  //     this.canvas = document.getElementById('eventCategoryTypeTest');
  //     this.ctx = this.canvas.getContext('2d');
  //     let myChart = new Chart(this.ctx, {
  //       type: 'bar',
  //       data: {
  //           labels: ["Computing","Recovery","Datacenter ","General"],
  //           datasets: [{
  //             label:"No. of categories",
  //             maxBarThickness: 30,
  //               // data: [(userdeviceData.Datacenter),(userdeviceData.General)],
  //               data: [(userdeviceData.CloudComputing),(userdeviceData.CloudComputingHybricloudDisasterRecovery),
  //                 (userdeviceData.Datacenter),(userdeviceData.General)],
  //               backgroundColor: [
  //                 '#2CD5B6',
  //                 '#0FC8F2',
  //                 '#753BBD',
  //                 '#E6442B'
  //             ],
  //               borderWidth: 1
  //           }]
  //       },
  //       options: {
  //         title:{
  //           display:true,
  //           text:'Categories'
  //         },
  //         responsive: false,
  //         display:true,
  //         scales: {
  //           xAxes: [{
  //             // gridLines: {
  //             //     color: "rgba(0, 0, 0, 0)",
  //             // }
  //         }],
  //           yAxes: [{
  //           //   gridLines: {
  //           //     color: "rgba(0, 0, 0, 0)",
  //           // },
  //               ticks: {
  //                 stepSize:10,
  //                   beginAtZero:true
  //               }
  //           }]
  //       }
  //       }
  //     });
  //   })
  // }



}
