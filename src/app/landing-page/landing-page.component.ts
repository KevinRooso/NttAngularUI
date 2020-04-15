import { Component, OnInit } from '@angular/core';
import  {Chart} from 'chart.js';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  title = 'chartjsangular';
  canvas  : any;
  ctx     : any;

  canvas1 : any;
  ctx1    : any;

  // canvas2 : any;
  // ctx2    : any;

  canvas3 : any;
  ctx3    : any;




  LineChart=[];
  constructor() { }
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
    this.canvas = document.getElementById('myChart');
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

    this.canvas1 = document.getElementById('myChart1');
    this.ctx1 = this.canvas1.getContext('2d');
    let myChart1 = new Chart(this.ctx1, {
      type: 'line',
      data: {
          labels: ['January', 'February', 'March', 'April'],
          datasets: [{
              label: '# of Votes',
              fill: false,
              data: [5,3,4,2],
              backgroundColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)'
              ],
              borderColor: "#ffbd35",
              borderWidth: 1
          }]
      },
      options: {
        responsive: false,
        display:true,
        scales: { yAxes: [{ display: false }],xAxes: [{
                display: false //this will remove all the x-axis grid lines
            }] }
      },
    });


    // this.canvas2 = document.getElementById('myChart2');
    // this.ctx2 = this.canvas2.getContext('2d');
    // let myChart2 = new Chart(this.ctx2, {
    //   type: 'line',
    //   data: {
    //       labels: ['January', 'February', 'March', 'April'],
    //       datasets: [{
    //           label: '# of Votes',
    //           fill: false,
    //           data: [5,3,4,2],
    //           backgroundColor: [
    //               'rgba(255, 99, 132, 1)',
    //               'rgba(54, 162, 235, 1)',
    //               'rgba(255, 206, 86, 1)'
    //           ],
    //           borderColor: "#ffbd35",
    //           borderWidth: 1
    //       }]
    //   },
    //   options: {
    //     responsive: false,
    //     display:true,
    //     scales: { yAxes: [{ display: false }],xAxes: [{
    //             display: false //this will remove all the x-axis grid lines
    //         }] },
    //     elements: {
    //     line: {
    //       tension: 0.000001
    //     }
    // },
    //   },
    // });
    this.canvas3 = document.getElementById('myChart3');
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






    this.LineChart=new Chart('lineChart',{
      type:'line',
      data:{
        labels:["jan","feb","mar","apr","may","jun","jul","aug","sept","oct","nov","dec"],
        datasets:[{
          label:'Number of items sold in Months',
          data:[7,8,9,8,7,8,4,2,1,3,5,6],
          fill:false,
        lineTension:0.2,
        borderColor:"blue",
        borderWidth:1

        },
        {
          label:'Number of items sold in Months',
          data:[5,2,7,4,9,3,4,2,1,3,5,6],
          fill:false,
        lineTension:0.2,
        borderColor:"red",
        borderWidth:1

        }],
    },
    options:{
      title:{
        text:"Line Chart",
        display:true

      },
      scales: {
        yAxes:[{
          ticks:{
            beginAtZero:true
          }
        }]
      }
    }
    }) ;
  }

}
