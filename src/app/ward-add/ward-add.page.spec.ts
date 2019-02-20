import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WardAddPage } from './ward-add.page';

describe('WardAddPage', () => {
  let component: WardAddPage;
  let fixture: ComponentFixture<WardAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WardAddPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WardAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
