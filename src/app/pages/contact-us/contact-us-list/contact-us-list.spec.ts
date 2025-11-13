import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsList } from './contact-us-list';

describe('ContactUsList', () => {
  let component: ContactUsList;
  let fixture: ComponentFixture<ContactUsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactUsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactUsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
