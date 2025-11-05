import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationModel } from './confirmation-model';

describe('ConfirmationModel', () => {
  let component: ConfirmationModel;
  let fixture: ComponentFixture<ConfirmationModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmationModel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationModel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
