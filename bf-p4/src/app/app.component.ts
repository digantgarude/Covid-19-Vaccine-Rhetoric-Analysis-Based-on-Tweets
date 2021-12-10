import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CorpusAnalyticsService } from './services/corpus-analytics.service';
import { SolrService } from './services/solr.service';
import { SpinnerService } from './services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public solrService: SolrService, public spinnerService: SpinnerService, private corpusService:CorpusAnalyticsService) {
    
  }

  ngOnInit() { }

}

