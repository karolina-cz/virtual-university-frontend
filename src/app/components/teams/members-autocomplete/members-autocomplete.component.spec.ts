import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersAutocompleteComponent } from './members-autocomplete.component';

describe('MembersAutocompleteComponent', () => {
  let component: MembersAutocompleteComponent;
  let fixture: ComponentFixture<MembersAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembersAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
