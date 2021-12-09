import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { formatDate } from "@angular/common";
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-overall-sentiment',
  templateUrl: './overall-sentiment.component.html',
  styleUrls: ['./overall-sentiment.component.scss']
})
export class OverallSentimentComponent implements OnInit {
  
  public options:any = {};
  constructor() {
  }
  async dataFill(data:any){
    this.options = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        zoomType: 'xy',
        backgroundColor: null,
      },
      title: {
        text: 'Overall sentiment across the corpus.',
        align: 'center'
      },
      tooltip: {
        // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b><br># of tweets: <b>{point.y}</b>'
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
      await this.dataFill([{
        name: 'Positive',
        y: 32574,
        // sliced: true,
        // selected: true,
        color: "#4895ef"
      }, {
        name: 'Negative',
        y: 54124,
        color:"#e63946"
      }, {
        name: 'Neutral',
        y: 135416,
        color:"#adb5bd"
      }, {
        name: 'Mixed',
        y: 8996,
        color: "#ffb703"
      }])
      Highcharts.chart('overall-sentiment-container', this.options);
  }
  
  ngOnInit(): void {
    this.renderChart()
  }

}
