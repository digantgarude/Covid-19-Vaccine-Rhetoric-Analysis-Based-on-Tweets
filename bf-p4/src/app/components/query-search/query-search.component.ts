import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SolrService } from 'src/app/services/solr.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-query-search',
  templateUrl: './query-search.component.html',
  styleUrls: ['./query-search.component.scss']
})
export class QuerySearchComponent implements OnInit {

  userType = 1;
  searchForm: any;
  searchFlag: boolean = false;
  value = 'Clear me';
  fromDate: string = '';
  toDate: string = '';
  _searchData: any;
  public get searchData(): any {
    return this._searchData;
  }
  public set searchData(value: any) {
    this._searchData = value;
  }
  dates: any = [];
  newsData: any = {};

  constructor(private fb: FormBuilder, private solrService: SolrService, public spinnerService: SpinnerService, private changeDetectorRef: ChangeDetectorRef) {
  }

  tweets: any = [];
  allTweets: any = {};
  ngOnInit() {
    this.searchForm = this.fb.group({
      searchFormControlName: ['', Validators.compose([Validators.required])],
    });
    this.allTweets = this.solrService.processed_tweets;
  }

  resetSearchBar() {
    this.searchForm.reset();
  }


  async search() {

    await this.getRawTweets();
    const formVal = this.searchForm.value;
    console.log(formVal.value);
    if (this.searchForm.valid) {
      this.solrService._searchFlag.next(true)
      this.searchFlag = true;
      this.spinnerService.show();
      this.solrService.simpleQuerySolr(formVal.searchFormControlName, { noReplies: true }).subscribe(async (data: any) => {
        await this.mapTweets(data.response.docs);
        this.solrService._searchData.next(data.response.docs);
        console.log(this.dates);
        const query = {
          query: formVal.searchFormControlName,
          fromDate: await Math.max(...this.dates),
          toDate: await Math.min(...this.dates)
        };
        console.log(query);

        this._searchData = query;
        this.spinnerService.hide();
      });
    }
  }

  async mapTweets(finalTweets: any) {
    this.dates = [];
    this.tweets = finalTweets.map((tweet: any) => {
      var date = new Date(this.allTweets[tweet.id].tweet_date);
      this.dates.push(date.valueOf());
      return this.allTweets[tweet.id];
    });
  }

  async getRawTweets() {
    if (Object.keys(this.allTweets).length == 0) {
      this.allTweets = this.solrService.processed_tweets;
    }
  }

  

}
