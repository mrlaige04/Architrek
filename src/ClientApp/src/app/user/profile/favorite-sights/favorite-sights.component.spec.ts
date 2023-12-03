import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteSightsComponent } from './favorite-sights.component';

describe('FavoriteSightsComponent', () => {
  let component: FavoriteSightsComponent;
  let fixture: ComponentFixture<FavoriteSightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteSightsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavoriteSightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
