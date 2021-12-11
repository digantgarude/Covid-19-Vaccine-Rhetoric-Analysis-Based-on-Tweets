import { Component, OnInit } from '@angular/core';
import { DynamicAnalysisService } from 'src/app/services/dynamic-analysis.service';
import { SolrService } from 'src/app/services/solr.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-query-analytics',
  templateUrl: './query-analytics.component.html',
  styleUrls: ['./query-analytics.component.scss']
})
export class QueryAnalyticsComponent implements OnInit {

  searchData: any = [];
  tweetList: any = [];
  hashtags: any = [];
  topics: any = [];
  constructor(public solrService: SolrService, private dynamicAnalysisService: DynamicAnalysisService, private spinnerService: SpinnerService) { }

  async ngOnInit() {
    this.searchData = this.solrService._searchData.getValue();
    this.tweetList = this.solrService._tweetList.getValue();
    this.solrService._tweetList.subscribe(async (newList) => {
      this.tweetList = this.tweetList;
      this.getData().then(()=> this.spinnerService.hide());
      // this.spinnerService.hide();
    });
    this.solrService._searchData.subscribe((newData) => {
      this.searchData = newData;
    });
  }


  async getData() {
    this.spinnerService.show();
    this.hashtags = this.dynamicAnalysisService.getHashtags(this.tweetList).subscribe((data: any) => {
      this.hashtags = data;
      this.stopSpinner();
    });
    this.topics = this.dynamicAnalysisService.getTopics(this.tweetList).subscribe((data: any) => {
      this.topics = data;
      this.stopSpinner;
    });
  }

  stopSpinner() {
    if (this.topics.length && this.hashtags.length)
      this.spinnerService.hide();
  }

}
