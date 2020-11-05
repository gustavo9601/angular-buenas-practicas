import { TestBed } from '@angular/core/testing';

import { GeneratorDataService } from './generator-data.service';

describe('GeneratorDataService', () => {
  let service: GeneratorDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneratorDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
