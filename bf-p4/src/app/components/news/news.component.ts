import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  @Input() query: any = {};
  newsArr: any = [];
  constructor(private newsService: NewsService, private router: Router) { }

  ngOnInit(): void {
    console.log('HEre--->', this.query);
  }

  async ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    await this.getNews();
  }

  async getNews() {
    console.log(this.query);
    if (this.query) {
      this.query.query =this.query.query.trim();
      this.newsArr = await this.newsService.getNews(encodeURI(this.query.query), '', '').toPromise();
      this.newsArr = this.newsArr.articles;
    }
  }

  navigate(url: string) {
    window.open(url, '_blank');
  }
}
