import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitePolicy } from './site-policy';

describe('SitePolicy', () => {
  let component: SitePolicy;
  let fixture: ComponentFixture<SitePolicy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SitePolicy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SitePolicy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
