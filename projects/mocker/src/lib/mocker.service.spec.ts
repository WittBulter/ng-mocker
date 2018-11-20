import { TestBed } from '@angular/core/testing';

import { MockerService } from './mocker.service';

describe('MockerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MockerService = TestBed.get(MockerService);
    expect(service).toBeTruthy();
  });
});
