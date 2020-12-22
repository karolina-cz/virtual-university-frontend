import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordChangeFailComponent } from './password-change-fail.component';

describe('PasswordChangeFailComponent', () => {
  let component: PasswordChangeFailComponent;
  let fixture: ComponentFixture<PasswordChangeFailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordChangeFailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordChangeFailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
