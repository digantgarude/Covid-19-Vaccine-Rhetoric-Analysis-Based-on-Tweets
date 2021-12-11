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
  selector: 'app-country-wise-hashtag-word-cloud',
  templateUrl: './country-wise-hashtag-word-cloud.component.html',
  styleUrls: ['./country-wise-hashtag-word-cloud.component.scss']
})
export class CountryWiseHashtagWordCloudComponent implements OnInit {
  @Input() selected_country:string="";

  async ngOnChanges(changes:SimpleChanges){
    console.log(changes)
    if(this.selected_country.length > 0){
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
        text: 'Top hashtags in '+this.selected_country
      },
      menuItems: ["viewFullscreen", "printChart", "separator", "downloadPNG", "downloadJPEG", "downloadPDF", "downloadSVG"]
    };
  }

  async renderChart() {
    // let data = this.corpusService.sentiment_corpus_data;
    // let data = await this.corpusService.getCorpusWordCloud();
    let data = this.corpusService.sentiment_corpus_data.country_wise_hashtags;
    let hashtags_data:any = data[this.selected_country];
    // console.log("WORD CLOUD DATA RECIEVE")
    // console.log(data)
    this.dataFill(hashtags_data.slice(0,20));
    Highcharts.chart('country-wise-word-cloud-container', this.options);
  }

  ngOnInit() {
    this.renderChart()
  }

}
