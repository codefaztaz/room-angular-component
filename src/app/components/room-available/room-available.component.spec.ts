import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomAvailableComponent } from './room-available.component';

describe('RoomAvailableComponent', () => {
  let component: RoomAvailableComponent;
  let fixture: ComponentFixture<RoomAvailableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomAvailableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
