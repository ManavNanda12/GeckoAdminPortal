import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditUserModel } from './add-edit-user-model';

describe('AddEditUserModel', () => {
  let component: AddEditUserModel;
  let fixture: ComponentFixture<AddEditUserModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditUserModel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditUserModel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
