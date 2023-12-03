import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMenuUsersComponent } from './admin-menu-users.component';

describe('AdminMenuUsersComponent', () => {
  let component: AdminMenuUsersComponent;
  let fixture: ComponentFixture<AdminMenuUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMenuUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminMenuUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
