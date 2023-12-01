import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCountryFormComponent } from './create-country-form.component';

describe('CreateCountryFormComponent', () => {
  let component: CreateCountryFormComponent;
  let fixture: ComponentFixture<CreateCountryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCountryFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateCountryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
