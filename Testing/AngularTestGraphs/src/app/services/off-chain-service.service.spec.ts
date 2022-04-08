import { TestBed } from '@angular/core/testing';

import { OffChainServiceService } from './off-chain-service.service';

describe('OffChainServiceService', () => {
  let service: OffChainServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OffChainServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
