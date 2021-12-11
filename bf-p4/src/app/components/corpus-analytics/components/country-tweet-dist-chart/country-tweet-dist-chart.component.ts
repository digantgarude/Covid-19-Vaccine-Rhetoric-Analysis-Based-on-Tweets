import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as Exporting from 'highcharts/modules/exporting';
declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');
import {FormGroup, FormControl} from '@angular/forms';
import { formatDate } from "@angular/common";
import { MatSelectChange, MatSelectTrigger } from '@angular/material/select';
import * as corpus_analytics from "./../../corpus-analytics.component";
import { CorpusAnalyticsService } from 'src/app/services/corpus-analytics.service';

@Component({
  selector: 'app-country-tweet-dist-chart',
  templateUrl: './country-tweet-dist-chart.component.html',
  styleUrls: ['./country-tweet-dist-chart.component.scss']
})
export class CountryTweetDistChartComponent implements OnInit {

  @Input() selected_country:string="";
  public column_color:String = "#4895ef";
  // public line_color:String = "#e63946";
  public line_color:String = "#4c4c4c";
  
  async ngOnChanges(changes:SimpleChanges){
    console.log(changes)
    if(this.selected_country.length > 0){
      await this.renderChart();
    }
  }
  
  public options:any = {};
  constructor(private corpusService:CorpusAnalyticsService) {}
  
  async dataFill(){
    this.options = {
      chart: {
        zoomType: 'xy'
      },
      title: {
        text: 'Country wise distribution of tweets',
        align: 'center'
      },
      xAxis: [{
        categories: ["USA", "INDIA", "MEXICO"],
        crosshair: true,
      }],
      plotOptions: {
        series: {
          borderRadius: 5
        },
        column: {
          dataLabels: {
              enabled: true
          }
        }
      },
      yAxis: [{
        title: {
          text: 'No. of tweets',
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
      }],
      tooltip: {
        shared: true
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        x: 0,
        verticalAlign: 'top',
        y: 0,
        floating: true,
        backgroundColor: 'rgba(255,255,255,0.25)'
      },
      series: [{
        name: 'No. of tweets',
        type: 'column',
        yAxis:0,
        data: [138692, 42075, 44843],
        color: this.column_color,
        // dashStyle: 'shortdot',
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

  async renderChart() {
    await this.dataFill();
    Highcharts.chart('country-tweet-dist', this.options);
  }
  
  ngOnInit() {
    this.renderChart()
  }

}
