import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateProductImage } from './add-update-product-image';

describe('AddUpdateProductImage', () => {
  let component: AddUpdateProductImage;
  let fixture: ComponentFixture<AddUpdateProductImage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUpdateProductImage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateProductImage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
