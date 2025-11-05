import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateProduct } from './add-update-product';

describe('AddUpdateProduct', () => {
  let component: AddUpdateProduct;
  let fixture: ComponentFixture<AddUpdateProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUpdateProduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateProduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
