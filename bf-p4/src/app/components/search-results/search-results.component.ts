import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { LinkPreviewService } from 'src/app/services/link-preview.service';
import { SolrService } from 'src/app/services/solr.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  @Input() tweets: any = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator
  dataSource!: MatTableDataSource<any>;
  obs!: Observable<any>;

  allTweets: any = [];
  processedTweets: any = [];

  constructor(private linkPreview: LinkPreviewService, public solrSearch: SolrService, private spinnerService: SpinnerService,
    private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    // this.linkPreview.getLinkPreview("https://www.google.com").subscribe((data) => {
    //   console.log(data);
    // });
    // this.spinnerService.hide();
    this.allTweets = this.solrSearch.processed_tweets;
    console.log(this.tweets);
    this.dataSource = new MatTableDataSource(this.tweets);
    this.tweets.paginator = this.paginator
    this.obs = this.tweets.connect();
    // this.obs = this.tweets.connect();
  }

  ngOnChanges() {
    this.dataSource.data = this.tweets;
    window.scrollTo(0,0); 
    // this.dataSource.data.push(this.tweets);
    // this.obs = this.dataSource.connect();
  }



}
