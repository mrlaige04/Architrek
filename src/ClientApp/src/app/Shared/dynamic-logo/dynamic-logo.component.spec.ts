import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicLogoComponent } from './dynamic-logo.component';

describe('DynamicLogoComponent', () => {
  let component: DynamicLogoComponent;
  let fixture: ComponentFixture<DynamicLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicLogoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DynamicLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
