import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSightCardComponent } from './search-sight-card.component';

describe('SearchSightCardComponent', () => {
  let component: SearchSightCardComponent;
  let fixture: ComponentFixture<SearchSightCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchSightCardComponent]
    });
    fixture = TestBed.createComponent(SearchSightCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
