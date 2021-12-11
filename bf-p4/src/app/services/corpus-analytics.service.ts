import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SpinnerService } from './spinner.service';
const BASE_URL_BACKEND = `http://localhost:8080/`

@Injectable({
  providedIn: 'root'
})
export class CorpusAnalyticsService {
  public poi_tweet_start_date:any;
  public poi_tweet_end_date:any;
  public sentiment_corpus_data:any;
  constructor(private httpClient: HttpClient, private spinnerService: SpinnerService) {
    this.httpClient.get("assets/sentiment_corpus.json").toPromise().then((data:any) => {
      this.sentiment_corpus_data = data;
      this.spinnerService.hide();
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


  /**
   * 
   * @param country {"US", "India", "Mexico"}
   * @param from_date "YYYY-MM-DD"
   * @param till_date "YYYY-MM-DD" OR DEFAULT {from_date + 14 days}
   * @returns response
   */
   public getCountryCasesAll(country:String, from_date:String, till_date:String){
    return this.httpClient.get(`${BASE_URL_BACKEND}/country?country=${country}&from_date=${from_date}&till_date=${till_date}`);
  }

  /**
   * 
   * @param country {"US", "India", "Mexico"}
   * @param from_date "YYYY-MM-DD"
   * @param till_date "YYYY-MM-DD" OR DEFAULT {from_date + 14 days}
   * @returns response
   */
  public getCountryVaccinations(country:String, from_date:String, till_date:String){
    // console.debug("Country Selected : "+country);
    return this.httpClient.get(`${BASE_URL_BACKEND}/vaccinations?country=${country}&from_date=${from_date}&till_date=${till_date}`);
  }

  // TODO: Hospitalizations Records.

  /**
   * 
   * @param country {"US", "India", "Mexico"}
   * @param from_date "YYYY-MM-DD"
   * @param till_date "YYYY-MM-DD" OR DEFAULT {from_date + 14 days}
   * @returns response
   */
  public getHospitalizationsUS(from_date:String, till_date:String){
    return this.httpClient.get(`${BASE_URL_BACKEND}get_hospitalizations_data?from_date=${from_date}&till_date=${till_date}`);
  }

}
