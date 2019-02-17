import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WardManagePage } from './ward-manage.page';

describe('WardManagePage', () => {
  let component: WardManagePage;
  let fixture: ComponentFixture<WardManagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WardManagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WardManagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
