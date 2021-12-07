import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { SolrService } from './services/solr.service';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NewsComponent } from './components/news/news.component';
import { SentimentChartComponent } from './components/sentiment-chart/sentiment-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchResultsComponent,
    NewsComponent,
    SentimentChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ScrollingModule
  ],
  providers: [SolrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
