import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMenuNavbarComponent } from './admin-menu-navbar.component';

describe('AdminMenuNavbarComponent', () => {
  let component: AdminMenuNavbarComponent;
  let fixture: ComponentFixture<AdminMenuNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMenuNavbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminMenuNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
