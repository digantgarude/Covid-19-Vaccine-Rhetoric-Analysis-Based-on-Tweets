import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class SolrService {
  public _searchFlag = new BehaviorSubject(false);
  public _searchData = new BehaviorSubject({});
  public _tweetList = new BehaviorSubject([]);
  public processed_tweets: any = [];
  solrBaseUrl: string = "http://3.142.94.110:5000/getTweets"

  //Query Options
  private noReplyQuery: string = "-replied_to_tweet_id:*";
  private allPoiQuery: string = "poi_id:*"
  constructor(private httpClient: HttpClient, private spinnerService: SpinnerService) {
  }


  public simpleQuerySolr(query: string, queryOptions?: any) {

    query = "tweet_text:(" + query + ")^3";
    if (queryOptions) {
      if (queryOptions.noReplies)
        query = query + " " + this.noReplyQuery;
    }
    return this.httpClient.post(this.solrBaseUrl, { query: query });
  }

  searchEnabled() {
    this._searchFlag.next(true);
  }

  searchDisabled() {
    this._searchData.next(false);
  }
}
