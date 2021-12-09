import {Component,OnInit} from '@angular/core';

declare var require: any;
import * as Highcharts from 'highcharts';
import MapModule from 'highcharts/modules/map';
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

const USA = require('@highcharts/map-collection/countries/us/us-all.geo.json');
const worldMap = require('@highcharts/map-collection/custom/world.geo.json');

MapModule(Highcharts);

import {
  FormGroup,
  FormControl
} from '@angular/forms';
import {
  OffChainServiceService
} from "src/app/services/off-chain-service.service"
import {
  formatDate
} from "@angular/common";

@Component({
  selector: 'app-hospitalizations-chart',
  templateUrl: './hospitalizations-chart.component.html',
  styleUrls: ['./hospitalizations-chart.component.scss']
})
export class HospitalizationsChartComponent implements OnInit {
  public from_date: Date = new Date("2021-01-15");
  public till_date: Date = new Date("2021-03-15");

  public column_color: String = "#aae479";
  // public line_color:String = "#4895ef";
  public line_color: String = "#4c4c4c";

  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = "mapChart";
  chartData = [{ code3: "ABW", z: 105 }, { code3: "AFG", z: 35530 }];
  
  public range: any = new FormGroup({
    start: new FormControl(this.from_date),
    end: new FormControl(this.till_date),
  });

  chartOptions: Highcharts.Options = {}


  // public options: any = {};
  constructor(private offChainService: OffChainServiceService) {

  }

  async dataFill(data: any, field:any) {
    this.chartOptions = {
      chart: {
        map: USA
      },
      title: {
        text: "USA Hospitalizations"
      },
      // subtitle: {
      //   text:
      //     'USA Hospitalizations for Covid'
      // },
      mapNavigation: {
        enabled: true,
        buttonOptions: {
          alignTo: "spacingBox"
        }
      },
      legend: {
        enabled: true
      },
      colorAxis: {
        min: 1,
        // type:'logarithmic',
        // minColor: '#48cae4',
        // maxColor: '#03045e',
        stops: [
          [0.02,"#caf0f8ff"],
          [0.04,"#ade8f4ff"],
          [0.08,"#90e0efff"],
          [0.1,"#48cae4ff"],
          [0.2,"#00b4d8ff"],
          [0.3,"#0096c7ff"],
          [0.4,"#0077b6ff"],
          [0.5,"#023e8aff"],
          [0.6,"#03045eff"],
        ]
    },
      series: [
        {
          type: "map",
          name: field,
          states: {
            hover: {
              color: "#BADA55"
            }
          },
          dataLabels: {
            enabled: true,
            format: "{point.name}"
          },
          allAreas: false,
          data: data
        }
      ]
    };
  }

  async renderChart(event: any) {
    console.log("Render Map Chart")
    let from_date_str = formatDate(this.range.value.start, "yyyy-MM-dd", 'en-US');
    let till_date_str = formatDate(this.range.value.end, "yyyy-MM-dd", 'en-US');

    // console.log(`CLICK ENTER : \nFrom Date : ${this.from_date}\nTill Date : ${this.till_date}`)
    if (event.value) {
      this.offChainService.getHospitalizationsUS(from_date_str, till_date_str)
        .subscribe(async (data: any) => {
          console.log(data)
          let code = data.state;
          let value = data.total_patients_hospitalized_confirmed_influenza_and_covid;
          let map_data: any = []
          for (let i = 0; i < code.length; i++) {
            map_data.push([
              `us-${code[i].toLowerCase()}`,
              value[i]])
          }
          console.log("map_data")
          console.log(map_data)



          await this.dataFill(map_data, "total_patients_hospitalized_confirmed_influenza_and_covid")
          Highcharts.mapChart('us-hospitalizations-by-date-container', this.chartOptions);
        })
    }
  }

  ngOnInit() {
    this.from_date = this.range.value.start;
    this.till_date = this.range.value.end;
    console.log(`From Date : ${this.from_date}\nTill Date : ${this.till_date}`)
    this.renderChart({
      value: 1
    })
  }
}
