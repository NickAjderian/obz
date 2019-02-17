import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAddPage } from './patient-add.page';

describe('PatientAddPage', () => {
  let component: PatientAddPage;
  let fixture: ComponentFixture<PatientAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientAddPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
