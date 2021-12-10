import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SpinnerService } from './spinner.service';
@Injectable({
  providedIn: 'root'
})
export class CorpusAnalyticsService {
  public sentiment_corpus_data:any;
  constructor(private httpClient: HttpClient, private spinnerService: SpinnerService) {
    this.httpClient.get("assets/sentiment_corpus.json").toPromise().then((data:any) => {
      this.sentiment_corpus_data = data;
      this.spinnerService.hide();
      console.log(Object.keys(data).length);
      console.log(data);
      console.log(data.hashtags_word_cloud_corpus);
    });
  }
  
  public async getCorpusWordCloud(){
    if(this.sentiment_corpus_data){
      return this.sentiment_corpus_data.hashtags_word_cloud_corpus;
    }else{
      this.sentiment_corpus_data = await this.httpClient.get("assets/sentiment_corpus.json").toPromise();
      this.spinnerService.hide();
      return this.sentiment_corpus_data.hashtags_word_cloud_corpus;
    }
  }

  public async getPOISentiment(poi_name:any){
    console.log("getPOISentiment")
    console.log("poi_name : "+poi_name)
    console.log(this.sentiment_corpus_data)
    return this.sentiment_corpus_data.poi_tweet_based_sentiments[poi_name]
  }

  public async getCountrySentiment(country:any){
    console.log("getCountrySentiment")
    console.log("country : "+country)
    console.log(this.sentiment_corpus_data)
    return this.sentiment_corpus_data.country_based_sentiments[country]
  }
}
