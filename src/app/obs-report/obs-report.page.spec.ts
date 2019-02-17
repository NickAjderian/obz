import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObsReportPage } from './obs-report.page';

describe('ObsReportPage', () => {
  let component: ObsReportPage;
  let fixture: ComponentFixture<ObsReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObsReportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObsReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
