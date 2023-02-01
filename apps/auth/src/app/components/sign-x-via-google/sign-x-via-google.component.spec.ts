import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignXViaGoogleComponent } from './sign-x-via-google.component';

describe('SignXViaGoogleComponent', () => {
  let component: SignXViaGoogleComponent;
  let fixture: ComponentFixture<SignXViaGoogleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SignXViaGoogleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignXViaGoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
