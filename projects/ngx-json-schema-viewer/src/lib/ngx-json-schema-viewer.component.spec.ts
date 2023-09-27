import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxJsonSchemaViewerComponent } from './ngx-json-schema-viewer.component';

describe('NgxJsonSchemaViewerComponent', () => {
  let component: NgxJsonSchemaViewerComponent;
  let fixture: ComponentFixture<NgxJsonSchemaViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgxJsonSchemaViewerComponent]
    });
    fixture = TestBed.createComponent(NgxJsonSchemaViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
