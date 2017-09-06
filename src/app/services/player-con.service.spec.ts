import { TestBed, inject } from '@angular/core/testing';

import { PlayerConService } from './player-con.service';

describe('PlayerConService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerConService]
    });
  });

  it('should be created', inject([PlayerConService], (service: PlayerConService) => {
    expect(service).toBeTruthy();
  }));
});
