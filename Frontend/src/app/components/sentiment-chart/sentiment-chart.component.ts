import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-sentiment-chart',
  templateUrl: './sentiment-chart.component.html',
  styleUrls: ['./sentiment-chart.component.scss']
})
export class SentimentChartComponent implements OnInit {

  @Input() sentimentData: any = {};
  public options: any = {};
  constructor() {

  }

  ngOnChanges(changes: SimpleChanges) {
    this.renderChart();
  }


  async dataFill(data: any) {
    this.options = {
      chart: {
        backgroundColor: "#f2f3f2",
        plotBackgroundColor: "#f2f3f2",
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        zoomType: 'xy',
        height: 350
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
      y: this.sentimentData.positive,
      sliced: true,
      selected: true,
      color: "#4895ef"
    }, {
      name: 'Negative',
      y: this.sentimentData.negative,
      color: "#e63946"
    }, {
      name: 'Neutral',
      y: this.sentimentData.neutral,
      color: "#adb5bd"
    }, {
      name: 'Mixed',
      y: this.sentimentData.mixed,
      color: "#ffb703"
    }])
    Highcharts.chart('sentiment-scores-tweets-container', this.options);
    // })
  }

  ngOnInit(): void {
    if (this.sentimentData.positive)
      this.renderChart()
  }

}
