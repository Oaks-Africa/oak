import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPaswordFormComponent } from './forget-pasword-form.component';

describe('ForgetPaswordFormComponent', () => {
  let component: ForgetPaswordFormComponent;
  let fixture: ComponentFixture<ForgetPaswordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ForgetPaswordFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgetPaswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
