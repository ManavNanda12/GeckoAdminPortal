import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCustomerDialog } from './add-edit-customer-dialog';

describe('AddEditCustomerDialog', () => {
  let component: AddEditCustomerDialog;
  let fixture: ComponentFixture<AddEditCustomerDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditCustomerDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditCustomerDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
