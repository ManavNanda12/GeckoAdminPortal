import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateCategory } from './add-update-category';

describe('AddUpdateCategory', () => {
  let component: AddUpdateCategory;
  let fixture: ComponentFixture<AddUpdateCategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUpdateCategory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateCategory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
