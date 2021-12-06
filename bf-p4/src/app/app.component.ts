import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { SolrService } from './services/solr.service';
import { SpinnerService } from './services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bf-p4';
  userType = 1;
  searchForm: any;
  searchFlag: boolean = false;
  value = 'Clear me';


  constructor(private fb: FormBuilder, private solrService: SolrService, public spinnerService: SpinnerService) { }

  tweets: any = [];
  ngOnInit() {
    this.searchForm = this.fb.group({
      searchFormControlName: ['', Validators.compose([Validators.required])],
    });
    this.tweets = this.solrService.processed_tweets;
  }

  resetSearchBar() {
    this.searchForm.reset();
  }

  search() {
    console.log(this.searchForm.value);
    if (this.searchForm.valid) {
      this.searchFlag = true;
      this.spinnerService.show();
      this.solrService.simpleQuerySolr(this.searchForm.value.searchFormControlName).subscribe((data: any) => {
        console.log(data);
        this.tweets = data.response.docs;
        this.spinnerService.hide();
      });
    }
  }
}
function Output() {
  throw new Error('Function not implemented.');
}

