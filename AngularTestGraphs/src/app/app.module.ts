import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsCountryCovidComponent } from './charts-country-covid/charts-country-covid.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { SentimentPieChartComponent } from './sentiment-pie-chart/sentiment-pie-chart.component';
import { VaccinationsChartComponent } from './vaccinations-chart/vaccinations-chart.component';
import { CovidDeathsCountryChartComponent } from './covid-deaths-country-chart/covid-deaths-country-chart.component';
import { HospitalizationsChartComponent } from './hospitalizations-chart/hospitalizations-chart.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { WordCloudChartComponent } from './word-cloud-chart/word-cloud-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    ChartsCountryCovidComponent,
    SentimentPieChartComponent,
    VaccinationsChartComponent,
    CovidDeathsCountryChartComponent,
    HospitalizationsChartComponent,
    WordCloudChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    HighchartsChartModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
