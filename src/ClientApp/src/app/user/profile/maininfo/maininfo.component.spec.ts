import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaininfoComponent } from './maininfo.component';

describe('MaininfoComponent', () => {
  let component: MaininfoComponent;
  let fixture: ComponentFixture<MaininfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaininfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaininfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
