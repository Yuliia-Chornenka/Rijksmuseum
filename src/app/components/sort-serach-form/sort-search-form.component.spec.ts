import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortSearchFormComponent } from './sort-search-form.component';

describe('SortSerachFormComponent', () => {
  let component: SortSearchFormComponent;
  let fixture: ComponentFixture<SortSearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortSearchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
