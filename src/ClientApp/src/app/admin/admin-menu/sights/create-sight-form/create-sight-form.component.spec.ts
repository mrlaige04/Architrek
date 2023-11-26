import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSightFormComponent } from './create-sight-form.component';

describe('CreateSightFormComponent', () => {
  let component: CreateSightFormComponent;
  let fixture: ComponentFixture<CreateSightFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSightFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateSightFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
