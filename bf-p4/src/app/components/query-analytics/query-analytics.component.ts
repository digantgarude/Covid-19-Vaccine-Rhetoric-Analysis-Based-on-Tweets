import { Component, OnInit } from '@angular/core';
import { SolrService } from 'src/app/services/solr.service';

@Component({
  selector: 'app-query-analytics',
  templateUrl: './query-analytics.component.html',
  styleUrls: ['./query-analytics.component.scss']
})
export class QueryAnalyticsComponent implements OnInit {

  searchData: any = [];
  constructor(public solrService: SolrService) { }

  ngOnInit(): void {
    this.searchData = this.solrService._searchData.getValue();
    this.solrService._searchData.subscribe((newData) => {
      this.searchData = newData;
    });
    console.log(this.searchData);
  }

}
