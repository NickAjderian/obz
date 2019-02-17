import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WardViewOptionsPage } from './ward-view-options.page';

describe('WardViewOptionsPage', () => {
  let component: WardViewOptionsPage;
  let fixture: ComponentFixture<WardViewOptionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WardViewOptionsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WardViewOptionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
