import { TestBed } from '@angular/core/testing';

import { CountPriceService } from './count-price.service';

describe('CountPriceService', () => {
  let service: CountPriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountPriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
