import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-sentiment-chart',
  templateUrl: './sentiment-chart.component.html',
  styleUrls: ['./sentiment-chart.component.scss']
})
export class SentimentChartComponent implements OnInit {

  public options:any = {};
  constructor() {
    
  }
  
  
  async dataFill(data:any){
    this.options = {
      chart: {
        backgroundColor: "#f2f3f2",
        plotBackgroundColor:"#f2f3f2",
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        zoomType: 'xy'
      },
      title: {
        text: 'Result Sentiment Scores',
        align: 'left'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          },
          shadow: false,
          center: ['50%', '50%']
        }
      },
      series: [{
        name: 'Score',
        colorByPoint: true,
        innerSize: '40%',
        data: data
      }]
    };
  }
  
  async renderChart() {  
    // this.offChainService.getSentiments(this.country_selected, from_date_str, till_date_str)
    // .subscribe(async (data:any) => {
      await this.dataFill([{
        name: 'Positive',
        y: 61.41,
        sliced: true,
        selected: true,
        color: "#4895ef"
      }, {
        name: 'Negative',
        y: 11.84,
        color:"#e63946"
      }, {
        name: 'Neutral',
        y: 10.85,
        color:"#adb5bd"
      }, {
        name: 'Mixed',
        y: 4.67,
        color: "#ffb703"
      }])
      Highcharts.chart('sentiment-scores-tweets-container', this.options);
    // })
  }
  
  ngOnInit(): void {
    this.renderChart()
  }

}
