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
  selector: 'app-sentiment-hashtag-wordcloud-overall',
  templateUrl: './sentiment-hashtag-wordcloud-overall.component.html',
  styleUrls: ['./sentiment-hashtag-wordcloud-overall.component.scss']
})
export class SentimentHashtagWordcloudOverallComponent implements OnInit {
  @Input() selected_sentiment:string="POSITIVE";

  async ngOnChanges(changes:SimpleChanges){
    console.log(changes)
    if(this.selected_sentiment.length > 0){
      await this.renderChart();
    }
  }

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
        text: 'Top hashtags for '+this.selected_sentiment
      },
      menuItems: ["viewFullscreen", "printChart", "separator", "downloadPNG", "downloadJPEG", "downloadPDF", "downloadSVG"]
    };
  }

  async renderChart() {
    console.log("SENTIMENT HASHTAGS");
    let data = this.corpusService.sentiment_corpus_data.sentiment_wise_hashtags;
    console.log(data);
    let hashtags_data:any = data[this.selected_sentiment];
    this.dataFill(hashtags_data.slice(0,20));
    Highcharts.chart('sentiment-wise-word-cloud-container', this.options);
  }

  ngOnInit() {
    this.renderChart()
  }

}
