import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SightLocationRouteComponent } from './sight-location-route.component';

describe('SightLocationRouteComponent', () => {
  let component: SightLocationRouteComponent;
  let fixture: ComponentFixture<SightLocationRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SightLocationRouteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SightLocationRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
