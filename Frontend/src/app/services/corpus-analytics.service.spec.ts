import { TestBed } from '@angular/core/testing';

import { CorpusAnalyticsService } from './corpus-analytics.service';

describe('CorpusAnalyticsService', () => {
  let service: CorpusAnalyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorpusAnalyticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
