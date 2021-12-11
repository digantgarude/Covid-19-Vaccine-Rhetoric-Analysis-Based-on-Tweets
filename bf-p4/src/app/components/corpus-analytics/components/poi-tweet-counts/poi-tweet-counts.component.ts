import {
  Component,
  Input,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { CorpusAnalyticsService } from 'src/app/services/corpus-analytics.service';
import * as Highcharts from 'highcharts';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');
More(Highcharts);
noData(Highcharts);
Boost(Highcharts);


@Component({
  selector: 'app-poi-tweet-counts',
  templateUrl: './poi-tweet-counts.component.html',
  styleUrls: ['./poi-tweet-counts.component.scss']
})
export class PoiTweetCountsComponent implements OnInit {
  @Input() selected_poi:string = '';

  public column_color: String = "#4895ef";
  // public line_color:String = "#e63946";
  public line_color: String = "#4c4c4c";
  public country_selected: String = "USA";
  public options: any = {};
  constructor(private corpusService:CorpusAnalyticsService) {}
  async ngOnChanges(changes:SimpleChanges){
    console.log(changes)
    if(this.selected_poi.length > 0){
      await this.renderChart();
    }
  }

  async dataFill(data: any) {
    this.options = {
      chart: {
        zoomType: 'xy'
      },
      title: {
        text: this.selected_poi + ' Daily tweet count',
        align: 'left'
      },
      xAxis: [{
        categories: data.date_list,
        crosshair: true,
        
      }],
      // plotOptions: {
      //   series: {
      //     borderRadius: 5
      //   }
      // },
      yAxis: [{
        labels: {
          format: '{value}',
          style: {
            color: this.column_color
          }
        },
        title: {
          text: 'Daily tweet count',
          style: {
            color: this.column_color
          }
        },
      },
      //  {
      //   gridLineWidth: 0,
      //   title: {
      //     text: 'Total Confirmed',
      //     style: {
      //       color: this.line_color
      //     }
      //   },
      //   labels: {
      //     format: '{value}',
      //     style: {
      //       color: this.line_color
      //     }
      //   },
      //   opposite: true
      // }
    ],
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
        name: 'Daily tweet count',
        type: 'column',
        yAxis: 0,
        data: data.count_list,
        color: this.column_color,
        marker: false
      },
      //  {
      //   name: 'Total Confirmed',
      //   type: 'spline',
      //   yAxis: 1,
      //   data: data.Confirmed,
      //   color: this.line_color,
      //   // dashStyle: 'shortdot',
      //   marker: false
      // }
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

  async renderChart() {
    let data = this.corpusService.sentiment_corpus_data.poi_tweet_count[this.selected_poi];
    this.corpusService.poi_tweet_start_date = data.date_list[0];
    this.corpusService.poi_tweet_end_date = data.date_list[data.date_list.length-1];

    console.log("+++++++++++++++++++++++++++")
    console.log(`${this.corpusService.poi_tweet_start_date} -> ${this.corpusService.poi_tweet_end_date}`)
    console.log("+++++++++++++++++++++++++++")
    console.log(data)
    console.log("+++++++++++++++++++++++++++")
    await this.dataFill(data)
    Highcharts.chart('poi-tweet-counts-container', this.options);
  }

  ngOnInit() {
    console.log("POI TWEETS COUNTS ")
    // this.renderChart()
  }

}
