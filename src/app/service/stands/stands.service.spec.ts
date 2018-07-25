import { TestBed, inject } from '@angular/core/testing';

import { StandsService } from './stands.service';

describe('StandsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StandsService]
    });
  });

  it('should be created', inject([StandsService], (service: StandsService) => {
    expect(service).toBeTruthy();
  }));
});
