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
  androidDevice:any;
  iosDevice:any;

  totalDownload:any;
  totalArticleDownload:any;
  totalCaseStudyDownload:any;
  totalWhitepaperDownload:any;

  totalEvent:any;
  totalPublishEvent:any;
  totalActiveEvent:any;
  totalDraftEvent:any;

  totalEvent1:any;
  totalPublishEvent1:any;
  totalCustomerEvent:any;
  totalEmployeeEvent:any;

  constructor( private service:AuthServiceService, private queryString:ActivatedRoute) { }


  ngOnInit() {
    this.eventCategoryTypeDetails();
    this.userDevice();
    this.resourceDownload();
    this.eventStatusDetails();
    this.eventTargetUserTypeDetails();
    this.users();

    this.canvas = document.getElementById('respie');
    this.ctx = this.canvas.getContext('2d');
    let myChart = new Chart(this.ctx, {
      type: 'pie',
      data: {
          labels: ["New", "In Progress", "On Hold"],
          datasets: [{
              label: '# of Votes',
              data: [1,2,3],
              backgroundColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
        responsive: false,
        display:true
      }
    });

    // this.canvas1 = document.getElementById('userpie');
    // this.ctx1 = this.canvas1.getContext('2d');
    // let myChart1 = new Chart(this.ctx, {
    //   type: 'pie',
    //   data: {
    //       labels: ["New", "In Progress", "On Hold"],
    //       datasets: [{
    //           label: '# of Votes',
    //           data: [1,2,3],
    //           backgroundColor: [
    //               'rgba(255, 99, 132, 1)',
    //               'rgba(54, 162, 235, 1)',
    //               'rgba(255, 206, 86, 1)'
    //           ],
    //           borderWidth: 1
    //       }]
    //   },
    //   options: {
    //     responsive: false,
    //     display:true
    //   }
    // });

    // new Chart('bar',{
    //   type:'bar',
    //   options:{
    //     responsive:true,
    //     title:{
    //       dispay:true,
    //       text:'Bar chart'
    //     },
    //     data:{
    //       labels:['a','b','c','d','e','f','g','h'],
    //       datasets:[
    //         {
    //           type:'bar',
    //           labels:'My  First dataset',
    //           data:[433,585,165,263,10,265,156,458],
    //           backgroundColor:'rgba(255,0,255,0.4)',
    //           fill:false,
    //         },
    //       ]
    //     }
    //   }
    // });



    this.canvas3 = document.getElementById('resbar');
    this.ctx3 = this.canvas3.getContext('2d');
     let myChart3 = new Chart(this.ctx3, {
      type: 'bar',
      data: {
          labels: ["New", "In Progress", "On Hold"],
          datasets: [{
              label: '# of Votes',
              data: [3,4,3],
              backgroundColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
        responsive: false,
        display:true,
        scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    }
      }
    });

    this.canvas3 = document.getElementById('userbar');
    this.ctx3 = this.canvas3.getContext('2d');
     let myChart4 = new Chart(this.ctx3, {
      type: 'bar',
      data: {
          labels: ["New", "In Progress", "On Hold"],
          datasets: [{
              label: '# of Votes',
              data: [3,4,3],
              backgroundColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
        responsive: false,
        display:true,
        scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    }
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
    });
  }

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
            labels: ["Android ", "Ios "],
            datasets: [{
                data: [(userdeviceData.androidDevice ), (userdeviceData.iosDevice )],
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
          responsive: false,
          display:true
        }
      });
    })
  }


  resourceDownload(){
    this.service.getresourceDownloadDetails()
    .subscribe(res =>{
      console.log(res.body)

      let userdeviceData=res.body;

      this.canvas = document.getElementById('resourceDownload');
      this.ctx = this.canvas.getContext('2d');
      let myChart = new Chart(this.ctx, {
        type: 'bar',
        data: {
            labels: [ "Article ","Casestudy","Whitepaper"],
            datasets: [{
              label: '# of downloads',
                data: [(userdeviceData.totalArticleDownload||3 ),(userdeviceData.totalCaseStudyDownload||3 ),
                  (userdeviceData.totalWhitepaperDownload||5 )],
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
          responsive: false,
          display:true,
          scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
        }
      });
    })
  }


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
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
          responsive: false,
          display:true
        }
      });
    })
  }

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
              labels: '# of downloads',
                data: [ (userdeviceData.totalPublicEvent),
                  (userdeviceData.totalCustomerEvent ),(userdeviceData.totalEmployeeEvent )],
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
          responsive: false,
          display:true,
          scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
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
              label: '# of downloads',
                data: [(userdeviceData.totalPublicUser),
                  (userdeviceData.totalCustomerUser ),(userdeviceData.totalEmployeeUser )],
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
          responsive: false,
          display:true,
          scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
        }
      });
    })
  }

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
              label: '# of downloads',
                // data: [(userdeviceData.Datacenter),(userdeviceData.General)],
                data: [(userdeviceData.CloudComputing),(userdeviceData.CloudComputingHybricloudDisasterRecovery),
                  (userdeviceData.Datacenter),(userdeviceData.General)],
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
          responsive: false,
          display:true,
          scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
        }
      });
    })
  }


}
