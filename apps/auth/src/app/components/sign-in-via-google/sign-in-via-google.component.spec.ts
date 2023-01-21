import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInViaGoogleComponent } from './sign-in-via-google.component';

describe('SignInViaGoogleComponent', () => {
  let component: SignInViaGoogleComponent;
  let fixture: ComponentFixture<SignInViaGoogleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SignInViaGoogleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignInViaGoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
