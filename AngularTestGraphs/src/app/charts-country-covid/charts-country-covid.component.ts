import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as Exporting from 'highcharts/modules/exporting';
declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');
import {FormGroup, FormControl} from '@angular/forms';
import {OffChainServiceService} from "src/app/services/off-chain-service.service"
import { formatDate } from "@angular/common";


@Component({
    selector: 'app-charts-country-covid',
    templateUrl: './charts-country-covid.component.html',
    styleUrls: ['./charts-country-covid.component.scss']
})
export class ChartsCountryCovidComponent implements OnInit {
    public from_date:Date = new Date("2020-10-20");
    public till_date:Date = new Date("2020-11-20");
    public country_selected:String = "US";

    public range:any = new FormGroup({
        start: new FormControl(this.from_date),
        end: new FormControl(this.till_date),
    });
    

    
    public options:any = {};
    constructor(private offChainService: OffChainServiceService) {
        
    }
    
    async dataFill(data:any){
        this.options = {
            chart: {
                zoomType: 'xy'
            },
            title: {
                text: this.country_selected+' cases rise | Covid 19',
                align: 'left'
            },
            xAxis: [{
                categories: data.Date,
                crosshair: true
            }],
            yAxis: [{
                labels: {
                    format: '{value}',
                    style: {
                        color: "#4895ef"
                    }
                },
                title: {
                    text: 'Confirmed',
                    style: {
                        color: "#4895ef"
                    }
                },
                opposite: false
                
            }, {
                gridLineWidth: 0,
                title: {
                    text: 'Deaths',
                    style: {
                        color: "#e63946"
                    }
                },
                labels: {
                    format: '{value}',
                    style: {
                        color: "#e63946"
                    }
                },
                opposite: true
            }],
            tooltip: {
                shared: true
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                x: 80,
                verticalAlign: 'top',
                y: 55,
                floating: true,
                backgroundColor: 'rgba(255,255,255,0.25)'
            },
            series: [{
                name: 'Confirmed',
                type: 'spline',
                yAxis: 1,
                data: data.Confirmed,
                color: "#4895ef",
                marker:false
            },{
                name: 'Deaths',
                type: 'spline',
                data: data.Deceased,
                color: "#e63946",
                dashStyle: 'shortdot',
                marker:false
            }],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            floating: false,
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom',
                            x: 0,
                            y: 0
                        },
                        yAxis: [{
                            labels: {
                                align: 'right',
                                x: 0,
                                y: -6
                            },
                            showLastLabel: false
                        }, {
                            labels: {
                                align: 'left',
                                x: 0,
                                y: -6
                            },
                            showLastLabel: false
                        }, {
                            visible: false
                        }]
                    }
                }]
            }
        };
    }

    async renderChart(event: any) {
        let from_date_str = formatDate(this.range.value.start, "yyyy-MM-dd", 'en-US');
        let till_date_str = formatDate(this.range.value.end, "yyyy-MM-dd", 'en-US');
        if(event.value){
            this.offChainService.getCountryCasesAll(this.country_selected, from_date_str, till_date_str)
            .subscribe(async (data:any) => {
                await this.dataFill(data.data)
                Highcharts.chart('covid-cases-by-country-container', this.options);
            })
        }
    }
    
    ngOnInit() {
        this.from_date = this.range.value.start;
        this.till_date = this.range.value.end;
        console.log(`From Date : ${this.from_date}\nTill Date : ${this.till_date}`)
        this.renderChart({
            value:1
          })
    }


}
