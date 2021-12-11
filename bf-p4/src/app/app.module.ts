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
import { QuerySearchComponent } from './components/query-search/query-search.component';
import { QueryAnalyticsComponent } from './components/query-analytics/query-analytics.component';
import { CorpusAnalyticsComponent } from './components/corpus-analytics/corpus-analytics.component';
import { OverallSentimentComponent } from './components/corpus-analytics/components/overall-sentiment/overall-sentiment.component';
import { PoiSentimentComponent } from './components/corpus-analytics/components/poi-sentiment/poi-sentiment.component';
import { CountrywiseSentimentComponent } from './components/corpus-analytics/components/countrywise-sentiment/countrywise-sentiment.component';
import { CorpusWordcloudComponent } from './components/corpus-analytics/components/corpus-wordcloud/corpus-wordcloud.component';
import { PoiTweetCountsComponent } from './components/corpus-analytics/components/poi-tweet-counts/poi-tweet-counts.component';
import { CovidCountryCasesComponent } from './components/corpus-analytics/components/covid-country-cases/covid-country-cases.component';
import { CountryTweetDistChartComponent } from './components/corpus-analytics/components/country-tweet-dist-chart/country-tweet-dist-chart.component';
import { CovidCountryDeathsComponent } from './components/corpus-analytics/components/covid-country-deaths/covid-country-deaths.component';
import { CountryWiseHashtagWordCloudComponent } from './components/corpus-analytics/components/country-wise-hashtag-word-cloud/country-wise-hashtag-word-cloud.component';
import { PoiHashtagWordcloudComponent } from './components/corpus-analytics/components/poi-hashtag-wordcloud/poi-hashtag-wordcloud.component';
import { SentimentHashtagWordcloudOverallComponent } from './components/corpus-analytics/components/sentiment-hashtag-wordcloud-overall/sentiment-hashtag-wordcloud-overall.component';
import { WordCloudComponent } from './query-analytics/components/word-cloud/word-cloud.component';
import { MisinfoDistCountryPieComponent } from './components/corpus-analytics/components/misinfo-dist-country-pie/misinfo-dist-country-pie.component';
import { MisinfoTweetsComponent } from './components/corpus-analytics/components/misinfo-tweets/misinfo-tweets.component';
import { MisinfoDistCountryComponent } from './components/corpus-analytics/components/misinfo-dist-country/misinfo-dist-country.component';
import { MisinfoKeywordsUsedComponent } from './components/corpus-analytics/components/misinfo-keywords-used/misinfo-keywords-used.component';
import { QueryStatsComponent } from './query-analytics/components/query-stats/query-stats.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchResultsComponent,
    NewsComponent,
    SentimentChartComponent,
    QuerySearchComponent,
    QueryAnalyticsComponent,
    CorpusAnalyticsComponent,
    OverallSentimentComponent,
    PoiSentimentComponent,
    CountrywiseSentimentComponent,
    CorpusWordcloudComponent,
    PoiTweetCountsComponent,
    CovidCountryCasesComponent,
    CountryTweetDistChartComponent,
    CovidCountryDeathsComponent,
    CountryWiseHashtagWordCloudComponent,
    PoiHashtagWordcloudComponent,
    SentimentHashtagWordcloudOverallComponent,
    WordCloudComponent,
    MisinfoDistCountryPieComponent,
    MisinfoTweetsComponent,
    MisinfoDistCountryComponent,
    MisinfoKeywordsUsedComponent,
    QueryStatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ScrollingModule,
    
  ],
  providers: [SolrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
