import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as Exporting from 'highcharts/modules/exporting';
declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

import {OffChainServiceService} from "src/app/services/off-chain-service.service"


@Component({
  selector: 'app-charts-country-covid',
  templateUrl: './charts-country-covid.component.html',
  styleUrls: ['./charts-country-covid.component.scss']
})
export class ChartsCountryCovidComponent implements OnInit {
  public country_selected:String = "US";
  public charts_data:any = {
    xAxis_categ: [],
    series_confirmed: [],
    series_deceased: [],
    series_recovered: [],

  }
  
  public options:any = {};
  constructor(private offChainService: OffChainServiceService) {

  }

  async dataFill(data:any){
    this.charts_data.xAxis_categ = data.Date;
    this.charts_data.series_confirmed = data.Confirmed;
    this.charts_data.series_deceased = data.Deceased;
    this.charts_data.series_recovered = data.Recovered;
    this.options = {
      chart: {
          type: 'line',
          // pointPadding: 20,
          // groupPadding: 20,
          
      },
      title: {
          text: this.country_selected+' cases rise | Covid 19'
      },
      xAxis: {
          categories: this.charts_data.xAxis_categ
      },
      yAxis: {
          title: {
              text: 'No. of Cases'
          }
      },
      series: [{
          name: 'Confirmed',
          data: this.charts_data.series_confirmed
      }, {
          name: 'Deceased',
          data: this.charts_data.series_deceased 
      }]
    };
    console.log(this.options);
  }

  ngOnInit() {
    this.offChainService.getCountryCasesAll(this.country_selected)
    .subscribe(async (data:any) => {

      await this.dataFill(data.data)


      Highcharts.chart('container', this.options);
      
    })
  }

}
