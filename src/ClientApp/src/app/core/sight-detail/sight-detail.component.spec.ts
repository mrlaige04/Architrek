import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SightDetailComponent } from './sight-detail.component';

describe('SightDetailComponent', () => {
  let component: SightDetailComponent;
  let fixture: ComponentFixture<SightDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SightDetailComponent]
    });
    fixture = TestBed.createComponent(SightDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
