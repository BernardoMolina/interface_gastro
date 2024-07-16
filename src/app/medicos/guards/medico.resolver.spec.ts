import { TestBed } from '@angular/core/testing';

import { MedicoResolver } from './medico.resolver';

describe('MedicoResolver', () => {
  let resolver: MedicoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MedicoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
