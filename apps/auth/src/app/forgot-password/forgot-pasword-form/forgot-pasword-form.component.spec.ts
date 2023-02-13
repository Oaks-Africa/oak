import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPaswordFormComponent } from './forgot-pasword-form.component';

describe('ForgotPaswordFormComponent', () => {
  let component: ForgotPaswordFormComponent;
  let fixture: ComponentFixture<ForgotPaswordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ForgotPaswordFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotPaswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
