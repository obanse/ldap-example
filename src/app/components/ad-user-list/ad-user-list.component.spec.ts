import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdUserListComponent } from './ad-user-list.component';

describe('AdUserListComponent', () => {
  let component: AdUserListComponent;
  let fixture: ComponentFixture<AdUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdUserListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
