import { TestBed } from '@angular/core/testing';

import { TransferDataFilterService } from './transfer-data-filter.service';

describe('TransferDataFilterService', () => {
  let service: TransferDataFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransferDataFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
