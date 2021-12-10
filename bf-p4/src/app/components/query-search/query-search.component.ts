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
  rawTweets: any;
  public get searchData(): any {
    return this._searchData;
  }
  public set searchData(value: any) {
    this._searchData = value;
  }
  dates: any = [];
  newsData: any = {};
  poi_names = ['ArvindKejriwal', 'BernieSanders', 'CDCgov', 'Claudiashein', 'EnriqueAlfaroR', 'GovRonDeSantis', 'GregAbbott_TX', 'HHS_ASH', 'HLGatell', 'JoeBiden', 'KamalaHarris', 'LindseyGrahamSC', 'MamataOfficial', 'MoHFW_INDIA', 'POTUS', 'PeteButtigieg', 'RahulGandhi', 'RandPaul', 'RicardoMonrealA', 'SSalud_mx', 'SecBecerra', 'SenSanders', 'VP', 'VicenteFoxQue', 'alfredodelmazo', 'alitomorenoc', 'amyklobuchar', 'fernandeznorona', 'lopezobrador_', 'm_ebrard', 'mansukhmandviya', 'marcorubio', 'mattgaetz', 'mtgreenee', 'narendramodi', 'sambitswaraj', 'tatclouthier', 'tedcruz'];
  countries = ['INDIA', 'USA', 'MEXICO'];
  sentiments = ['POSITIVE', 'NEGATIVE', 'NEUTRAL', 'MIXED'];
  languages = ['HINDI', 'ENGLISH', 'SPANISH'];
  constructor(private fb: FormBuilder, private solrService: SolrService, public spinnerService: SpinnerService, private changeDetectorRef: ChangeDetectorRef) {
  }

  tweets: any = [];
  allTweets: any = {};
  ngOnInit() {
    this.searchForm = this.fb.group({
      searchFormControlName: ['', Validators.compose([Validators.required])],
      poiOnly: [false],
      poiFilter: [''],
      countryFilter: [''],
      sentimentFilter: [''],
      languageFilter: ['']
    });
    this.allTweets = this.solrService.processed_tweets;
  }

  resetSearchBar(event: any) {
    this.searchForm.reset();
  }


  async search() {

    await this.getRawTweets();
    const formVal = this.searchForm.value;
    console.log(formVal);
    if (this.searchForm.valid) {
      this.solrService._searchFlag.next(true)
      this.searchFlag = true;
      this.spinnerService.show();
      let queryOptions: any = {
        noReplies: true,
        allPoisOnly: formVal.poiOnly
      }
      this.solrService.simpleQuerySolr(formVal.searchFormControlName, queryOptions).subscribe(async (data: any) => {
        await this.mapTweets(data.response.docs);
        this.rawTweets = this.tweets;
        this.solrService._searchData.next(data.response.docs);
        console.log(data.response.docs);
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

  async filterByPoiName(poiName: string) {
    // this.tweets.filter(tw=> tw.)
  }

  async searchFilter() {
    console.log('here');
    console.log(this.searchForm.value);
    if (this.searchFlag) {

    }
  }

  searchPoiTweets() {

  }



}
