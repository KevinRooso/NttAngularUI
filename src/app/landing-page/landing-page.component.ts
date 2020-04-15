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
  totalDevice:any;
  androidDevice:any;
  iosDevice:any
  constructor( private service:AuthServiceService, private queryString:ActivatedRoute) { }
  // ngOnInit() {
	// 	let chart = new Chart("chartContainer", {
	// 	animationEnabled: true,
	// 	exportEnabled: true,
	// 	title: {
	// 		text: "Basic Column Chart in Angular"
	// 	},
	// 	data: [{
	// 		type: "column",
	// 		dataPoints: [
	// 			{ y: 71, label: "Apple" },
	// 			{ y: 55, label: "Mango" },
	// 			{ y: 50, label: "Orange" },
	// 			{ y: 65, label: "Banana" },
	// 			{ y: 95, label: "Pineapple" },
	// 			{ y: 68, label: "Pears" },
	// 			{ y: 28, label: "Grapes" },
	// 			{ y: 34, label: "Lychee" },
	// 			{ y: 14, label: "Jackfruit" }
	// 		]
	// 	}]
	// });

	// chart.render();
  //   }

  ngOnInit() {

    this.deviceChart();

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
      data:{
        datasets:[{
          data:[45,10,5,25,15],
          backgroundColor:["red","orange","yellow","green","blue"],
          labels:'Dataset 1'
        }],
        labels:['Red','Orange','Yellow','Green','Blue']
      }
    });
  }

  deviceChart(){
    this.service.getChartUser()
    .subscribe(res =>{
      console.log(res.body)

      let userdeviceData=res.body;

      this.canvas = document.getElementById('userDeviceChart');
      this.ctx = this.canvas.getContext('2d');
      let myChart = new Chart(this.ctx, {
        type: 'pie',
        data: {
            labels: ["Total Device","Android Device", "Ios Device"],
            datasets: [{
                label: '# of Votes',
                data: [(userdeviceData.totalDevice ),(userdeviceData.androidDevice ), (userdeviceData.iosDevice )],
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


}
