import { Component, Input, OnInit } from '@angular/core';
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

  // tweets: any = [{
  //   "verified": false,
  //   "country": "USA",
  //   "id": "1440472096543412226",
  //   "replied_to_tweet_id": 1440470172414857216,
  //   "replied_to_user_id": 794185898,
  //   "reply_text": "That's what makes Covid so bad. It is super infectious &amp; causes serious symptoms that can kill normal, healthy people, &amp; completely devastates the immune vulnerable. In the US, /10 has diabetes, /15 heart disease, /20 cancer, /100 lung disease, /7 are over .",
  //   "tweet_text": "@SamHarshbarger4 @VAReadjuster89 @JonahDispatch That's what makes Covid so bad. It is super infectious &amp; causes serious symptoms that can kill normal, healthy people, &amp; completely devastates the immune vulnerable. In the US, 1/10 has diabetes, 1/15 heart disease, 1/20 cancer, 1/100 lung disease, 1/7 are over 65.",
  //   "tweet_lang": "en",
  //   "text_en": "That's what makes Covid so bad. It is super infectious &amp; causes serious symptoms that can kill normal, healthy people, &amp; completely devastates the immune vulnerable. In the US, /10 has diabetes, /15 heart disease, /20 cancer, /100 lung disease, /7 are over .",
  //   "tweet_date": "2021-09-22T00:00:00Z",
  //   "geolocation": [
  //     "San Antonio, TX"
  //   ],
  //   "sentiment": "NEGATIVE",
  //   "sentiment_score": 0.9055408,
  //   "_version_": 1717963927173726208
  // }];

  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

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
