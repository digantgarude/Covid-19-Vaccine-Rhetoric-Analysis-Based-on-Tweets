import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
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
  selector: 'app-misinfo-dist-country-pie',
  templateUrl: './misinfo-dist-country-pie.component.html',
  styleUrls: ['./misinfo-dist-country-pie.component.scss']
})
export class MisinfoDistCountryPieComponent implements OnInit {
  @Input() selected_country_misinfo:string="USA";
  public column_color:String = "#4895ef";
  // public line_color:String = "#e63946";
  public line_color:String = "#4c4c4c";
  
  async ngOnChanges(changes:SimpleChanges){
    console.log(changes)
    // if(this.selected_country_misinfo.length > 0){
      await this.renderChart();
    // }
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
        text: 'Countrywise distribution of misinformation tweets.',
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
    let sentiment_country_data = this.corpusService.sentiment_corpus_data.mis_information_count_dist[this.selected_country_misinfo.toUpperCase()];
    // convert data to format
    // console.log(this.selected_country_misinfo)
    // console.log(sentiment_country_data)
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
    Highcharts.chart('misinfo-tweet-dist', this.options);
  }
  
  ngOnInit() {
    this.selected_country_misinfo = "USA";
    this.renderChart()
  }

}
