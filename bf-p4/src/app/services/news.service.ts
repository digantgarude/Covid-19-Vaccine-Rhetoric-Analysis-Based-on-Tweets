import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private httpClient: HttpClient) { }

  private rawUrl = "http://3.142.94.110:5000/getNews"


  public getNews(query: string, startDate: string, endDate: string) {
    let url = this.rawUrl.replace("QUERY", query);
    console.log(url);
    return this.httpClient.post(url, { query: query });
  }
}
