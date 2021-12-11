import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicAnalysisService {

  private baseURL = 'http://3.142.94.110:5000/'
  private hashtags = 'hashtag';
  private topics = 'topic_no_lda';
  constructor(private httpClient: HttpClient) { }


  getHashtags(hashTagList: any) {
    return this.httpClient.post(this.baseURL + this.hashtags, { id: hashTagList });
  }

  getTopics(hashTagList: any) {
    return this.httpClient.post(this.baseURL + this.topics, { id: hashTagList });
  }
}
