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

  data:any[]=[];
  userdeviceData:any[]

  constructor( private service:AuthServiceService, private queryString:ActivatedRoute) { }


  ngOnInit() {
    this.userDevice();
    this.resourceDownload();
    this.eventStatusDetails();
    this.eventTargetUserTypeDetails();
    this.users();

    this.eventCategoryTypeDetails();

  }

//--------------------------Resources Graphs------------------------//

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
              display:false
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

  //-----------------------------Users Graphs---------------------------------//

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
              label:"Number of users",
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
          legend: {
            display:false
      },
          title:{
            display:true,
            text:' Number of users '
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


//-------------------------------Events Graphs----------------------------------------//

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
          legend: {
            display:false
      },
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
      new Chart('eventCategoryType',{
        type:'doughnut',
        options:{
          responsive:true,
          title:{
            display:true,
            text:'Categories'
          }, legend:{
            position:'right',
          }, animation:{
            animateScale:true,
            animareRotate:true
          }
        },
        data:{
          datasets:[{
            data: [(userdeviceData.CloudComputing),(userdeviceData.CloudComputingHybricloudDisasterRecovery),
              (userdeviceData.Datacenter),(userdeviceData.General)],
            backgroundColor:[
              '#2CD5B6',
              '#0FC8F2',
              '#753BBD',
              '#E6442B'
          ],
            labels:'Dataset 1'
          }],
          labels:['Computing','Recovery','Datacenter','General']
        }
      });
    })
  }



}
