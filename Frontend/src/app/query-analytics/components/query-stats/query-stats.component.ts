import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import { CorpusAnalyticsService } from 'src/app/services/corpus-analytics.service';

@Component({
  selector: 'app-query-stats',
  templateUrl: './query-stats.component.html',
  styleUrls: ['./query-stats.component.scss']
})
export class QueryStatsComponent implements OnInit {


  @Input() data: any = [0, 0, 0];
  @Input() id: any = [];
  @Input() title: string = "";

  public column_color: String = "#4895ef";
  // public line_color:String = "#e63946";
  public line_color: String = "#4c4c4c";

  async ngOnChanges(changes: SimpleChanges) {
    if (this.data.length == 3)
      console.log('aays')
  }

  public options: any = {};
  constructor() { }

  async dataFill() {
    if (this.data) {
      console.log(this.data)
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
          yAxis: 0,
          data: this.data,
          color: this.column_color,
          // dashStyle: 'shortdot',
          marker: false
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

  }

  async renderChart() {
    await this.dataFill();
    Highcharts.chart(this.id, this.options);
  }

  async ngOnInit() {
    if (this.data.length == 3)
      await this.renderChart()
  }

}
