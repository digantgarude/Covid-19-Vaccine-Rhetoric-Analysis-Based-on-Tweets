import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LinkPreviewService {

  private baseUrl = "http://api.linkpreview.net/";
  private baseData = "key=01786a4441b2f07e45557e70861885ad&q=URL"
  constructor(private httpClient: HttpClient) {
  }

  getLinkPreview(url: string) {
    const data = this.baseData.replace("URL", url);
    return this.httpClient.post(this.baseUrl, data);
  }
}
