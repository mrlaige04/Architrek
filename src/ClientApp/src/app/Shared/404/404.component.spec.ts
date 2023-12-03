import { ComponentFixture, TestBed } from '@angular/core/testing';

import { _404Component } from './404.component';

describe('404Component', () => {
  let component: _404Component;
  let fixture: ComponentFixture<_404Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [_404Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(_404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
