import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WardAdminPage } from './ward-admin.page';

describe('WardAdminPage', () => {
  let component: WardAdminPage;
  let fixture: ComponentFixture<WardAdminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WardAdminPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WardAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
