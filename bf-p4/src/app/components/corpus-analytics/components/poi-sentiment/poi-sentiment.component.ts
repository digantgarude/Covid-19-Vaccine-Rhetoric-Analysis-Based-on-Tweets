import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as Exporting from 'highcharts/modules/exporting';
declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');
import {FormGroup, FormControl} from '@angular/forms';
import { formatDate } from "@angular/common";
import { MatSelectChange } from '@angular/material/select';
import * as corpus_analytics from "./../../corpus-analytics.component";
import { CorpusAnalyticsService } from 'src/app/services/corpus-analytics.service';


@Component({
  selector: 'app-poi-sentiment',
  templateUrl: './poi-sentiment.component.html',
  styleUrls: ['./poi-sentiment.component.scss']
})
export class PoiSentimentComponent implements OnInit {
  public selected_poi:any;
  poi_names = ['ArvindKejriwal','BernieSanders','CDCgov','Claudiashein','EnriqueAlfaroR','GovRonDeSantis','GregAbbott_TX','HHS_ASH','HLGatell','JoeBiden','KamalaHarris','LindseyGrahamSC','MamataOfficial','MoHFW_INDIA','POTUS','PeteButtigieg','RahulGandhi','RandPaul','RicardoMonrealA','SSalud_mx','SecBecerra','SenSanders','VP','VicenteFoxQue','alfredodelmazo','alitomorenoc','amyklobuchar','fernandeznorona','lopezobrador_','m_ebrard','mansukhmandviya','marcorubio','mattgaetz','mtgreenee','narendramodi','sambitswaraj','tatclouthier','tedcruz']
  len_poi:any  = this.poi_names.length;
  public column_color:String = "#4895ef";
  // public line_color:String = "#e63946";
  public line_color:String = "#4c4c4c";
  
  selectedValue(event: MatSelectChange) {
    this.selected_poi = event.value;
    console.log(this.selected_poi);
    this.renderChart();
  }
  
  public options:any = {};
  constructor(private corpusService:CorpusAnalyticsService) {}
  
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
          // center: ['50%', '50%']
        }
      },
      series: [{
        name: 'Score',
        colorByPoint: true,
        // innerSize: '40%',
        data: data
      }]
    };
  }

  async renderChart() {
    let sentiment_poi_data = await this.corpusService.getPOISentiment(this.selected_poi);
    // convert data to format
    console.log(sentiment_poi_data)
    await this.dataFill([{
      name: 'Positive',
      y: sentiment_poi_data.POSITIVE,
      sliced: true,
      selected: true,
      color: "#4895ef"
    }, {
      name: 'Negative',
      y: sentiment_poi_data.NEGATIVE,
      color:"#e63946"
    }, {
      name: 'Neutral',
      y: sentiment_poi_data.NEUTRAL,
      color:"#adb5bd"
    }, {
      name: 'Mixed',
      y: sentiment_poi_data.MIXED,
      color: "#ffb703"
    }]);
    Highcharts.chart('poi-sentiment', this.options);
  }
  
  ngOnInit() {
    this.selected_poi = "narendramodi";
    this.renderChart()
  }


}
