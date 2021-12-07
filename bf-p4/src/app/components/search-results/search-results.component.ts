import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { LinkPreviewService } from 'src/app/services/link-preview.service';
import { SolrService } from 'src/app/services/solr.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  @Input() tweets: any = [];

  allTweets: any = [];
  processedTweets: any = [];

  constructor(private linkPreview: LinkPreviewService, public solrSearch: SolrService, private spinnerService: SpinnerService) { }

  ngOnInit(): void {
    // this.linkPreview.getLinkPreview("https://www.google.com").subscribe((data) => {
    //   console.log(data);
    // });
    // this.spinnerService.hide();
    this.allTweets = this.solrSearch.processed_tweets;
    console.log(this.tweets);
  }

  

}
