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
  public processed_tweets: any = [];
  solrBaseUrl: string = "http://3.21.230.103:8983/solr/IR_P4/select?fl=id%2Cscore&q.op=OR&q=tweet_text%3AQUERY&rows=235000"
  private noReplyQuery: string = "-replied_to_tweet_id:*";
  constructor(private httpClient: HttpClient, private spinnerService: SpinnerService) {
    spinnerService.show();
    console.log('here in services');
    this.httpClient.get("assets/processed_tweets.json").subscribe((data) => {
      this.processed_tweets = data;
      spinnerService.hide();
      console.log(Object.keys(data).length);
    });
  }


  public simpleQuerySolr(query: string, queryOptions?: any) {
    if (queryOptions) {
      if (queryOptions.noReplies)
        query = query + " " + this.noReplyQuery;
    }

    query = "(" + encodeURI(query) + ")^3";
    let newURL = this.solrBaseUrl.replace("QUERY", query);
    return this.httpClient.get(newURL)
  }


  searchEnabled() {
    this._searchFlag.next(true);
  }

  searchDisabled() {
    this._searchData.next(false);
  }
}
