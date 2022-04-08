import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as Exporting from 'highcharts/modules/exporting';
declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');
import {FormGroup, FormControl} from '@angular/forms';
import { formatDate } from "@angular/common";
import { CorpusAnalyticsService } from 'src/app/services/corpus-analytics.service';


@Component({
  selector: 'app-covid-country-deaths',
  templateUrl: './covid-country-deaths.component.html',
  styleUrls: ['./covid-country-deaths.component.scss']
})
export class CovidCountryDeathsComponent implements OnInit {

  @Input() selected_poi_country:string = 'USA';

  public from_date:any = "2020-10-20";
  public till_date:any = "2020-11-20";
  public country_selected:String = this.selected_poi_country;
  // public column_color:String = "#4895ef";
  public column_color:String = "#e63946";
  public line_color:String = "#4c4c4c";

//   public range:any = new FormGroup({
//       start: new FormControl(this.from_date),
//       end: new FormControl(this.till_date),
//   });
  
  async ngOnChanges(changes:SimpleChanges){
    console.log(changes)
    if(this.selected_poi_country.length > 0){
      await this.renderChart({
        value:1
      });
    }
  }


  
  public options:any = {};
  constructor(private corpusService: CorpusAnalyticsService) {
      
  }
  
  async dataFill(data:any){
      this.options = {
          chart: {
              zoomType: 'xy'
          },
          title: {
              text: this.selected_poi_country+' # of deaths rise | Covid 19',
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
              labels: {
                  format: '{value}',
                  style: {
                      color: this.column_color
                  }
              },
              title: {
                  text: 'Daily Deaths',
                  style: {
                      color: this.column_color
                  }
              }
          }, {
              gridLineWidth: 0,
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
              opposite:true
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
          series: [
          {
              name: 'Daily Deaths',
              type: 'column',
            //   type: 'spline',
              yAxis: 0,
              data: data.Deceased_Daily,
            //   data: data.Deceased,
              color: this.column_color,
            //   marker:true
          },{
              name: 'Cumulative Deaths',
              type: 'spline',
              yAxis:1,
              data: data.Deceased,
              color: this.line_color,
            //   dashStyle: 'shortdot',
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
    //   let from_date_str = formatDate(this.range.value.start, "yyyy-MM-dd", 'en-US');
    //   let till_date_str = formatDate(this.range.value.end, "yyyy-MM-dd", 'en-US');
    console.log(`CORPUS:  FROM ${this.corpusService.poi_tweet_start_date} FROM ${this.corpusService.poi_tweet_end_date}`)
    let from_date_str = this.corpusService.poi_tweet_start_date;
    let till_date_str = this.corpusService.poi_tweet_end_date;
    console.log(`FROM : ${from_date_str} || TILL DATE : ${till_date_str}`)
    if(event.value){
        this.corpusService.getCountryCasesAll(this.selected_poi_country, from_date_str, till_date_str)
        .subscribe(async (data:any) => {
            await this.dataFill(data)
            Highcharts.chart('covid-deaths-by-country-container', this.options);
        })
    }
  }
  
  ngOnInit() {
      console.log(`From Date : ${this.from_date}\nTill Date : ${this.till_date}`)
      this.renderChart({
          value:1
        })
  }

}
