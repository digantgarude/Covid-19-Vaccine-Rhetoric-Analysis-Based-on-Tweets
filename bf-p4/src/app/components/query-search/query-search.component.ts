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
  sentimentData: any = {};
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
  languages = [{ key: 'Hindi', val: 'hi' }, { key: 'English', val: 'en' }, { key: 'Spanish', val: 'es' }];
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
    if (this.searchForm.valid) {
      this.solrService._searchFlag.next(true)
      this.searchFlag = true;
      this.spinnerService.show();
      let queryOptions: any = {
        noReplies: true
      }
      this.solrService.simpleQuerySolr(formVal.searchFormControlName, queryOptions).subscribe(async (data: any) => {
        await this.mapTweets(data.response.docs);
        this.rawTweets = this.tweets;
        this.solrService._searchData.next(this.tweets);
        this.spinnerService.hide();
        await this.setSentimentData();
        const query = {
          query: formVal.searchFormControlName,
        };
        console.log(query);

        this._searchData = query;

      });
    }
  }

  async setSentimentData() {
    const lenPos = (await this.positiveSentiment()).length;
    const lenNeg = (await this.negativeSentiment()).length;
    const lenMix = (await this.mixedSentiment()).length;
    const lenNeut = (await this.neutralSentiment()).length;
    console.log(lenPos);
    const sentData = {
      positive: lenPos,
      negative: lenNeg,
      mixed: lenMix,
      neutral: lenNeut
    }
    this.sentimentData = sentData;
  }

  async mapTweets(finalTweets: any) {
    let tweetList:any = [];
    this.tweets = finalTweets.map((tweet: any) => {
      tweetList.push(tweet.id);
      return this.allTweets[tweet.id];
    });
    this.solrService._tweetList.next(tweetList);
  }

  async getRawTweets() {
    if (Object.keys(this.allTweets).length == 0) {
      this.allTweets = this.solrService.processed_tweets;
    }
  }

  async positiveSentiment() {
    return this.tweets.filter((tweet: any) => tweet.sentiment === 'POSITIVE')
  }

  async negativeSentiment() {
    return this.tweets.filter((tweet: any) => tweet.sentiment === 'NEGATIVE')
  }

  async mixedSentiment() {
    return this.tweets.filter((tweet: any) => tweet.sentiment === 'MIXED')
  }

  async neutralSentiment() {
    return this.tweets.filter((tweet: any) => tweet.sentiment === 'NEUTRAL')
  }

  async filterByPoiName(poiName: string) {
    // this.tweets.filter(tw=> tw.)
  }

  async searchFilter() {
    console.log(this.searchForm.value);
    const values = this.searchForm.value;
    this.tweets = this.rawTweets.filter((tw: any) => {
      let result = true;
      if (values.poiOnly)
        result = result && ((tw.poi_name) ? true : false);
      if (values.poiFilter)
        result = result && (tw.poi_name == values.poiFilter);
      if (values.sentimentFilter)
        result = result && (tw.sentiment == values.sentimentFilter);
      if (values.languageFilter)
        result = result && (tw.tweet_lang == values.languageFilter);
      if (values.countryFilter)
        result = result && (tw.country == values.countryFilter);
      return result;
    });
    await this.setSentimentData();
  }

  searchPoiTweets() {

  }



}
