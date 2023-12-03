import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMenuAsideComponent } from './admin-menu-aside.component';

describe('AdminMenuAsideComponent', () => {
  let component: AdminMenuAsideComponent;
  let fixture: ComponentFixture<AdminMenuAsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMenuAsideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminMenuAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
