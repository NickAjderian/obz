import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WardJoinPage } from './ward-join.page';

describe('WardJoinPage', () => {
  let component: WardJoinPage;
  let fixture: ComponentFixture<WardJoinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WardJoinPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WardJoinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
