import {
  Component,
  OnInit
} from '@angular/core';
import * as Highcharts from 'highcharts';
import * as Exporting from 'highcharts/modules/exporting';
declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');
const Wordcloud = require('highcharts/modules/wordcloud');
Wordcloud(Highcharts);
More(Highcharts);
noData(Highcharts);
Boost(Highcharts);

@Component({
  selector: 'app-corpus-wordcloud',
  templateUrl: './corpus-wordcloud.component.html',
  styleUrls: ['./corpus-wordcloud.component.scss']
})
export class CorpusWordcloudComponent implements OnInit {


  public column_color: String = "#aae479";
  // public line_color:String = "#4895ef";
  public line_color: String = "#4c4c4c";





  public options: any = {};
  constructor() {

  }

  async dataFill(data: any) {
    this.options = {
      accessibility: {
        screenReaderSection: {
          beforeChartFormat: '<h5>{chartTitle}</h5>' +
            '<div>{chartSubtitle}</div>' +
            '<div>{chartLongdesc}</div>' +
            '<div>{viewTableButton}</div>'
        }
      },
      series: [{
        type: 'wordcloud',
        data,
        name: 'Occurrences'
      }],
      title: {
        text: 'Wordcloud of Number of hashtags in  corpus'
      }
    };
  }

  async renderChart() {
    // this.offChainService.getWordCloud()
    // .subscribe(async (data:any) => {
    await this.dataFill([{
      name: "hello",
      weight: 1
    }, {
      name: "world",
      weight: 4
    }])
    Highcharts.chart('word-cloud-container', this.options);
    // })
  }

  ngOnInit() {
    this.renderChart()
  }

}
