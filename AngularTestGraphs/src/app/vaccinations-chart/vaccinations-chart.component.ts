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
  selector: 'app-vaccinations-chart',
  templateUrl: './vaccinations-chart.component.html',
  styleUrls: ['./vaccinations-chart.component.scss']
})
export class VaccinationsChartComponent implements OnInit {
  
  public country_selected:String = "USA";
  public from_date:Date = new Date("2021-01-15");
  public till_date:Date = new Date("2021-03-15");
  
  public column_color:String = "#aae479";
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
        zoomType: 'xy',
        type: "column"
      },
      title: {
        text: this.country_selected+' vaccination rate',
        align: 'left'
      },
      xAxis: [{
        categories: data.Date,
        crosshair: true
      }],
      yAxis: [{
        gridLineWidth: 0,
        title: {
          text: 'Total Daily Vaccinations',
          style: {
            color: this.column_color
          }
        },
        labels: {
          format: '{value}',
          style: {
            color: this.column_color
          }
        },
        opposite: true
      }, {
        labels: {
          format: '{value}',
          style: {
            color: this.line_color
          }
        },
        title: {
          text: 'Total Vaccinations',
          style: {
            color: this.line_color
          }
        },
        opposite: false
        
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
      plotOptions: {
        series: {
            borderRadius: 5,
            // shadow: true,
            
        }
      },
      series: [
        {
          name: 'Total Daily Vaccinations',
          type: 'column',
          data: data.total_vaccinations_daily,
          color: this.column_color,
          marker:false
        },{
          name: 'Total Vaccinations',
          type: 'line',
          yAxis: 1,
          data: data.total_vaccinations,
          color: this.line_color,
          marker:false
        }],
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
      
      console.log(`CLICK ENTER : \nFrom Date : ${this.from_date}\nTill Date : ${this.till_date}`)
      if(event.value){
        this.offChainService.getCountryVaccinations(this.country_selected, from_date_str, till_date_str)
        .subscribe(async (data:any) => {
          await this.dataFill(data)
          Highcharts.chart('vaccinations-by-country-container', this.options);
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
  