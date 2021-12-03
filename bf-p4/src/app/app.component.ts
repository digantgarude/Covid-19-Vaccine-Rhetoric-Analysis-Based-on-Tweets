import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      searchFormControlName: ['', Validators.compose([Validators.required])],
    });
  }
  search() {
    console.log(this.searchForm.value);
    if (this.searchForm.valid)
      this.searchFlag = true;
  }
}
