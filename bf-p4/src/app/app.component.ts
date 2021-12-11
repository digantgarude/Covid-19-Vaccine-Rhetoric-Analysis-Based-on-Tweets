import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, Event } from '@angular/router';
import { CorpusAnalyticsService } from './services/corpus-analytics.service';
import { DynamicAnalysisService } from './services/dynamic-analysis.service';
import { SolrService } from './services/solr.service';
import { SpinnerService } from './services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public solrService: SolrService, public spinnerService: SpinnerService, private corpusService: CorpusAnalyticsService,
    private dynamicService: DynamicAnalysisService, public router: Router) {
  }

  ngOnInit() { }

  setStyle() {
    if (this.router.url === '/search')
      return 'box';
    else
      return 'no-box';
  }

}

