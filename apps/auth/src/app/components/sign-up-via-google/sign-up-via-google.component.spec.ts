import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpViaGoogleComponent } from './sign-up-via-google.component';

describe('SignUpViaGoogleComponent', () => {
  let component: SignUpViaGoogleComponent;
  let fixture: ComponentFixture<SignUpViaGoogleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SignUpViaGoogleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpViaGoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
