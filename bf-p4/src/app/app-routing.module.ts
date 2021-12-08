import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorpusAnalyticsComponent } from './components/corpus-analytics/corpus-analytics.component';
import { QueryAnalyticsComponent } from './components/query-analytics/query-analytics.component';
import { QuerySearchComponent } from './components/query-search/query-search.component';

const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'search', component: QuerySearchComponent },
  { path: 'analyzeSearch', component: QueryAnalyticsComponent },
  { path: 'analyzeCorpus', component: CorpusAnalyticsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
