import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContributorComponent } from './edit-contributor.component';

describe('EditContributorComponent', () => {
  let component: EditContributorComponent;
  let fixture: ComponentFixture<EditContributorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditContributorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditContributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
