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

  //Query Options
  private noReplyQuery: string = "-replied_to_tweet_id:*";
  private allPoiQuery: string = "poi_id:*"
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

    query = "(" + query + ")^3";
    if (queryOptions) {
      if (queryOptions.noReplies)
        query = query + " " + this.noReplyQuery;
    }

    let newURL = this.solrBaseUrl.replace("QUERY", encodeURI(query));
    return this.httpClient.get(newURL)
  }


  public solrOptionsSearch(queryOptions: any) {
    let query = ""
    if (queryOptions.poiName) {
      query = "poi_name:" + queryOptions.poiName;
    }
    else if (queryOptions.country) {
      query = "country:" + queryOptions.country;
    }
    else if (queryOptions.lang) {
      query = "tweet_lang:" + queryOptions.lang;
    }

    let newURL = this.solrBaseUrl.replace("QUERY", encodeURI(query));
    return this.httpClient.get(newURL)
  }


  searchEnabled() {
    this._searchFlag.next(true);
  }

  searchDisabled() {
    this._searchData.next(false);
  }
}
