import { TestBed } from '@angular/core/testing';

import { NgxJsonSchemaViewerService } from './ngx-json-schema-viewer.service';

describe('NgxJsonSchemaViewerService', () => {
  let service: NgxJsonSchemaViewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxJsonSchemaViewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
