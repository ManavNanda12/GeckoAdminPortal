import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsReplyDialog } from './contact-us-reply-dialog';

describe('ContactUsReplyDialog', () => {
  let component: ContactUsReplyDialog;
  let fixture: ComponentFixture<ContactUsReplyDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactUsReplyDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactUsReplyDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
