import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementPlayerComponent } from './management-player.component';

describe('ManagementPlayerComponent', () => {
  let component: ManagementPlayerComponent;
  let fixture: ComponentFixture<ManagementPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
