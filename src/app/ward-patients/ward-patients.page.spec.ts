import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WardPatientsPage } from './ward-patients.page';

describe('WardPatientsPage', () => {
  let component: WardPatientsPage;
  let fixture: ComponentFixture<WardPatientsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WardPatientsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WardPatientsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
