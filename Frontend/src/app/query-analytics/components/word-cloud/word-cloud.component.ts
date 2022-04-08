import { Component, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
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
  selector: 'app-word-cloud',
  templateUrl: './word-cloud.component.html',
  styleUrls: ['./word-cloud.component.scss']
})
export class WordCloudComponent implements OnInit {
  public column_color: String = "#aae479";
  // public line_color:String = "#4895ef";
  public line_color: String = "#4c4c4c";


  @Input() data: any = [];
  @Input() title: string = "";
  @Input() id: string = "";
  public options: any = {};
  constructor() {
    // constructor() {

  }

  async ngOnChanges(changes: SimpleChanges) {
    if (this.data.data && this.data.data.length > 0)
      await this.renderChart();
  }

  async dataFill(data: any) {
    this.options = {
      chart: {
        borderWidth: 3,
        borderColor: '#EBBA95'
      },
      accessibility: {
        screenReaderSection: {
          beforeChartFormat: '<h2>{chartTitle}</h2>' +
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
        text: this.title
      }
    };
  }

  async renderChart() {
    // let data = this.corpusService.sentiment_corpus_data;
    // let data = this.corpusService.sentiment_corpus_data.hashtags_word_cloud_corpus;
    if (this.data.data) {
      console.log("WORD CLOUD DATA RECIEVE")
      if (this.data.data.length > 50)
        await this.dataFill(this.data.data.slice(0, 50));
      else
        await this.dataFill(this.data.data);
      Highcharts.chart(this.id, this.options);
    }
  }

  ngOnInit() {
    this.renderChart()
  }
}
