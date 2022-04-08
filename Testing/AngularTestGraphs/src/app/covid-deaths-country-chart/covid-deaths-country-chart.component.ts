import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as Exporting from 'highcharts/modules/exporting';
declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');
import {FormGroup, FormControl} from '@angular/forms';
import {OffChainServiceService} from "src/app/services/off-chain-service.service"
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-covid-deaths-country-chart',
  templateUrl: './covid-deaths-country-chart.component.html',
  styleUrls: ['./covid-deaths-country-chart.component.scss']
})
export class CovidDeathsCountryChartComponent implements OnInit {
  public from_date:Date = new Date("2020-10-20");
  public till_date:Date = new Date("2020-11-20");
  public country_selected:String = "US";
  public column_color:String = "#e63946";
  // public line_color:String = "#4895ef";
  public line_color:String = "#4c4c4c";
  
  public range:any = new FormGroup({
    start: new FormControl(this.from_date),
    end: new FormControl(this.till_date),
  });
  
  
  
  public options:any = {};
  constructor(private offChainService: OffChainServiceService) {
    
  }
  
  async dataFill(data:any){
    this.options = {
      chart: {
        zoomType: 'xy'
      },
      title: {
        text: this.country_selected+' covid deaths | Covid 19',
        align: 'left'
      },
      xAxis: [{
        categories: data.Date,
        crosshair: true
      }],
      plotOptions: {
        series: {
            borderRadius: 5
        }
      },
      yAxis: [{
        title: {
          text: 'Daily Deaths',
          style: {
            color: this.column_color
          }
        },
        labels: {
          format: '{value}',
          style: {
            color: this.column_color
          }
        }
      },{
        title: {
          text: 'Cumulative Deaths',
          style: {
            color: this.line_color
          }
        },
        labels: {
          format: '{value}',
          style: {
            color: this.line_color
          }
        },
        opposite: true
      }],
      tooltip: {
        shared: true
      },
      legend: {
        layout: 'vertical',
        align: 'left',
        x: 80,
        verticalAlign: 'top',
        y: 55,
        floating: true,
        backgroundColor: 'rgba(255,255,255,0.25)'
      },
      series: [{
        name: 'Daily Deaths',
        type: 'column',
        yAxis:0,
        data: data.Deceased_Daily,
        color: this.column_color,
        // dashStyle: 'shortdot',
        marker:false
      },
      {
        name: 'Cumulative Deaths',
        type: 'spline',
        yAxis:1,
        data: data.Deceased,
        color: this.line_color,
        // dashStyle: 'shortdot',
        marker:false
      }
      ],
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              floating: false,
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom',
              x: 0,
              y: 0
            },
            yAxis: [{
              labels: {
                align: 'right',
                x: 0,
                y: -6
              },
              showLastLabel: false
            }, {
              labels: {
                align: 'left',
                x: 0,
                y: -6
              },
              showLastLabel: false
            }, {
              visible: false
            }]
          }
        }]
      }
    };
  }
  
  async renderChart(event: any) {
    let from_date_str = formatDate(this.range.value.start, "yyyy-MM-dd", 'en-US');
    let till_date_str = formatDate(this.range.value.end, "yyyy-MM-dd", 'en-US');
    if(event.value){
      this.offChainService.getCountryCasesAll(this.country_selected, from_date_str, till_date_str)
      .subscribe(async (data:any) => {
        await this.dataFill(data)
        Highcharts.chart('covid-deaths-by-country-container', this.options);
      })
    }
  }
  
  ngOnInit() {
    this.from_date = this.range.value.start;
    this.till_date = this.range.value.end;
    console.log(`From Date : ${this.from_date}\nTill Date : ${this.till_date}`)
    this.renderChart({
      value:1
    })
  }
}
