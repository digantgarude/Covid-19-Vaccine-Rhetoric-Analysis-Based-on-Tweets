import { CorpusAnalyticsService } from 'src/app/services/corpus-analytics.service';
import {Component,Input,OnInit, SimpleChanges} from '@angular/core';
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
  selector: 'app-misinfo-tweets',
  templateUrl: './misinfo-tweets.component.html',
  styleUrls: ['./misinfo-tweets.component.scss']
})
export class MisinfoTweetsComponent implements OnInit {

  public options: any = {};
  constructor(private corpusService:CorpusAnalyticsService) {

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
        text: 'Top hashtags for tweets with vaccine hesitancy in corpus'
      },
      menuItems: ["viewFullscreen", "printChart", "separator", "downloadPNG", "downloadJPEG", "downloadPDF", "downloadSVG"]
    };
  }

  async renderChart() {
    console.log("MISINFO HASHTAGS");
    let hashtags_data = this.corpusService.sentiment_corpus_data.sorted_hashtags_vc;
    this.dataFill(hashtags_data.slice(0,50));
    Highcharts.chart('misinfo-word-cloud-container', this.options);
  }

  ngOnInit() {
    this.renderChart()
  }

}
