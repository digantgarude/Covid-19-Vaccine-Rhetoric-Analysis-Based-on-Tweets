import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as Exporting from 'highcharts/modules/exporting';
declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');
import {FormGroup, FormControl} from '@angular/forms';
import { formatDate } from "@angular/common";
import { MatSelectChange, MatSelectTrigger } from '@angular/material/select';
import * as corpus_analytics from "./../../corpus-analytics.component";
import { CorpusAnalyticsService } from 'src/app/services/corpus-analytics.service';

@Component({
  selector: 'app-countrywise-sentiment',
  templateUrl: './countrywise-sentiment.component.html',
  styleUrls: ['./countrywise-sentiment.component.scss']
})
export class CountrywiseSentimentComponent implements OnInit {

  public selected_country:any;
  countries = ["USA", "India", "Mexico"]
  len_countries:any  = this.countries.length;
  public column_color:String = "#4895ef";
  // public line_color:String = "#e63946";
  public line_color:String = "#4c4c4c";
  
  selectedValue(event: MatSelectChange) {
    this.selected_country = event.value;
    console.log(this.selected_country);
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
        text: 'Countrywise sentiment of tweets.',
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
    let sentiment_country_data = await this.corpusService.getCountrySentiment(this.selected_country);
    // convert data to format
    console.log(sentiment_country_data)
    await this.dataFill([{
      name: 'Positive',
      y: sentiment_country_data.POSITIVE,
      // sliced: true,
      // selected: true,
      color: "#4895ef"
    }, {
      name: 'Negative',
      y: sentiment_country_data.NEGATIVE,
      color:"#e63946"
    }, {
      name: 'Neutral',
      y: sentiment_country_data.NEUTRAL,
      color:"#adb5bd"
    }, {
      name: 'Mixed',
      y: sentiment_country_data.MIXED,
      color: "#ffb703"
    }]);
    Highcharts.chart('countrywise-sentiment', this.options);
  }
  
  ngOnInit() {
    this.selected_country = "USA";
    this.renderChart()
  }


}
