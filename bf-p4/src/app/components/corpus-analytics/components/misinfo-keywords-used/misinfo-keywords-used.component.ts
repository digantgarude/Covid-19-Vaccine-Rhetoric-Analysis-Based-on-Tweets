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
  selector: 'app-misinfo-keywords-used',
  templateUrl: './misinfo-keywords-used.component.html',
  styleUrls: ['./misinfo-keywords-used.component.scss']
})
export class MisinfoKeywordsUsedComponent implements OnInit {

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
        name: ''
      }],
      title: {
        text: 'Top keywords for vaccine hesitancy.'
      },
      menuItems: ["viewFullscreen", "printChart", "separator", "downloadPNG", "downloadJPEG", "downloadPDF", "downloadSVG"]
    };
  }

  async renderChart() {
    console.log("MISINFO HASHTAGS");
    let hashtags_data = this.corpusService.sentiment_corpus_data.misinfo_data_keywords;
    this.dataFill(hashtags_data.slice(0,50));
    Highcharts.chart('misinfo-keywords-cloud-container', this.options);
  }

  ngOnInit() {
    this.renderChart()
  }
}
