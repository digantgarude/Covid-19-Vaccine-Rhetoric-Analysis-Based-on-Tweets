import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private httpClient: HttpClient) { }

  private rawUrl = "https://newsapi.org/v2/everything?qInTitle=QUERY&from=FROM_DATE&to=TO_DATE&sortBy=relevancy&apiKey=d4a1ec1c128945dbb318d8a7b367979a"


  public getNews(query: string, startDate: string, endDate: string) {
    let url = this.rawUrl.replace("QUERY", query);
    console.log(url);
    return this.httpClient.get(url);
  }
}
