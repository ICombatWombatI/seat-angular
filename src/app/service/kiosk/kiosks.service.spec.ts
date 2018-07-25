import { TestBed, inject } from '@angular/core/testing';

import { KiosksService } from './kiosks.service';

describe('KiosksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KiosksService]
    });
  });

  it('should be created', inject([KiosksService], (service: KiosksService) => {
    expect(service).toBeTruthy();
  }));
});
