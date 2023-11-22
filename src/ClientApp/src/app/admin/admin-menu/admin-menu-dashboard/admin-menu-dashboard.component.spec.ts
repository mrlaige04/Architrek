import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMenuDashboardComponent } from './admin-menu-dashboard.component';

describe('AdminMenuDashboardComponent', () => {
  let component: AdminMenuDashboardComponent;
  let fixture: ComponentFixture<AdminMenuDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMenuDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminMenuDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
