import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerReportFormComponent } from './answer-report-form.component';

describe('AnswerReportFormComponent', () => {
  let component: AnswerReportFormComponent;
  let fixture: ComponentFixture<AnswerReportFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnswerReportFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnswerReportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
