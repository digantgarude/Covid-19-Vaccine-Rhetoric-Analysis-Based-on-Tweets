import { CorpusAnalyticsService } from 'src/app/services/corpus-analytics.service';
import {Component,OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import * as Exporting from 'highcharts/modules/exporting';
import { delay } from 'rxjs';
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
  constructor(private corpusService:CorpusAnalyticsService) {
  // constructor() {

  }

  dataFill(data: any) {
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
        text: 'Top hashtags in corpus'
      }
    };
  }

  async renderChart() {
    // let data = this.corpusService.sentiment_corpus_data;
    let data = await this.corpusService.getCorpusWordCloud();
    // let data = this.corpusService.sentiment_corpus_data.hashtags_word_cloud_corpus;
    // console.log("WORD CLOUD DATA RECIEVE")
    // console.log(data)
    this.dataFill(data.slice(0,20));
    Highcharts.chart('word-cloud-container', this.options);
  }

  ngOnInit() {
    this.renderChart()
  }

}
